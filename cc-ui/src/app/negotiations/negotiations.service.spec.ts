import { TestBed } from '@angular/core/testing';

import { NegotiationsService } from './negotiations.service';

describe('NegotiationsService', () => {
  let service: NegotiationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NegotiationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
