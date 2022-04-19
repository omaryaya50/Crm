import { TestBed } from '@angular/core/testing';

import { SalesRegionService } from './sales-region.service';

describe('SalesRegionService', () => {
  let service: SalesRegionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesRegionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
