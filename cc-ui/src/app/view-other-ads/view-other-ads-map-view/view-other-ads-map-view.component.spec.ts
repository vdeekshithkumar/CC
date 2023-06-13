import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOtherAdsMapViewComponent } from './view-other-ads-map-view.component';

describe('ViewOtherAdsMapViewComponent', () => {
  let component: ViewOtherAdsMapViewComponent;
  let fixture: ComponentFixture<ViewOtherAdsMapViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOtherAdsMapViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOtherAdsMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
