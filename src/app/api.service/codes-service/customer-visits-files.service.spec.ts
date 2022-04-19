import { TestBed } from '@angular/core/testing';

import { CustomerVisitsFilesService } from './customer-visits-files.service';

describe('CustomerVisitsFilesService', () => {
  let service: CustomerVisitsFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerVisitsFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
