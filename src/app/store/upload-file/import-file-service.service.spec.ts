import { TestBed } from '@angular/core/testing';

import { ImportFileServiceService } from './import-file-service.service';

describe('ImportFileServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImportFileServiceService = TestBed.get(ImportFileServiceService);
    expect(service).toBeTruthy();
  });
});
