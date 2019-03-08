import { Component, OnInit } from '@angular/core';
import { S3FileUploaderService } from './s3-file-uploader.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  selectedFiles:any;
  constructor(private s3FileUploaderService: S3FileUploaderService) { }

  ngOnInit() {
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.s3FileUploaderService.uploadfile(file);
  }
 
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

}
