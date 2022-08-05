import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposantAvecAlertesComponent } from './composant-avec-alertes.component';

describe('ComposantAvecAlertesComponent', () => {
  let component: ComposantAvecAlertesComponent;
  let fixture: ComponentFixture<ComposantAvecAlertesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComposantAvecAlertesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComposantAvecAlertesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
