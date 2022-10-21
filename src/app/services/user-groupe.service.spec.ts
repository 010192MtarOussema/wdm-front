import { TestBed } from '@angular/core/testing';

import { UserGroupeService } from './user-groupe.service';

describe('UserGroupeService', () => {
  let service: UserGroupeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserGroupeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
