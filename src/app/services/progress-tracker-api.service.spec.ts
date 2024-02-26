import { TestBed } from '@angular/core/testing';

import { ProgressTrackerApiService } from './progress-tracker-api.service';

describe('ProgressTrackerApiService', () => {
  let service: ProgressTrackerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressTrackerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
