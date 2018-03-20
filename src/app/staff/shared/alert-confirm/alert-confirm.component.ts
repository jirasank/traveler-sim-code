import { Component, OnInit,Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AlertConfirmService } from './alert-confirm.service';

@Component({
  selector: 'app-alert-confirm',
  templateUrl: './alert-confirm.component.html',
  styleUrls: ['./alert-confirm.component.scss']
})
export class AlertConfirmComponent implements OnInit {

  // api exposed
  @Input() isUseRadius: boolean = false;
  @Input() isUseIcon  : boolean = false;
 
  // internal variable
  isShown : boolean;
  message : string;
  customButton  : any = '';

  // subscriber to service
  subscriptionShown   : Subscription;
  subscriptionMessage : Subscription;
  subscriptionButton  : Subscription;

  constructor(private _simplertService:AlertConfirmService){}

  ngOnInit(){   

    this.subscriptionShown    = this._simplertService.isShown$.subscribe(res => this.isShown = res);
    this.subscriptionMessage  = this._simplertService.message$.subscribe(res => this.message = res);
    this.subscriptionButton   = this._simplertService.buttonLists$.subscribe(res => this.customButton = res);
  }

  ngOnDestroy(){
    this.subscriptionShown.unsubscribe();
    this.subscriptionMessage.unsubscribe();
    this.subscriptionButton.unsubscribe();
  }

  closePopup(){
    this._simplertService.closPopup();      
  }

  overlayClick(event){
    if(event.target.className === 'simplert simplert--shown'){
      this._simplertService.closPopup();
    }    
  }

}
