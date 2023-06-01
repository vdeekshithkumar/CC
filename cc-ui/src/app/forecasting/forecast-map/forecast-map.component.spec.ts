import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastMapComponent } from './forecast-map.component';

describe('ForecastMapComponent', () => {
  let component: ForecastMapComponent;
  let fixture: ComponentFixture<ForecastMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
