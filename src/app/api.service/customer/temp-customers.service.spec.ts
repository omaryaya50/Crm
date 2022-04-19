import { TestBed } from '@angular/core/testing';

import { TempCustomersService } from './temp-customers.service';

describe('TempCustomersService', () => {
  let service: TempCustomersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempCustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
