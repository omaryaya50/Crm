import { TestBed } from '@angular/core/testing';

import { SalesRepService } from './sales-rep.service';

describe('SalesRepService', () => {
  let service: SalesRepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesRepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
