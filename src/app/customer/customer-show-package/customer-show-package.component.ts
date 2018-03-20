import { Component, OnInit,OnDestroy } from '@angular/core';
import { GlobaldataService } from '../../staff/service/globaldata.service';
import { package_model } from '../../staff/shared/model/package.model';
import { ActivatedRoute, Router } from '@angular/router';
import { $WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';

//import { CashierService } from './cashier.service';
//import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-customer-show-package',
  templateUrl: './customer-show-package.component.html',
  styleUrls: ['./customer-show-package.component.scss']
})
export class CustomerShowPackageComponent implements OnInit,OnDestroy {
   private ws: $WebSocket;
   Package: package_model[] = []; 
  // chkbox: boolean = true;
   callCenterMsg:string ="Select your SIMs, please";
 //  amount: number = 0;
   interval: any;
   constructor(
     public packageSelect:GlobaldataService, 
     private router: Router
    , private route: ActivatedRoute
     ) { }
  //  onProcess(){
  //   this.ws = new $WebSocket("ws://localhost:8080/RemoteSlave");
  // //  // set received message callback
  //       this.ws.onMessage(
  //           (msg: MessageEvent) => {
  //               console.log("onMessage1", msg.data);                        
  //               let json = JSON.parse(msg.data);     
  //               if(json.command == "next"){
  //                    this.router.navigate([json.data], { relativeTo: this.route });
  //               } else if(json.command == "cash") {
  //                 this.packageSelect.globalCash = json.data;
  //               } else {
  //                 this.Package = json.data;    
  //                 this.callCenterMsg = json.msg; 
  //                 this.packageSelect.globalAmount = json.amount;
  //               }        
         
  //           },
  //           {autoApply: false} 
  //       ); 
   
  //  }  
   ngOnInit(   
   ) {   
   //  this.onProcess(); 
    this.packageSelect.globalPageCurrent = this.router.url;
    console.log("router current:",this.router.url);
    
      this.packageSelect.globalAmount = 0;
      this.ws = new $WebSocket("ws://localhost:8080/RemoteSlave");
     this.ws.onMessage(
            (msg: MessageEvent) => {
                console.log("onMessage show package", msg.data);   
                // alert(msg.data);                     
                let json = JSON.parse(msg.data);     
                if(json.command == "next"){
                     this.router.navigate([json.data], { relativeTo: this.route });
                } else if(json.command == "cash") {
                  this.packageSelect.globalCash = json.data;
                } else {
                  this.Package = json.data;    
                  this.callCenterMsg = json.msg; 
                   this.packageSelect.globalAmount = json.amount;
                }       
              
            },
            {autoApply: false}
        );  

    //  this.interval = setInterval(() => {
    //  if(this.Package.length == 0){
    //     this.ws.close();
    //     this.onProcess();
    //    } else {
    //      clearInterval(this.interval);  
    //    }
        
    //  }, 1000);

    

      //  this.showMessage = false;
      //  this.message = '';

    // this.Package = [
    //     {
    //       "id": "A",
    //       "character": "A",
    //       "day": "7 Days",
    //       "speed": "2.5GB",
    //       "call_text_unit": "Bath Credit",
    //       "des": "SIM 49 THB / Topup 250 THB",
    //       "credit": "250",
    //       "price": 1100,
    //       "price_unit":"THB",
    //      // "color": "#5F9EA0",
    //       "hot": "N",
    //       "count": 1,
    //       "group":"BEST_SELLER",
    //       "sim": []
    //     }
      //   , {
      //     "id": "B",
      //     "character": "B",
      //     "day": "8 Days",
      //     "speed": "2.5GB",
      //     "call_text_unit": "Bath Credit",
      //     "des": "SIM 49 THB / Topup 250 THB",
      //     "credit": "250",
      //     "price": 599,
      //      "price_unit":"THB",
      //   //  "color": "#5F9EA0",
      //     "hot": "N",
      //     "count": 2,
      //      "group":"BEST_SELLER",
      //     "sim": []
      //   }
      //   , {
      //     "id": "C",
      //     "character": "C",
      //     "day": "9 Days",
      //     "speed": "4GB",
      //     "call_text_unit": "Bath Credit",
      //     "des": "SIM 49 THB / Topup 250 THB",
      //     "credit": "250",
      //     "price": 100,
      //      "price_unit":"THB",
      //   //  "color": "#5F9EA0",
      //     "hot": "N",
      //     "count": 0,
      //      "group":"BEST_SELLER",
      //     "sim": []
      //   }
      //   ,
      //   {
      //    "id": "D",
      //    "character": "D",
      //     "day": "10 Days",
      //     "speed": "9GB",
      //     "call_text_unit": "Bath Credit",
      //     "des": "SIM 49 THB / Topup 250 THB",
      //     "credit": "250",
      //     "price": 100,
      //      "price_unit":"THB",
      //   //  "color":"#5F9EA0" ,
      //      "hot": "N",
      //     "count": 0,
      //      "group":"BEST_SELLER",
      //     "sim": []
      //    },
      //   {
      //    "id": "E",
      //    "character": "E",
      //     "day": "20 Days",
      //     "speed": "6GB",
      //     "call_text_unit": "Bath Credit",
      //     "des": "SIM 49 THB / Topup 250 THB",
      //     "credit": "250",
      //     "price": 100,
      //      "price_unit":"THB",
      //   //  "color":"#5F9EA0" ,
      //     "hot": "Y",
      //     "count": 0,
      //      "group":"BEST_SELLER",
      //     "sim": []
      //   }
        
     //  ]
  }
  
   ngOnDestroy() {
        this.ws.close();
    }

}
