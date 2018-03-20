import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CashierService {
 private subject = new Subject<any>();
  constructor() { }

 setMessage(msg: any): void {   
     this.subject.next(msg);
  }
 getObserver (): Observable<any> {
    return this.subject.asObservable();
  }
}
