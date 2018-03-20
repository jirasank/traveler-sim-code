import { Component, OnInit } from '@angular/core';
import { package_model } from '../../staff/shared/model/package.model';
import { Sim_item } from '../../staff/shared/model/sim.model';
import { $WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobaldataService } from '../../staff/service/globaldata.service';

@Component({
  selector: 'app-customer-done',
  templateUrl: './customer-done.component.html',
  styleUrls: ['./customer-done.component.scss']
})
export class CustomerDoneComponent implements OnInit {

Package: package_model[]; 
PackageHide:package_model;
 //arr_names = new Array(2);
 process: string[];
 simProgress: Sim_item[]; 
 interval: any;
 intervalOne: any;
 index: number = 0;
 indexSim: number = 0;
 countItem: number;
 countSim: number;
 typeButtonError: string = "error";
 callCenterMsg: string = "Please wait for a while";
 chkbox: boolean = true;
 txtSim: string = "SIM";
 total :number = 0;
 amount :number = 0; 
 statusDone: string = "processing";
 private ws: $WebSocket;
 constructor(
     private router: Router
    , private route: ActivatedRoute
    , public packageSelect:GlobaldataService
 ) { }

  ngOnInit() {
   this.PackageHide = {
      "id": "",
      "character": "",
      "day": "",
      "speed": "",
      "call_text_unit": "",
      "des": "",
      "credit": "",
      "price": 0,
      "price_unit": "",
      "hot": "",
      "count": 0,
      "group": "",
      "group_type": "",
      "topup": "",
      "sim": []
    };
    this.receiptMaster();

    // this.total = 2;
    // this.amount = 1147;

    //  this.Package =[
    //    {
    //     "id": "A",
    //     "character": "A",
    //     "day": "7 Days",
    //       "speed": "2.5GB",
    //       "call_text_unit": "Bath Credit",
    //       "des": "SIM 49 THB / Topup 250 THB",
    //       "credit": "250",
    //       "price": 1100,
    //       "price_unit":"THB",
    //      // "color": "#5F9EA0",
    //       "hot": "N",
    //       "count": 2,
    //       "group":"BEST_SELLER",
    //       "group_type":"TRAVELER_SIM",
    //       "topup":"",
    //     "sim": [
    //              {
    //                 "simNo" : "1",
    //                 "simNumber": "1234567894567",
    //                 "mobileNumber": "",
    //                 "imsiNumber":"",
    //                 "simType":"",
    //                 "balance": "",
    //                 "step": 0,
    //                 "error": false,
    //                 "errorDetail": "",
    //                 "statusError": "",
    //                 "sTransID":[]
    //              },
    //               {
    //                 "simNo" : "2",
    //                 "simNumber": "4567894561234",
    //                 "mobileNumber": "",
    //                 "imsiNumber":"",
    //                 "simType":"",
    //                 "balance": "",
    //                 "step": 0,
    //                 "error": false,
    //                 "errorDetail": "",
    //                 "statusError": "",
    //                  "sTransID":[]
    //              }
    //            ]
    //    },
    //     {
    //       "id": "B",
    //       "character": "B",
    //      "day": "8 Days",
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
    //       "group_type":"TRAVELER_SIM",
    //        "topup":"",
    //       "sim": [
    //              {
    //                 "simNo" : "3",
    //                 "simNumber": "4567894563215",
    //                 "mobileNumber": "",
    //                 "imsiNumber":"",
    //                 "simType":"",
    //                 "balance": "",
    //                 "step": 0,
    //                 "error": false,
    //                 "errorDetail": "",
    //                 "statusError": "",
    //                  "sTransID":[]
    //              }
    //            ]
    //    }
    //    ,
    //     {
    //       "id": "C",
    //       "character": "C",
    //      "day": "8 Days",
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
    //       "group_type":"TRAVELER_SIM",
    //        "topup":"",
    //     "sim": [
    //              {
    //                 "simNo" : "3",
    //                 "simNumber": "4567894563215",
    //                 "mobileNumber": "",
    //                 "imsiNumber":"",
    //                 "simType":"",
    //                 "balance": "",
    //                 "step": 0,
    //                 "error": false,
    //                 "errorDetail": "",
    //                 "statusError": "",
    //                  "sTransID":[]
    //              }
    //            ]
    //    }
      //   ,
      //   {
      //     "id": "C",
      //     "character": "C",
      //    "day": "8 Days",
      //     "speed": "2.5GB",
      //     "call_text_unit": "Bath Credit",
      //     "des": "SIM 49 THB / Topup 250 THB",
      //     "credit": "250",
      //     "price": 1100,
      //     "price_unit":"THB",
      //    // "color": "#5F9EA0",
      //     "hot": "N",
      //     "count": 1,
      //     "group":"BEST_SELLER",
      //     "group_type":"TRAVELER_SIM",
      //      "topup":"",
      //   "sim": [
      //            {
      //               "simNo" : "3",
      //               "simNumber": "4567894563215",
      //               "mobileNumber": "",
      //               "imsiNumber":"",
      //               "simType":"",
      //               "balance": "",
      //               "step": 0,
      //               "error": false,
      //               "errorDetail": "",
      //               "statusError": "",
      //                "sTransID":[]
      //            }
      //          ]
      //  }
      //   ,
      //   {
      //     "id": "C",
      //     "character": "C",
      //    "day": "8 Days",
      //     "speed": "2.5GB",
      //     "call_text_unit": "Bath Credit",
      //     "des": "SIM 49 THB / Topup 250 THB",
      //     "credit": "250",
      //     "price": 1100,
      //     "price_unit":"THB",
      //    // "color": "#5F9EA0",
      //     "hot": "N",
      //     "count": 1,
      //      "group":"BEST_SELLER",
      //      "group_type":"TRAVELER_SIM",
      //      "topup":"",
      //   "sim": [
      //            {
      //               "simNo" : "3",
      //               "simNumber": "4567894563215",
      //               "mobileNumber": "",
      //               "imsiNumber":"",
      //               "simType":"",
      //               "balance": "",
      //               "step": 0,
      //               "error": false,
      //               "errorDetail": "",
      //               "statusError": "",
      //                "sTransID":[]
      //            }
      //          ]
      //  }
    // ] ;

     

      // this.countItem = this.Package.length;
     

      //     this.interval = setInterval(() => {     
      //       this.onProcess();
      //   }, 1000);
  }
  receiptMaster(){

     this.packageSelect.globalPageCurrent = this.router.url;
    console.log("router current:",this.router.url);
    
      this.ws = new $WebSocket("ws://localhost:8080/RemoteSlave");
   // set received message callback
        this.ws.onMessage(
            (msg: MessageEvent) => {
                console.log("onMessage ", msg.data);                 
              
               //  alert('message')                     
                let json = JSON.parse(msg.data);     
                if(json.command == "next"){                    
                      this.Package = [];
                      this.statusDone = json.statusDone;
                      if(this.statusDone == 'done') this.packageSelect.clarData();
                      this.router.navigate([json.data], { relativeTo: this.route });

                } else if(json.command == "cash") {
                 this.packageSelect.globalCash = json.data;
                } else {                  
                  this.Package = json.data;                    
                  this.callCenterMsg = json.msg; 
                  this.packageSelect.globalAmount = json.amount;
                  this.packageSelect.globalTotal =  json.countsim;
                 // this.statusDone = json.statusDone;
                  if(this.packageSelect.globalTotal > 1) this.txtSim = "SIMs";
                }                         
              
            },
            {autoApply: false}
        );
  }
   onProcess(){
        let step: number;
        let mobileNumber:string = "";
        let balance = "";
        let error: boolean;      
        let errorDetail = "";    
        this.countSim = this.Package[this.index].sim.length;
        step = this.Package[this.index].sim[this.indexSim].step;

       switch(step){
         case 0: step = 1;
            break;
         case 1: step = 2;
            break;
         case 2: step = 3;
           break;
         case 3: step = 4;
           mobileNumber = "087830338" + this.Package[this.index].sim[this.indexSim].simNumber.substring(12);
           balance = "0.00 THB"    
           if(this.Package[this.index].sim[this.indexSim].simNumber == "9032-6" ){
              error = true;
              errorDetail = "430893254-server connection timeout";
              balance = "";
              mobileNumber= "";     
             // step= 0;
           }
           break;
       } 
        
        let  sim : Sim_item;
          sim = {
           "simNo" : this.Package[this.index].sim[this.indexSim].simNo,
          "simNumber": this.Package[this.index].sim[this.indexSim].simNumber,
          "mobileNumber": mobileNumber,
          "imsiNumber":"",
          "simType":"",
          "balance": balance,
          "step": step,
          "error": error,
          "errorDetail": errorDetail,
          "statusError": "error",
          "stepRetry": "",
          "sTransID":[]
         
          };
       this.Package[this.index].sim[this.indexSim] = sim; 
          if(step == 4 )    {
              step = 0;this.indexSim++;
          } 
          if(this.indexSim >= this.countSim)    {
            this.index++;
            this.indexSim = 0;
          }   
          
          if(this.index >= this.countItem) {
             clearInterval(this.interval);             
             this.statusDone = this.checkDoneProcess(); 
          }
  } 
   checkDoneProcess(): string {
    let chk = "done";
    for (var i = 0; i < this.Package.length; i++) {
      for (var j = 0; j < this.Package[i].sim.length; j++) {
         if(this.Package[i].sim[j].mobileNumber == "" && this.Package[i].sim[j].statusError != "cancel") chk = "processing";
      }
    }
    return chk;
  } 

}

