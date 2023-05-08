import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastingComponent } from './forecasting.component';

describe('ForecastingComponent', () => {
  let component: ForecastingComponent;
  let fixture: ComponentFixture<ForecastingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
