import { TestBed } from '@angular/core/testing';

import { NegotiationListService } from './negotiation-list.service';

describe('NegotiationListService', () => {
  let service: NegotiationListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NegotiationListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
