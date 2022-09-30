import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewGroupeComponent } from './add-new-groupe.component';

describe('AddNewGroupeComponent', () => {
  let component: AddNewGroupeComponent;
  let fixture: ComponentFixture<AddNewGroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewGroupeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
