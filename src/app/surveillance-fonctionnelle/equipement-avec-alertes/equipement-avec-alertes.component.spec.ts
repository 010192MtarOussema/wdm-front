import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementAvecAlertesComponent } from './equipement-avec-alertes.component';

describe('EquipementAvecAlertesComponent', () => {
  let component: EquipementAvecAlertesComponent;
  let fixture: ComponentFixture<EquipementAvecAlertesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipementAvecAlertesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipementAvecAlertesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
