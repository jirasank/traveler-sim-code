import { TestBed, inject } from '@angular/core/testing';

import { PageLoadingService } from './page-loading.service';

describe('PageLoadingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageLoadingService]
    });
  });

  it('should be created', inject([PageLoadingService], (service: PageLoadingService) => {
    expect(service).toBeTruthy();
  }));
});
