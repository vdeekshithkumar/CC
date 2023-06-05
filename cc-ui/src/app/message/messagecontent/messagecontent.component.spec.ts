import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagecontentComponent } from './messagecontent.component';

describe('MessagecontentComponent', () => {
  let component: MessagecontentComponent;
  let fixture: ComponentFixture<MessagecontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagecontentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagecontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
