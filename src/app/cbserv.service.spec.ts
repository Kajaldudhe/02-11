import { TestBed } from '@angular/core/testing';

import { CbservService } from './cbserv.service';

describe('CbservService', () => {
  let service: CbservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
