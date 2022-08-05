import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportsPiecesRechangeComponent } from './rapports-pieces-rechange.component';

describe('RapportsPiecesRechangeComponent', () => {
  let component: RapportsPiecesRechangeComponent;
  let fixture: ComponentFixture<RapportsPiecesRechangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportsPiecesRechangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapportsPiecesRechangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
