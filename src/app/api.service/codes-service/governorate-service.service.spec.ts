import { TestBed } from '@angular/core/testing';

import { GovernorateServiceService } from './governorate-service.service';

describe('GovernorateServiceService', () => {
  let service: GovernorateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GovernorateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
