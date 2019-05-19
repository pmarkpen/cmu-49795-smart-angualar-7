import { TestBed } from '@angular/core/testing';

import { ExampleBehavioralSubjectService } from './example-behavioral-subject.service';

describe('ExampleBehavioralSubjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExampleBehavioralSubjectService = TestBed.get(ExampleBehavioralSubjectService);
    expect(service).toBeTruthy();
  });
});
