import { TestBed, inject } from '@angular/core/testing';

import { GlobalmasterService } from './globalmaster.service';

describe('GlobalmasterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalmasterService]
    });
  });

  it('should be created', inject([GlobalmasterService], (service: GlobalmasterService) => {
    expect(service).toBeTruthy();
  }));
});
