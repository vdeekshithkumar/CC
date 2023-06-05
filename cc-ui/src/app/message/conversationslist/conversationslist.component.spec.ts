import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationslistComponent } from './conversationslist.component';

describe('ConversationslistComponent', () => {
  let component: ConversationslistComponent;
  let fixture: ComponentFixture<ConversationslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationslistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversationslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
