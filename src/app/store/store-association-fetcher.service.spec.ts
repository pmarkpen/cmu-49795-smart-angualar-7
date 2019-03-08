import { TestBed } from '@angular/core/testing';

import { StoreAssociationFetcherService } from './store-association-fetcher.service';

describe('StoreAssociationFetcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreAssociationFetcherService = TestBed.get(StoreAssociationFetcherService);
    expect(service).toBeTruthy();
  });
});
