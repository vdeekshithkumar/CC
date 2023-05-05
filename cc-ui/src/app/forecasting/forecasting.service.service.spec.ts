import { TestBed } from '@angular/core/testing';

import { ForecastingServiceService } from './forecasting.service.service';

describe('ForecastingServiceService', () => {
  let service: ForecastingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForecastingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
