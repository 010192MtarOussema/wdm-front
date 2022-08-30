import { TestBed } from '@angular/core/testing';

import { GestionsUtilisateursService } from './gestions-utilisateurs.service';

describe('GestionsUtilisateursService', () => {
  let service: GestionsUtilisateursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionsUtilisateursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
