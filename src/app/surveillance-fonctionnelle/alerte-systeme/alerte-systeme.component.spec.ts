import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlerteSystemeComponent } from './alerte-systeme.component';

describe('AlerteSystemeComponent', () => {
  let component: AlerteSystemeComponent;
  let fixture: ComponentFixture<AlerteSystemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlerteSystemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlerteSystemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
