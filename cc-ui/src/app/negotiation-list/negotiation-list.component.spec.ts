import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegotiationListComponent } from './negotiation-list.component';

describe('NegotiationListComponent', () => {
  let component: NegotiationListComponent;
  let fixture: ComponentFixture<NegotiationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NegotiationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NegotiationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
