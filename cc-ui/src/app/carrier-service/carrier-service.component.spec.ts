import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierServiceComponent } from './carrier-service.component';

describe('CarrierServiceComponent', () => {
  let component: CarrierServiceComponent;
  let fixture: ComponentFixture<CarrierServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrierServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrierServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
