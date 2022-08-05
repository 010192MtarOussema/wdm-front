import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportsEquipementComponent } from './rapports-equipement.component';

describe('RapportsEquipementComponent', () => {
  let component: RapportsEquipementComponent;
  let fixture: ComponentFixture<RapportsEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportsEquipementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapportsEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
