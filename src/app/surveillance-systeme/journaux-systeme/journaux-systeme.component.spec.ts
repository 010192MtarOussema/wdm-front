import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournauxSystemeComponent } from './journaux-systeme.component';

describe('JournauxSystemeComponent', () => {
  let component: JournauxSystemeComponent;
  let fixture: ComponentFixture<JournauxSystemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournauxSystemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournauxSystemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
