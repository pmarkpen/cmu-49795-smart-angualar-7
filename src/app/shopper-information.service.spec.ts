import { TestBed } from '@angular/core/testing';

import { ShopperInformationService } from './shopper-information.service';

describe('ShopperInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopperInformationService = TestBed.get(ShopperInformationService);
    expect(service).toBeTruthy();
  });
});
