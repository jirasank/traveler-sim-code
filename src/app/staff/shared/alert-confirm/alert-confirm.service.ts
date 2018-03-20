import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable()
export class AlertConfirmService { 
  private _isShownSource     = new BehaviorSubject<boolean>(false);
  private _messageSource     = new BehaviorSubject<string>("");
  public _buttonLists: any = new BehaviorSubject<any>('');

  isShown$      = this._isShownSource.asObservable();
  message$      = this._messageSource.asObservable();
  buttonLists$  = this._buttonLists.asObservable();


  constructor() { } 
  
  openConfirm(message:string,btn:any){
    this._isShownSource.next(true);
    this._messageSource.next(message);
    this._buttonLists.next(btn);
  }
   openError(message:string){
    this._isShownSource.next(true);
    this._messageSource.next(message);
    this._buttonLists.next(null);
  }
  
  closPopup(): void {
    this._isShownSource.next(false);    
  }

}
