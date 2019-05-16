import { TestBed } from '@angular/core/testing';

import { StoreInformationService } from './store-information.service';

describe('StoreInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreInformationService = TestBed.get(StoreInformationService);
    expect(service).toBeTruthy();
  });
});
