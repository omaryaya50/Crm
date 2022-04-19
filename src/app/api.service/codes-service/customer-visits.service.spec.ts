import { TestBed } from '@angular/core/testing';

import { CustomerVisitsService } from './customer-visits.service';

describe('CustomerVisitsService', () => {
  let service: CustomerVisitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerVisitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
