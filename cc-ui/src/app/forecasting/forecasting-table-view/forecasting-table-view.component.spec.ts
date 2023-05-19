import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastingTableViewComponent } from './forecasting-table-view.component';

describe('ForecastingTableViewComponent', () => {
  let component: ForecastingTableViewComponent;
  let fixture: ComponentFixture<ForecastingTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastingTableViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastingTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
