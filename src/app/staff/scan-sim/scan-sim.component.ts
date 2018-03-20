import { Component, OnInit, ElementRef, ViewChildren, ViewChild } from '@angular/core';
//import { SlicePipe } from '@angular/common';
import { package_model } from '../shared/model/package.model';
import { ActivatedRoute, Router } from "@angular/router";
import { GlobaldataService } from '../service/globaldata.service';
import { AlertConfirmService } from '../shared/alert-confirm/alert-confirm.service';
import { Sim_item } from '../shared/model/sim.model';
import { ServiceApiService } from '../service/api/service-api.service';
import { PageLoadingService } from '../shared/page-loading/page-loading.service';
import { GlobalmasterService } from '../service/globalmaster.service';

@Component({
  selector: 'app-scan-sim',
  templateUrl: './scan-sim.component.html',
  styleUrls: ['./scan-sim.component.scss']
})
export class ScanSimComponent implements OnInit {
  callCenterMsg: string = "Payment,please";
  Package: package_model[];
  order: number = 0;
  // statusSimDone: boolean = false;
  //el: ElementRef;
  //@ViewChildren('input') inputs;
  //@ViewChild('simInput1') simInput: ElementRef;
  //simArray: string[];
  //Package: any;
  // chkbox: boolean = true;
  constructor(
    public packageSelect: GlobaldataService
     ,public globalmasterService : GlobalmasterService
    , private router: Router
    , private route: ActivatedRoute
    , private alertConfirmService: AlertConfirmService
    , private serviceApiService: ServiceApiService
    , private pageLoadingService: PageLoadingService
  ) { }

  ngOnInit() {

    this.sendToSlave();

    this.Package = this.packageSelect.globalPackageSelect.filter(pkg => pkg.count > 0);
    this.setOrder();

    // this.simArray = new Array(this.packageSelect.globalTotal);
    // this.Package = [
    //    {
    //      "id": "A",
    //     "day": "7 Days",
    //     "speed": "2.5GB",
    //     "spec": "Internet",
    //     "des": "SIM 49 THB / Topup 250 THB",
    //     "credit": "250",
    //     "price": 100,
    //     "color":"#5F9EA0" ,
    //     "count": 0,
    //     "sim": [
    //              {
    //                 "simNumber": "9032-5",
    //                 "mobileNumber": "",
    //                 "balance": "",
    //                 "step": 0,
    //                 "error": false
    //              },
    //               {
    //                 "simNumber": "9032-6",
    //                 "mobileNumber": "",
    //                 "balance": "",
    //                 "step": 0,
    //                 "error": false
    //              }
    //            ]
    //    },
    //     {
    //       "id": "B",
    //     "day": "11 Days",
    //     "speed": "2.5GB",
    //     "spec": "Internet",
    //     "des": "SIM 49 THB / Topup 250 THB",
    //     "credit": "250",
    //     "price": 100,
    //     "color":"#5F9EA0" ,
    //     "count": 0,
    //     "sim": [
    //              {
    //                 "simNumber": "",
    //                 "mobileNumber": "",
    //                 "balance": "",
    //                 "step": 0,
    //                 "error": false
    //              }
    //            ]
    //    },
    //     {
    //      "id": "A",
    //     "day": "7 Days",
    //     "speed": "2.5GB",
    //     "spec": "Internet",
    //     "des": "SIM 49 THB / Topup 250 THB",
    //     "credit": "250",
    //     "price": 100,
    //     "color":"#5F9EA0" ,
    //     "count": 0,
    //     "sim": [
    //              {
    //                 "simNumber": "9032-5",
    //                 "mobileNumber": "",
    //                 "balance": "",
    //                 "step": 0,
    //                 "error": false
    //              },
    //               {
    //                 "simNumber": "9032-6",
    //                 "mobileNumber": "",
    //                 "balance": "",
    //                 "step": 0,
    //                 "error": false
    //              }
    //            ]
    //    },
    //     {
    //      "id": "A",
    //     "day": "7 Days",
    //     "speed": "2.5GB",
    //     "spec": "Internet",
    //     "des": "SIM 49 THB / Topup 250 THB",
    //     "credit": "250",
    //     "price": 100,
    //     "color":"#5F9EA0" ,
    //     "count": 0,
    //     "sim": [
    //              {
    //                 "simNumber": "9032-5",
    //                 "mobileNumber": "",
    //                 "balance": "",
    //                 "step": 0,
    //                 "error": false
    //              },
    //               {
    //                 "simNumber": "9032-6",
    //                 "mobileNumber": "",
    //                 "balance": "",
    //                 "step": 0,
    //                 "error": false
    //              }
    //            ]
    //    }
    //  ] ;


  }
  ngAfterViewInit() {
    this.setFocusSim();
  }
  sendToSlave(){
    var str = {
      command: 'next',
      data: '/customer/customer-passport-payment'
    };

    //  let data = '{"command":"open","packages":}';
    this.globalmasterService.ws_master.send(str).subscribe(
      (msg) => {
        console.log("next", msg.data);
      },
      (msg) => {
        console.log("error", msg);
      },
      () => {
        console.log("complete");
      }
    );
  }
  sendPackage() {
    //  var data = this.message.nativeElement.value;
    // console.log(data);   
    const str = {
      command: 'open',
      data: this.Package,
      msg: this.callCenterMsg,
      showPackage: false,
      amount: this.packageSelect.globalAmount
    };
    //  const myObjStr = JSON.stringify(str);    
    //  let data = '{"command":"open","packages":}';
    this.globalmasterService.ws_master.send(str).subscribe(
      (msg) => {
        console.log("next", msg.data);
      },
      (msg) => {
        console.log("error", msg);
      },
      () => {
        console.log("complete");
      }
    );
  }
  setFocusSim() {
    if (this.Package.length > 0) {
      for (var i = 0; i < this.Package.length; i++) {
        for (var j = 0; j < this.Package[i].sim.length; j++) {
          if (this.Package[i].sim[j].simNumber == "") {
            let simNo = this.Package[i].sim[j].simNo;
            document.getElementById("simId" + simNo).focus();
            i = this.Package.length
            break;
          }
        }
      }
    }
  }
  setOrder() {
    let order = 1; //enter order sim
    for (var i = 0; i < this.Package.length; i++) {
      for (var j = 0; j < this.Package[i].sim.length; j++) {
        this.Package[i].sim[j].simNo = order.toString();
        order++;
      }
    }
  }
  onGoCalc() {
    this.router.navigate(['/staff/calulate'], { relativeTo: this.route });
  }
  _keyPress(event: any, indexPkg, indexSim, simNo, inputValue: any): void {
    if (event.keyCode == 13) {
      // alert(inputValue+indexPkg+indexSim);
      let duplicate = false;
      if (simNo > 1) {
        for (var i = 0; i < this.Package.length; i++) {
          for (var j = 0; j < this.Package[i].sim.length; j++) {

            //if(this.Package[i].sim[j].simNumber == "") statueDone = false;

            if (this.Package[i].sim[j].simNumber == inputValue) {
              this.Package[indexPkg].sim[indexSim].simNumber = "";
              //  this.alertConfirmService.openError("Sim Duplicate"); 
              document.getElementById("simId" + simNo).setAttribute('placeholder', 'Sim Duplicate');
              //i = this.Package.length;
              duplicate = true;
              document.getElementById("simId" + simNo).focus();
              event.target.select();
              event.target.value = "";

              break;
            }
          }
        }
      }

      if (!duplicate) {
        this.pageLoadingService.openLoading(); 

      // setTimeout(() => {
        //this.serviceApiService.getMobileBySim(inputValue).subscribe(response => {
        this.serviceApiService.getMobileBySim(inputValue).then((response) => {
          this.pageLoadingService.closeLoading(); 
          if (response.resultCode == "20000") {
             console.log('response Query mobile:',response);
            let data = response.data;
            let res = data.D_GetPPSimSt2Response;
            let output = res.outbuf;
            let mobile = output.PP_BOOK_MOBILE_NO;
            let imsi = output.PP_IMSI;
            let simType = output.PP_SIM_TYPE;
            this.Package[indexPkg].sim[indexSim].simNumber = inputValue;
            this.Package[indexPkg].sim[indexSim].mobileNumber = mobile;
            this.Package[indexPkg].sim[indexSim].imsiNumber = imsi;
            this.Package[indexPkg].sim[indexSim].simType = simType;

            if (Number(simNo) < this.packageSelect.globalTotal) {
              try {
                simNo = Number(simNo) + 1;
                document.getElementById("simId" + simNo).focus();
              } catch (e) { }
            }
            this.packageSelect.globalStatusSimDone = this.checkDoneSim();

          } else {
             document.getElementById("simId" + simNo).setAttribute('placeholder', response.developerMessage);
             document.getElementById("simId" + simNo).focus();
              event.target.select();
              event.target.value = "";
            //this.alertConfirmService.openError("resultCode :" + response.resultCode + "<br>" + response.developerMessage);
          }  
            
        }).catch ( (err) => {
            this.pageLoadingService.closeLoading(); 
             console.log('88888 Exception query mobile ['+simNo+']  => , ',err);
             document.getElementById("simId" + simNo).setAttribute('placeholder', "Exception");
             document.getElementById("simId" + simNo).focus();
             event.target.select();
             event.target.value = "";
              
        });
       //}, 500);

      }

      // this.packageSelect.globalPackageSelect = this.packageSelect.globalPackageSelect;
    }
  }
  checkDoneSim(): string {
    let chk = "done";
    for (var i = 0; i < this.Package.length; i++) {
      for (var j = 0; j < this.Package[i].sim.length; j++) {
        if (this.Package[i].sim[j].simNumber == "") chk = "scan";
      }
    }
    return chk;
  }

  result(item_package) {
    // this.packageSelect.globalPackageSelect.push(valuePackage);
    const findPackage = this.packageSelect.globalPackageSelect.find(pkg => pkg.id === item_package.id);
    if (findPackage) {
      findPackage.count = item_package.count;
      let sim: Sim_item;
      sim = {
        "simNo": "",
        "simNumber": "",
        "mobileNumber": "",
        "imsiNumber":"",
        "simType":"",
        "balance": "",
        "step": 0,
        "error": false,
        "errorDetail": "",
        "statusError": "",
        "stepRetry": "",
        "sTransID": []
      };
      findPackage.sim.push(sim);
      this.packageSelect.globalAmount += item_package.price;
      this.packageSelect.globalTotal++;
      this.packageSelect.globalStatusSimDone = "scan";  //add package must new scan
      this.sendPackage();
    }
    // this.showMessage();
  }
  onSelectPackage(pkg: any): void {

    if (pkg.opt == '+') {
      this.result(pkg.package);
    } else {
      this.deletePackage(pkg.package);
    }
    this.Package = this.packageSelect.globalPackageSelect.filter(pkg => pkg.count > 0);
    this.setOrder();

    setTimeout(() => {
      this.setFocusSim();
    }, 100);

  }
  deletePackage(item_package: package_model) {
    const findPackage = this.packageSelect.globalPackageSelect.find(pkg => pkg.id === item_package.id);
    if (findPackage) {
      findPackage.count = item_package.count;
      findPackage.sim.splice(-1);
      this.packageSelect.globalAmount -= item_package.price;
      this.packageSelect.globalTotal--;
       this.sendPackage();
    }
    // this.showMessage();
  }
  onBack() {

    this.router.navigate(['/staff/passport'], { relativeTo: this.route });
    var str = {
      command: 'next',
      data: '/customer/customer-show-passport'
    };

    //  let data = '{"command":"open","packages":}';
    this.globalmasterService.ws_master.send(str).subscribe(
      (msg) => {
        console.log("next", msg.data);
      },
      (msg) => {
        console.log("error", msg);
      },
      () => {
        console.log("complete");
      }
    );
  }

}
