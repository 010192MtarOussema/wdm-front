import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelechargementsComponent } from './telechargements.component';

describe('TelechargementsComponent', () => {
  let component: TelechargementsComponent;
  let fixture: ComponentFixture<TelechargementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelechargementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelechargementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
