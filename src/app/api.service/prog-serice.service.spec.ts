import { TestBed } from '@angular/core/testing';

import { ProgSericeService } from './prog-serice.service';

describe('ProgSericeService', () => {
  let service: ProgSericeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgSericeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
