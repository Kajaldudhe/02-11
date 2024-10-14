import { TestBed } from '@angular/core/testing';

import { AnotherservService } from './anotherserv.service';

describe('AnotherservService', () => {
  let service: AnotherservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnotherservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
