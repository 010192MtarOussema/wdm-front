import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlerteEquipementComponent } from './alerte-equipement.component';

describe('AlerteEquipementComponent', () => {
  let component: AlerteEquipementComponent;
  let fixture: ComponentFixture<AlerteEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlerteEquipementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlerteEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
