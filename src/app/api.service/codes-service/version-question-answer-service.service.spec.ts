import { TestBed } from '@angular/core/testing';

import { VersionQuestionAnswerServiceService } from './version-question-answer-service.service';

describe('VersionQuestionAnswerServiceService', () => {
  let service: VersionQuestionAnswerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VersionQuestionAnswerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
