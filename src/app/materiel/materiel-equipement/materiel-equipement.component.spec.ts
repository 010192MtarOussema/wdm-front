import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterielEquipementComponent } from './materiel-equipement.component';

describe('MaterielEquipementComponent', () => {
  let component: MaterielEquipementComponent;
  let fixture: ComponentFixture<MaterielEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterielEquipementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterielEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
