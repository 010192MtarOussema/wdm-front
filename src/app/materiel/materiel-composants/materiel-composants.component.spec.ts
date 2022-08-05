import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterielComposantsComponent } from './materiel-composants.component';

describe('MaterielComposantsComponent', () => {
  let component: MaterielComposantsComponent;
  let fixture: ComponentFixture<MaterielComposantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterielComposantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterielComposantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
