import { TestBed } from '@angular/core/testing';

import { MockedBackendService } from './mocked-backend.service';

describe('MockedDbService', () => {
  let service: MockedBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockedBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
