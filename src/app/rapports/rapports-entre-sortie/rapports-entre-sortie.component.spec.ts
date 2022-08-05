import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportsEntreSortieComponent } from './rapports-entre-sortie.component';

describe('RapportsEntreSortieComponent', () => {
  let component: RapportsEntreSortieComponent;
  let fixture: ComponentFixture<RapportsEntreSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportsEntreSortieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapportsEntreSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
