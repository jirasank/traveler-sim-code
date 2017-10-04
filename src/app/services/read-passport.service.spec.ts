import { TestBed, inject } from '@angular/core/testing';

import { ReadPassportService } from './read-passport.service';

describe('ReadPassportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReadPassportService]
    });
  });

  it('should be created', inject([ReadPassportService], (service: ReadPassportService) => {
    expect(service).toBeTruthy();
  }));
});
