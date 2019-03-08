import { TestBed } from '@angular/core/testing';

import { S3FileUploaderService } from './s3-file-uploader.service';

describe('S3FileUploaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: S3FileUploaderService = TestBed.get(S3FileUploaderService);
    expect(service).toBeTruthy();
  });
});
