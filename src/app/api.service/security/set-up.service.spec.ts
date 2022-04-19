import { TestBed } from '@angular/core/testing';

import { SetUpService } from './set-up.service';

describe('SetUpService', () => {
  let service: SetUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
