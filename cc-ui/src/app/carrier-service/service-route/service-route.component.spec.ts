import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRouteComponent } from './service-route.component';

describe('ServiceRouteComponent', () => {
  let component: ServiceRouteComponent;
  let fixture: ComponentFixture<ServiceRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
