import { TestBed } from '@angular/core/testing';

import { AnswerTypesServiceService } from './answer-types-service.service';

describe('AnswerTypesServiceService', () => {
  let service: AnswerTypesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswerTypesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
