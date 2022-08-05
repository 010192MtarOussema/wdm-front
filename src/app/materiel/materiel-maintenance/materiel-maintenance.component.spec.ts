import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterielMaintenanceComponent } from './materiel-maintenance.component';

describe('MaterielMaintenanceComponent', () => {
  let component: MaterielMaintenanceComponent;
  let fixture: ComponentFixture<MaterielMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterielMaintenanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterielMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
