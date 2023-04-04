import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadContractComponent } from './upload-contract.component';

describe('UploadContractComponent', () => {
  let component: UploadContractComponent;
  let fixture: ComponentFixture<UploadContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadContractComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
