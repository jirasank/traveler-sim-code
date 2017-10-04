import { TestBed, inject } from '@angular/core/testing';

import { ReadIdcardService } from './read-idcard.service';

describe('ReadIdcardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReadIdcardService]
    });
  });

  it('should be created', inject([ReadIdcardService], (service: ReadIdcardService) => {
    expect(service).toBeTruthy();
  }));
});
