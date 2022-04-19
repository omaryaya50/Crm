import { TestBed } from '@angular/core/testing';

import { UpdatesCustomersService } from './updates-customers.service';

describe('UpdatesCustomersService', () => {
  let service: UpdatesCustomersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatesCustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
