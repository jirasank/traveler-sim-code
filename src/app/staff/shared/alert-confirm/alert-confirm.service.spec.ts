import { TestBed, inject } from '@angular/core/testing';

import { AlertConfirmService } from './alert-confirm.service';

describe('AlertConfirmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertConfirmService]
    });
  });

  it('should be created', inject([AlertConfirmService], (service: AlertConfirmService) => {
    expect(service).toBeTruthy();
  }));
});
