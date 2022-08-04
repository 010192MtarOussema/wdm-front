import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDialogUserComponent } from './form-dialog-user.component';

describe('FormDialogUserComponent', () => {
  let component: FormDialogUserComponent;
  let fixture: ComponentFixture<FormDialogUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDialogUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDialogUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
