import { TestBed } from '@angular/core/testing';

import { CuecardService } from './cuecard.service';

describe('CuecardService', () => {
  let service: CuecardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuecardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
