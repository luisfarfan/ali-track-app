import { TestBed } from '@angular/core/testing';

import { CheckIsLoggedService } from './check-is-logged.service';

describe('CheckIsLoggedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckIsLoggedService = TestBed.get(CheckIsLoggedService);
    expect(service).toBeTruthy();
  });
});
