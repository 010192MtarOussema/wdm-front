import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserToGroupComponent } from './delete-user-to-group.component';

describe('DeleteUserToGroupComponent', () => {
  let component: DeleteUserToGroupComponent;
  let fixture: ComponentFixture<DeleteUserToGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUserToGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteUserToGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
