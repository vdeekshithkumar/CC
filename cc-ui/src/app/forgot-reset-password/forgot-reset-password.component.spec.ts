import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotResetPasswordComponent } from './forgot-reset-password.component';

describe('ForgotResetPasswordComponent', () => {
  let component: ForgotResetPasswordComponent;
  let fixture: ComponentFixture<ForgotResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotResetPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
