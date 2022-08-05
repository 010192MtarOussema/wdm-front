import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterielPiecesRechangesComponent } from './materiel-pieces-rechanges.component';

describe('MaterielPiecesRechangesComponent', () => {
  let component: MaterielPiecesRechangesComponent;
  let fixture: ComponentFixture<MaterielPiecesRechangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterielPiecesRechangesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterielPiecesRechangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
