import { TestBed } from '@angular/core/testing';

import { ShowNotificationService } from './show-notification.service';

describe('ShowNotificationService', () => {
  let service: ShowNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
