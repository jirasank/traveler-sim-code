import { Injectable } from '@angular/core';
declare let $:any;

@Injectable()
export class PageLoadingService {

  constructor() { }
  openLoading(): void {
     $('#preload').show();
  }
  closeLoading(): void {
     $('#preload').hide();
  }

}
