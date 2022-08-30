import { TestBed } from '@angular/core/testing';

import { EquipementMaterielService } from './equipement-materiel.service';

describe('EquipementMaterielService', () => {
  let service: EquipementMaterielService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipementMaterielService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
