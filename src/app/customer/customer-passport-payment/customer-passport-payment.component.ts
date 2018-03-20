import { Component, OnInit } from '@angular/core';
import { GlobaldataService } from '../../staff/service/globaldata.service';
import { package_model } from '../../staff/shared/model/package.model';
import { $WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-passport-payment',
  templateUrl: './customer-passport-payment.component.html',
  styleUrls: ['./customer-passport-payment.component.scss']
})
export class CustomerPassportPaymentComponent implements OnInit {
  Package: package_model[] = []; 
  callCenterMsg:string ="Payment, please";
 // chkbox: boolean = true;
  showPackage: boolean = false;
  private ws: $WebSocket;
  constructor(
    public packageSelect:GlobaldataService
    , private router: Router
    , private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.packageSelect.globalPageCurrent = this.router.url;
    console.log("router current:",this.router.url);

      this.ws = new $WebSocket("ws://localhost:8080/RemoteSlave");
   // set received message callback
        this.ws.onMessage(
            (msg: MessageEvent) => {
                console.log("onMessage payment", msg.data);                 
              
               //  alert('message')                     
                let json = JSON.parse(msg.data);     
                if(json.command == "next"){
                      this.showPackage = false;
                      this.Package = [];
                     this.router.navigate([json.data], { relativeTo: this.route });
                } else if(json.command == "cash") {
                 this.packageSelect.globalCash = json.data;
                } else {                  
                  this.Package = json.data;    
                 
                  this.showPackage = json.showPackage;
                 // this.callCenterMsg = json.msg; 
                  this.packageSelect.globalAmount = json.amount;
                }                         
              
            },
            {autoApply: false}
        );
  // this.Package = [
  //       {
  //          "id": "A",
  //          "character": "A",
  //         "day": "7 Days",
  //         "speed": "2.5GB",
  //         "call_text_unit": "Bath Credit",
  //         "des": "SIM 49 THB / Topup 250 THB",
  //         "credit": "250",
  //         "price": 1100,
  //         "price_unit":"THB",
  //        // "color": "#5F9EA0",
  //         "hot": "N",
  //         "count": 2,
  //         "group":"BEST_SELLER",
  //         "sim": []
  //       }
  //       , {
  //         "id": "B",    
  //         "character": "B",      
  //         "day": "8 Days",
  //         "speed": "2.5GB",
  //         "call_text_unit": "Bath Credit",
  //         "des": "SIM 49 THB / Topup 250 THB",
  //         "credit": "250",
  //         "price": 1100,
  //         "price_unit":"THB",
  //        // "color": "#5F9EA0",
  //         "hot": "N",
  //         "count": 1,
  //         "group":"BEST_SELLER",
  //         "sim": []
  //       }
        //  , {
        //   "id": "B",    
        //   "character": "B",      
        //   "day": "8 Days",
        //   "speed": "2.5GB",
        //   "call_text_unit": "Bath Credit",
        //   "des": "SIM 49 THB / Topup 250 THB",
        //   "credit": "250",
        //   "price": 1100,
        //   "price_unit":"THB",
        //  // "color": "#5F9EA0",
        //   "hot": "N",
        //   "count": 1,
        //   "group":"BEST_SELLER",
        //   "sim": []
        // }
        //  , {
        //   "id": "B",    
        //   "character": "B",      
        //   "day": "8 Days",
        //   "speed": "2.5GB",
        //   "call_text_unit": "Bath Credit",
        //   "des": "SIM 49 THB / Topup 250 THB",
        //   "credit": "250",
        //   "price": 1100,
        //   "price_unit":"THB",
        //  // "color": "#5F9EA0",
        //   "hot": "N",
        //   "count": 1,
        //   "group":"BEST_SELLER",
        //   "sim": []
        // }
        //  , {
        //   "id": "B",    
        //   "character": "B",      
        //   "day": "8 Days",
        //   "speed": "2.5GB",
        //   "call_text_unit": "Bath Credit",
        //   "des": "SIM 49 THB / Topup 250 THB",
        //   "credit": "250",
        //   "price": 1100,
        //   "price_unit":"THB",
        //  // "color": "#5F9EA0",
        //   "hot": "N",
        //   "count": 1,
        //   "group":"BEST_SELLER",
        //   "sim": []
        // }
    //];
  }


}
