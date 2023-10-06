import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimizedViewComponent } from './optimized-view.component';

describe('OptimizedViewComponent', () => {
  let component: OptimizedViewComponent;
  let fixture: ComponentFixture<OptimizedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptimizedViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptimizedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
