import { Component, OnInit } from '@angular/core';
import { GlobaldataService } from '../service/globaldata.service';
import { ActivatedRoute, Router } from "@angular/router";
import { package_model } from '../../staff/shared/model/package.model';
import { GlobalmasterService } from '../service/globalmaster.service';

@Component({
  selector: 'app-calculate-cash',
  templateUrl: './calculate-cash.component.html',
  styleUrls: ['./calculate-cash.component.scss']
})
export class CalculateCashComponent implements OnInit {
  Package: package_model[] = [];
  tab = 1;
  amount: number = 0;
  optionCalc: string = "replace";
  //chkbox: boolean = true;
  callCenterMsg: string = "Payment,please";
  constructor(public packageSelect:GlobaldataService
   ,public globalmasterService : GlobalmasterService
                ,private router: Router
                ,private route: ActivatedRoute
  ) { }

  ngOnInit() {
     this.Package = this.packageSelect.globalPackageSelect.filter(pkg => pkg.count > 0);  

     this.sendSlave();
    
    this.setAllmyClass(this.tab);
    this.amount = this.packageSelect.globalPaid;

    this.sendSlavePackage();
       
    // this.Package = [
    //   {
    //     "id": "A",
    //     "day": "7 Days",
    //     "speed": "2.5GB",
    //     "spec": "Internet",
    //     "des": "SIM 49 THB / Topup 250 THB",
    //     "credit": "250",
    //     "price": 100,
    //     "color": "#5F9EA0",
    //      "hot": false,
    //     "count": 0
    //   },
    //   {
    //     "id": "B",
    //     "day": "8 Days",
    //     "speed": "2.5GB",
    //     "spec": "Internet",
    //     "des": "SIM 49 THB / Topup 250 THB",
    //     "credit": "250",
    //     "price": 599,
    //     "color": "#5F9EA0",
    //      "hot": false,
    //     "count": 0
    //   }
      //  ,
      //  {
      //   "id": "A",
      //   "day": "7 Days",
      //   "speed": "2.5GB",
      //   "spec": "Internet",
      //   "des": "SIM 49 THB / Topup 250 THB",
      //   "credit": "250",
      //   "price": 100,
      //   "color":"#5F9EA0" 
      // },
      // {
      //  "id": "B",
      //   "day": "8 Days",
      //   "speed": "2.5GB",
      //   "spec": "Internet",
      //   "des": "SIM 49 THB / Topup 250 THB",
      //   "credit": "250",
      //   "price": 599,
      //   "color":"#5F9EA0" 
      //  }
    // ]
  }
//  setChkboxCash(chkboxValue){
//    this.chkbox = chkboxValue;
//   }
sendSlave(){
   var  str = {
        command: 'next',
        data: '/customer/customer-passport-payment'
       } ;
      
     //  let data = '{"command":"open","packages":}';
        this.globalmasterService.ws_master.send(str).subscribe(
            (msg)=> {
                console.log("next", msg.data);
            },
            (msg)=> {
                console.log("error", msg);
            },
            ()=> {
                console.log("complete");
            }
        );
}
sendSlavePackage(){
  if(this.packageSelect.globalTotal > 0){
      setTimeout(() => 
      {
          var str1 = {
          command: 'open',
          data: this.Package,
          msg: this.callCenterMsg,
          showPackage: true,
          amount:this.packageSelect.globalAmount
        } ;
      //  const myObjStr = JSON.stringify(str);    
      //  let data = '{"command":"open","packages":}';
          this.globalmasterService.ws_master.send(str1).subscribe(
              (msg)=> {
                  console.log("next", msg.data);
              },
              (msg)=> {
                  console.log("error", msg);
              },
              ()=> {
                  console.log("complete");
              }
          );
      },
      100);
    }
}
 setAllmyClass(btn){   
  this.tab = btn;   
}
  calc(opt: string) {
      this.packageSelect.globalPaid = 0;
      if (opt == "Exact") {
        this.amount =  this.packageSelect.globalAmount;
        this.optionCalc = "replace";
      } else if (Number(opt) < 10) {
        if (this.optionCalc == "append" && this.amount.toString().length < 6) {
          if (this.amount.toString().includes(".") == true) {
            let arrayDigit = this.amount.toString().split(".");
            if (arrayDigit[1].length < 2) {
              this.amount = Number(this.amount.toString() + opt);
            }
          } else {
            this.amount = Number(this.amount.toString() + opt);
          }
          //this.amount = Number(this.amount.toLocaleString('en-US', { maximumFractionDigits: 2 }));
        } else {
          if (this.optionCalc == ".") {
            this.amount = Number(this.amount.toString() + this.optionCalc + opt);
            this.optionCalc = "append";
          } else {
            this.amount = Number(opt);
            this.optionCalc = "append";
          }
        }
      } else if (opt == "ok") {
         this.optionCalc = opt;   
         this.packageSelect.globalPaid = this.amount;
      } else if (opt == "del") {
        this.optionCalc = "append";
        this.amount = Number(this.amount.toString().substring(0, this.amount.toString().length - 1));
      } else if (opt == ".") {
        if (this.amount.toString().includes(".") == false) this.optionCalc = ".";
      } else {
        if (opt == "C") opt = "0";
        this.amount = Number(opt);
        this.optionCalc = "replace";
      }
   

  }
  onGoProcessSim(){
    this.packageSelect.globalStatusSimDone = "process";
     this.router.navigate(['/staff/process-sim'], { relativeTo: this.route });
  }
}
