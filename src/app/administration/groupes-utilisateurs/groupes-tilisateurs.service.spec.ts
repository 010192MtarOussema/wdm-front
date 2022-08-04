import { TestBed } from '@angular/core/testing';

import { GroupesTilisateursService } from './groupes-tilisateurs.service';

describe('GroupesTilisateursService', () => {
  let service: GroupesTilisateursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupesTilisateursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
