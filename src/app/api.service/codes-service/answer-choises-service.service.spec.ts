import { TestBed } from '@angular/core/testing';

import { AnswerChoisesServiceService } from './answer-choises-service.service';

describe('AnswerChoisesServiceService', () => {
  let service: AnswerChoisesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswerChoisesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
