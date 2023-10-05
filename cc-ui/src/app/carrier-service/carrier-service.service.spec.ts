import { TestBed } from '@angular/core/testing';

import { CarrierServiceService } from './carrier-service.service';

describe('CarrierServiceService', () => {
  let service: CarrierServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrierServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
