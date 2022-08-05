import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementSystemeComponent } from './equipement-systeme.component';

describe('EquipementSystemeComponent', () => {
  let component: EquipementSystemeComponent;
  let fixture: ComponentFixture<EquipementSystemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipementSystemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipementSystemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
