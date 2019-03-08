import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class S3FileUploaderService {


  FOLDER = 'store-transactions/';
  US_OHIO_REGION_ID = "us-east-2";
  constructor() { }

  uploadfile(file) {
    const bucket = new S3(
      {
        accessKeyId: 'AKIAIAUIHGTA6WCEJ75A',
        secretAccessKey: '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',
        region: this.US_OHIO_REGION_ID
      }
    );

    const params = {
      Bucket: 'smart-angular7',
      Key: this.FOLDER + file.name,
      Body: file
    };

    bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }

      console.log('Successfully uploaded file.', data);
      return true;
    });
  }
}
