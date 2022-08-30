import { TestBed } from '@angular/core/testing';

import { MaitenanceService } from './maitenance.service';

describe('MaitenanceService', () => {
  let service: MaitenanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaitenanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
