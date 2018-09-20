import { TestBed, inject } from '@angular/core/testing';

import { AuthAPIService } from './auth-api.service';

describe('AuthApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthAPIService]
    });
  });

  it('should be created', inject([AuthAPIService], (service: AuthAPIService) => {
    expect(service).toBeTruthy();
  }));
});
