import { TestBed } from '@angular/core/testing';

import { CustomerVisitsChoisesService } from './customer-visits-choises.service';

describe('CustomerVisitsChoisesService', () => {
  let service: CustomerVisitsChoisesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerVisitsChoisesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
