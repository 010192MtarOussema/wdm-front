import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclencheurAlerteComponent } from './declencheur-alerte.component';

describe('DeclencheurAlerteComponent', () => {
  let component: DeclencheurAlerteComponent;
  let fixture: ComponentFixture<DeclencheurAlerteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclencheurAlerteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclencheurAlerteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
