import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOtherAdsComponent } from './view-other-ads.component';

describe('ViewOtherAdsComponent', () => {
  let component: ViewOtherAdsComponent;
  let fixture: ComponentFixture<ViewOtherAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOtherAdsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOtherAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
