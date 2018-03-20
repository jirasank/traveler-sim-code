import { TestBed, inject } from '@angular/core/testing';

import { CashierService } from './cashier.service';

describe('CashierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CashierService]
    });
  });

  it('should be created', inject([CashierService], (service: CashierService) => {
    expect(service).toBeTruthy();
  }));
});
