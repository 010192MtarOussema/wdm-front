import { TestBed } from '@angular/core/testing';

import { FunctionalDomainService } from './functional-domain.service';

describe('FunctionalDomainService', () => {
  let service: FunctionalDomainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunctionalDomainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
