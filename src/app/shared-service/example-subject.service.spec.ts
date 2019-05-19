import { TestBed } from '@angular/core/testing';

import { ExampleSubjectService } from './example-subject.service';

describe('ExampleSubjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExampleSubjectService = TestBed.get(ExampleSubjectService);
    expect(service).toBeTruthy();
  });
});
