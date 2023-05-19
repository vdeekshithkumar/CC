import { TestBed } from '@angular/core/testing';

import { ViewOtherAdsService } from './view-other-ads.service';

describe('ViewOtherAdsService', () => {
  let service: ViewOtherAdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewOtherAdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
