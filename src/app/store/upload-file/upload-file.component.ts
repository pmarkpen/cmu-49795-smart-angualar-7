import { Component, OnInit, ViewChild } from '@angular/core';
import { S3FileUploaderService } from './s3-file-uploader.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ImportFileServiceService, ImportFileStatusResponse } from './import-file-service.service';
import { StoreInformationService } from '../../shared-service/store-information.service';

function getWindow(): any {
  return window;
}

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  selectedFiles: any;
  @ViewChild('mediaFile') mediaFile;
  status: string;
  statusCode: number;
  constructor(private s3FileUploaderService: S3FileUploaderService,
    private router: Router,
    private importFileServiceService: ImportFileServiceService,
    public storeInformationService: StoreInformationService) { }

  ngOnInit() {
    this.status = "Click to browse";
    this.statusCode = -1;
  }

  upload() {
    this.uploadFileToFirebase().subscribe((fileURL: string) => {
      this.importFileServiceService.import(fileURL, this.storeInformationService.storeId).subscribe(() => {
      });

      setTimeout(() => {
        let promise = setInterval(() => {
          this.importFileServiceService.getImportStatus(this.storeInformationService.storeId).subscribe((serverResponse: ImportFileStatusResponse) => {
            this.status = serverResponse.result.requests[0].status;
            this.statusCode = serverResponse.result.requests[0].code;

            if (serverResponse.result.requests[0].code === 6) {
              clearInterval(promise);
            }
          });
        }, 100);
      }, 5000)
    });
  }

  onClickNext() {
    this.router.navigateByUrl(`/after-login/store/store-association-result`);
  }

  uploadFileToFirebase(): Observable<string> {
    let that = this;
    this.statusCode = 0;
    return new Observable((observer) => {
      var window = getWindow();
      var firebase = window.firebase;
      // Get a reference to the storage service, which is used to create references in your storage bucket
      var storage = firebase.storage();
      // Create a storage reference from our storage service
      var storageRef = storage.ref();

      const file = this.selectedFiles.item(0);
      // Create the file metadata
      var metadata = {
        contentType: 'csv'
      };

      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef.child('files/' + file.name).put(file, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          that.status = `Uploading ${Math.floor(progress)} % done`;
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function (error) {

          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, function () {
          // Upload completed successfully, now we can get the download URL
          var gsReference = storage.refFromURL(`gs://smart-46249.appspot.com/files/${file.name}`)
          gsReference.getDownloadURL().then(function (downloadURL) {
            observer.next(downloadURL);
          }, (err) => {
            observer.error(err);
          });
        });
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  getFileName() {
    if (this.selectedFiles === undefined || this.selectedFiles.item(0) === undefined) {
      return "";
    }

    return this.selectedFiles.item(0).name;
  }

  onClickSelectFile() {
    this.mediaFile.nativeElement.click();
  }

  isUploadBtnDisabled() {
    return this.isImporting();
  }

  isImporting() {
    return this.statusCode != -1 && !this.isDone();
  }

  isShowDoneBtn() {
    return this.isDone();
  }

  isDone() {
    return this.statusCode === 6;
  }

  get storeIDInput() {
    return this.storeInformationService.storeId;
  }
}
