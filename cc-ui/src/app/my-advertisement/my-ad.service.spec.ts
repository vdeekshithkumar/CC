import { TestBed } from '@angular/core/testing';

import { MyAdService } from './my-ad.service';

describe('MyAdService', () => {
  let service: MyAdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyAdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
