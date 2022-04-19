import { TestBed } from '@angular/core/testing';

import { SalesSectorService } from './sales-sector.service';

describe('SalesSectorService', () => {
  let service: SalesSectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesSectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
