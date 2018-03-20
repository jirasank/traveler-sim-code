import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobaldataService } from '../service/globaldata.service';
import { GlobalmasterService } from '../service/globalmaster.service';
import { package_model } from '../shared/model/package.model';
import { CashierService } from './cashier.service';
import { AlertConfirmService } from '../shared/alert-confirm/alert-confirm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sim_item,ITranSTs } from '../shared/model/sim.model';
import { package_group } from '../shared/model/package-group-model';
import { PageLoadingService } from '../shared/page-loading/page-loading.service';
import { ServiceApiService } from '../service/api/service-api.service';
import { JwtHelper } from 'angular2-jwt';
import { CookieService } from "angular2-cookie/core";
//import { $WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';
//import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.scss']
})
export class CashierComponent implements OnInit {
  //  packageSelect: pagemog[]=[];
  menuData: any = [];
  favData: any = [];
  jwtHelper: JwtHelper = new JwtHelper();
  userToken: any;
  displayName: any;

  sUserID: string; // from token
  sLocationCode: string; // from token

  // arrsim : ISIM[] = [];
  // arrrcp : IRCP[] = [];

  Package: package_model[] = [];
  // Package: any[] = [];
  pkg: any = [];
  //private group : package_group[] = [];

  // chkbox: boolean = true;
  //callCenterMsg: string = "Please wait for a while";
  // callCenterMsg: string = "Please wait for a while";

 // tab = 2;
  groupDefault: string = "BEST_SELLER";
  group_type_Default: string = "TRAVELER_SIM";
  sScript: string;
  process1: boolean = true;
  process2: boolean;
  process3: boolean;
  process4: boolean;
  // private ws: $WebSocket;  
  // el: ElementRef;
  // total:number = 0;
  constructor(public packageSelect: GlobaldataService
    , public globalmasterService: GlobalmasterService
    , private cashierService: CashierService
    , private alertConfirmService: AlertConfirmService
    , private router: Router
    , private route: ActivatedRoute
    , private pageLoadingService: PageLoadingService
    , private serviceApiService: ServiceApiService
    , private cookieService: CookieService
  ) {
    // this.packageSelect.createWsMaster();
  }

  ngOnInit() {
     this.packageSelect.globalIpAddress = "172.16.59.108";
     this.packageSelect.globalCallCenterMsg = "Please wait for a while";
     // let d = this.cookieService.get("accessToken");
      this.userToken = this.jwtHelper.decodeToken(this.cookieService.get("accessToken"));
      this.displayName = this.userToken.firstname + ' ' + this.userToken.lastname;
      this.sUserID = this.userToken.username; 
      this.sLocationCode = this.userToken.locationCode; 
    
      // 	console.log(this.userToken);
      // 	console.log(this.displayName);

    this.cashierService.getObserver().subscribe(message => { //for click cash sent to customer show pack
      var command = message.command;
      var data = message.data;
      this.sendSubscribe(command, data);
      
    });


    //var elem = document.getElementById("logo");
    //   this.ws = new $WebSocket("ws://localhost:8080/RemoteMaster");   

    this.setTabScript(this.packageSelect.globalTab);
  // this.setTab(this.packageSelect.globalTab);

    if (this.packageSelect.globalPackageSelect.length > 0) {
       this.Package = this.packageSelect.globalPackageSelect.filter(pkg => pkg.group == this.groupDefault && pkg.group_type == this.group_type_Default);
       this.packageSelect.globalPackageSelectCustomer = this.Package;
      this.showMessage();
    } else {

      this.pageLoadingService.openLoading();
      // this.getPackage();
      setTimeout(() => {

        this.getPackage();

        // this.testRun();

      }, 1000);
     //     let sim : Sim_item = {
  //    "balance":"0.00 THB",
  //   "error":false,
  //   "errorDetail":"query balance completed. Remaining bal.:0",
  //   "imsiNumber":"520032000001123",
  //   "mobileNumber":"0878303381",
  //   "simNo":"1",
  //   "simNumber":"1111111111111",
  //   "simType":"OTC",
  //   "statusError":"error",
  //   "step":4,
  //   "sTransID":[
  //       {
  //           "ID":"201711010000000354",
  //           "remark":"INSERT 2 SERVICE COMPLETE",
  //           "sStatusAF":"",
  //           "sStatusALL":"COMPLETE",
  //           "sStatusFA":"TUX_COMPLETE",
  //           "sStatusPP":"COMPLETE",
  //           "sStatusRC":"",
  //           "status":"SUCCESS_1",
  //           "trndate":"16/10/2017 18:15:42"
  //       }
  //   ]
  //  };
  //   let iTransID : ITranSTs = sim.sTransID;
  //   this.recursivePrint(iTransID, 0, (err) => {
  //       if (err) {
            
  //       } 
       

  //   });

    }
    // this.sendPackage();
  }
  
  

  // recursivePrint(iTransID, subindex: number, cb: any) { // array
	// if (!iTransID[subindex]) { // exit
	// 	return cb();
	//  }
  // }
  // testRun() {
  //   this.serviceApiService.prepaidIden().subscribe(response => {
  //     if (response.resultCode == "20000") {
  //       this.serviceApiService.queryBalance().subscribe(response => {
  //         if (response.resultCode == "20000") {
  //           alert('ok');
  //         } else {

  //         }
  //       });
  //     } else {

  //     }
  //   });
  // }

  //  getCurrentBalance (): void {
  //   this.currentBalanceFn = this.currentInformationService.getCurrentBalance(this.mobileNo);
  //   this.currentBalanceFn.then((balance: any) => {
  //     if (balance) {
  //       let stang: number = 100;
  //       let temp: number = (balance.data.remainingBalance) / stang;
  //       balance.data.remainingBalance = temp.toString();
  //       this.balanceInfo = balance.data;
  //     }
  //   }).catch((e: any) => {/**/
  //   });
  // }
  getPackage(): void {   

    // this.serviceApiService.getMyCPC_Package().then((response) => {
    //   if (response) {
    //     console.log(response.statusCode);

    //   }
    // }).catch((err: any) => {/**/
    //   console.log('Error', err);
    // });

    //this.serviceApiService.getPackage().then(pkg => this.Package = pkg);

    // this.serviceApiService.getMyCPC_Package().subscribe(response => {

   //  this.pageLoadingService.openLoading();
    this.serviceApiService.getMyCPC_Package().then((response) => {
      //  this.Package = response.products;
      // console.log(this.pkg);
      console.log(response);
      if (response.statusCode == "20000") {
          this.ShowPackage(response);      
       } else {
        this.alertConfirmService.openError("Not Found Products!<br>statusCode:" + response.statusCode + " statusDesc:" + response.statusDesc);
      }
      this.pageLoadingService.closeLoading();
    }).catch((err: any) => {/**/
      console.log('Error', err);
       this.pageLoadingService.closeLoading();
       this.alertConfirmService.openError("Error:" + err);
    });

  }
  // setChkboxCash(chkboxValue) {
  //   this.chkbox = chkboxValue;
  // }
  ShowPackage(response){
     let pack: package_model[] = [];
      let group: package_group[] = [];

       let product: any = [];
        product = response.products;
        let g = product.filter(grp => grp.type == "group")
        for (var i = 0; i < g.length; i++) {
          let group_type: any[] = [];
          group_type = g[i].attributes;

          let group_product: any[] = [];
          group_product = g[i].grouped_products;
          if (group_product.length > 0) {
            for (var j = 0; j < group_product.length; j++) {
              let group_tmp: package_group;
              group_tmp = {
                "id": group_product[j].product_id,
                "group": group_type[0].values,
                "group_type": group_type[1].values
              };
              group.push(group_tmp);

            }
          }
        }

        //  let count = response.products.length;
        let simply = product.filter(grp => grp.type == "simple")
        for (var i = 0; i < simply.length; i++) {
          let attributes: any = [];
          attributes = simply[i].attributes;
          //  for(var j = 0;j<attributes.length;j++){

          //  }
          let package_item: package_model = {
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
          package_item.id = simply[i].product_id;
          let tmp_att = attributes.filter(att => att.name == "DAY")
          package_item.day = tmp_att[0].values;

          tmp_att = attributes.filter(att => att.name == "DAY_UNIT_EN")
          let tmp = String(tmp_att[0].values).split("|");
         // tmp = tmp[0].split(":");
          package_item.day += " " + tmp;

          tmp_att = attributes.filter(att => att.name == "CHARACTER")
          package_item.character = tmp_att[0].values;

          tmp_att = attributes.filter(att => att.name == "INTERNET")
          package_item.speed = tmp_att[0].values;

          tmp_att = attributes.filter(att => att.name == "CALL_TEXT")
          package_item.credit = tmp_att[0].values;

          tmp_att = attributes.filter(att => att.name == "CALL_TEXT_UNIT_EN")
         // tmp = String(tmp_att[0].values).split(":");
         // package_item.call_text_unit = tmp[1];
          package_item.call_text_unit = tmp_att[0].values;

          let tmpJson: any = [];
          tmpJson = simply[i].description;
          package_item.des = tmpJson[1].EN;

          package_item.price = Number(simply[i].price);

          tmp_att = attributes.filter(att => att.name == "PRICE_UNIT_EN")
         // tmp = String(tmp_att[0].values).split(":");
         // package_item.price_unit = tmp[1];        
          package_item.price_unit = tmp_att[0].values;

          tmp_att = attributes.filter(att => att.name == "FLAG")
         // tmp = String(tmp_att[0].values).split(":");
        //  package_item.hot = tmp[1];
          package_item.hot = tmp_att[0].values;

          tmp_att = attributes.filter(att => att.name == "TOPUP")
          package_item.topup = tmp_att[0].values;

          tmp_att = group.filter(group => group.id == package_item.id);

          package_item.group = tmp_att[0].group;
          package_item.group_type = tmp_att[0].group_type;

          // package_item = {
          //   "id": response.products[i].product_id,
          //   "character": response.products[i].CHARACTER,
          //   "day": response.products[i].DAY + " " + response.products[i].DAY_UNIT.EN,
          //   "speed": response.products[i].INTERNET + " " + response.products[i].INTERNET_UNIT.EN,
          //   "call_text_unit": response.products[i].CALL_TEXT_UNIT.EN,
          //   "des": response.products[i].description,
          //   "credit": response.products[i].CALL_TEXT,
          //   "price": Number(response.products[i].price),
          //   "price_unit": response.products[i].PRICE_UNIT.EN,
          //   "hot": response.products[i].HOT,
          //   "count": 0,
          //   "group": response.products[i].GROUPT,
          //   "sim": []
          // };

          // this.packageSelect.globalPackageSelect.push(package_item);
          pack.push(package_item);
        }
        pack.sort((a, b) => a.character.localeCompare(b.character));
        this.packageSelect.globalPackageSelect = pack;
        //  this.packageSelect.globalPackageSelect.sort((a,b)=>a.character.localeCompare(b.character));
        this.Package = this.packageSelect.globalPackageSelect.filter(pkg => pkg.group == this.groupDefault && pkg.group_type == this.group_type_Default);
        this.packageSelect.globalPackageSelectCustomer = this.Package;
       // this.callCenterMsg = "Select your SIMs, please";
        this.packageSelect.globalCallCenterMsg = "Select your SIMs, please";
       // this.sendPackage();
        this.sendNext('');
         console.log("chahier Send1");    //for chang page customer welcome to  show pack
        setTimeout(() => {
          this.sendPackage();
           console.log("chahier Send2");   
        }, 1000);
     
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
        "sTransID":[]
      };
      findPackage.sim.push(sim);
      this.packageSelect.globalAmount += item_package.price;
      this.packageSelect.globalTotal++;
      // this.packageSelect.globalPackageSelect = this.Package;
      this.packageSelect.globalStatusSimDone = "scan";  //add package must new scan
    }
    this.showMessage();

  }
  onSelectPackage(pkg: any): void {

    if (pkg.opt == '+') {
      this.result(pkg.package);
    } else {
      this.deletePackage(pkg.package);
    }
  }
  deletePackage(item_package: package_model) {
    const findPackage = this.packageSelect.globalPackageSelect.find(pkg => pkg.id === item_package.id);
    if (findPackage) {
      findPackage.count = item_package.count;
      findPackage.sim.splice(-1);
      this.packageSelect.globalAmount -= item_package.price;
      this.packageSelect.globalTotal--;
      //this.packageSelect.globalPackageSelect = this.Package
    }
    this.showMessage();
  }
  showMessage() {
   this.packageSelect.globalCallCenterMsg = " SIM ";
    if (this.packageSelect.globalTotal > 1) this.packageSelect.globalCallCenterMsg = " SIMs ";
    if (this.packageSelect.globalTotal == 0) {
     this.packageSelect.globalCallCenterMsg = "Select your SIMs, please";
    } else {
     this.packageSelect.globalCallCenterMsg = this.packageSelect.globalTotal + this.packageSelect.globalCallCenterMsg;// +  this.packageSelect.globalAmount.toLocaleString() + " THB please.";
    }
    setTimeout(() => {
      this.sendPackage();
       console.log("chahier Send3");   
    },
      100);

  }
  //    removeSelectIndex(indexValue){
  //     this.packageSelect.globalTotal -= this.packageSelect.globalPackageSelect[indexValue].price;
  //     this.packageSelect.globalPackageSelect.splice(indexValue,1);

  //   //  this.packageSelect.forEach((Element,index) =>{
  //   //      if(index == indexValue){
  //   //        this.packageSelect.splice(index,1);
  //   //      }

  //   //   });
  //  }
setTabScript(tab) {
    this.packageSelect.globalTab = tab;    
    switch (tab) {
      case 1:       
        this.sScript = 'Product "Hot Price" Package<br> เน้นขายกลุ่มนักท่องเที่ยวที่เน้น Internet';
        this.groupDefault ="HOT_PRICE";
        break;
      case 2:       
        this.sScript = 'Product "BEST_SELLER" Package<br> เน้นขายกลุ่มนักท่องเที่ยวที่เน้น Internet';
         this.groupDefault ="BEST_SELLER";
        break;
      case 3:       
        this.sScript = 'Product "30 วัน" Package<br> เน้นขายกลุ่มนักท่องเที่ยวที่เน้น Internet';
         this.groupDefault ="30DAYS";
        break;
      case 4:       
        this.sScript = 'Product "เน้นโทร" Package<br> เน้นขายกลุ่มนักท่องเที่ยวที่เน้น Internet';
         this.groupDefault ="CALL_TEXT";
        break;
      case 5:      
        this.sScript = 'Product "Internet" Package<br> เน้นขายกลุ่มนักท่องเที่ยวที่เน้น Internet';
         this.groupDefault ="INTERNET";
        break;
      case 6:      
        this.sScript = 'Product "7 วัน" Package<br> เน้นขายกลุ่มนักท่องเที่ยวที่เน้น Internet';
         this.groupDefault ="7DAYS";
        break;
    } 

  }

  setTab(tab) {
    this.setTabScript(tab);
    this.packageSelect.globalTab = tab;
    this.pageLoadingService.openLoading();
    switch (tab) {
      case 1:
        this.Package = this.packageSelect.globalPackageSelect.filter(pkg => pkg.group == "HOT_PRICE");
       // this.sScript = 'Product "Hot Price" Package<br> เน้นขายกลุ่มนักท่องเที่ยวที่เน้น Internet';
        break;
      case 2:
        this.Package = this.packageSelect.globalPackageSelect.filter(pkg => pkg.group == "BEST_SELLER");
       // this.sScript = 'Product "BEST_SELLER" Package<br> เน้นขายกลุ่มนักท่องเที่ยวที่เน้น Internet';
        break;
      case 3:
        this.Package = this.packageSelect.globalPackageSelect.filter(pkg => pkg.group == "30DAYS");
       // this.sScript = 'Product "30 วัน" Package<br> เน้นขายกลุ่มนักท่องเที่ยวที่เน้น Internet';
        break;
      case 4:
        this.Package = this.packageSelect.globalPackageSelect.filter(pkg => pkg.group == "CALL_TEXT");
       // this.sScript = 'Product "เน้นโทร" Package<br> เน้นขายกลุ่มนักท่องเที่ยวที่เน้น Internet';
        break;
      case 5:
        this.Package = this.packageSelect.globalPackageSelect.filter(pkg => pkg.group == "INTERNET");
      //  this.sScript = 'Product "Internet" Package<br> เน้นขายกลุ่มนักท่องเที่ยวที่เน้น Internet';
        break;
      case 6:
        this.Package = this.packageSelect.globalPackageSelect.filter(pkg => pkg.group == "7DAYS");
       // this.sScript = 'Product "7 วัน" Package<br> เน้นขายกลุ่มนักท่องเที่ยวที่เน้น Internet';
        break;
    }
    this.packageSelect.globalPackageSelectCustomer = this.Package;
    this.sendPackage();
     console.log("chahier Send4");   
    this.pageLoadingService.closeLoading();

  }

  // onCancel() {
  //   let customBtn: object[] = [
  //     {
  //       name: "Cancel",
  //       class: "simplert__close",
  //       function: this.onBackFromAlert.bind(this)
  //     }

  //   ];
  //   this.alertConfirmService.openConfirm("Would you like to cancel the current order?", customBtn);

  // }
  // onBackFromAlert() {
  //   alert('test');
  //   this.alertConfirmService.closPopup();
  // }
  sendSubscribe(command, data) {

    const str = {
      command: command,
      data: data
    };
    const myObjStr = JSON.stringify(str);
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
    
    const str = {
      command: 'open',
      data: this.Package,
      msg: this.packageSelect.globalCallCenterMsg,
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
  sendNext(url) {
    const str = {
      command: 'next',
      data: url
    };
    const myObjStr = JSON.stringify(str);
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
  ngOnDestroy() {
    // this.ws.close(); 
  }
  onScanID() {
    this.sendNext('/customer/customer-show-passport');
    this.router.navigate(['./passport'], { relativeTo: this.route });

    // this.router.navigate(['./process-sim'], { relativeTo: this.route });

  }
}

// interface PackageSim {
//   	product_id:number;
// 		name:string;
//     CHARACTER:string;
//     DAY: {
//            EN:string;
//            TH:string;
//                     },
//              "INTERNET":"2.5",
//              "INTERNET_UNIT": {
//                      "EN":"GB",
//                      "TH":"กิกะไบต์"
//                     },
//              "CALL&TEXT":"250",
//              "CALL&TEXT_UNIT": {
//                      "EN":"Bath Credit",
//                      "TH":"บาท Credit"
//                     },
//             "price": "299",
//             "PRICE_UNIT": {
//                      "EN":"THB",
//                      "TH":"บาท"
//                     },
//             "HOT":"Y",
//             "description":"SIM 49 THB/Topup 250 THB",
//             "GROUPT":"BEST_Seller"
//   id: string;
//   day: string;
//   speed: string;
//   credit: string;
//   spec:string;
//   des: string;
//   price: number;
//   color:string;
//   count:number;
//   sim: [
//         {
//           simNumber: string;
//           mobileNumber: string;
//           balance: string;
//           step: number;
//         }
//        ]
// }
  // this.Package = [
        //   {
        //     "id": "A",
        //     "day": "7 Days",
        //     "speed": "2.5GB",
        //     "spec": "Internet",
        //     "des": "SIM 49 THB / Topup 250 THB",
        //     "credit": "250",
        //     "price": 1100,
        //     "color": "#5F9EA0",
        //     "hot": true,
        //     "count": 0,
        //     "sim": []
        //   }
        //   , {
        //     "id": "B",
        //     "day": "8 Days",
        //     "speed": "2.5GB",
        //     "spec": "Internet",
        //     "des": "SIM 49 THB / Topup 250 THB",
        //     "credit": "250",
        //     "price": 599,
        //     "color": "#5F9EA0",
        //     "hot": false,
        //     "count": 0,
        //     "sim": []
        //   }
        //   , {
        //     "id": "C",
        //     "day": "9 Days",
        //     "speed": "4GB",
        //     "spec": "Internet",
        //     "des": "SIM 49 THB / Topup 250 THB",
        //     "credit": "250",
        //     "price": 100,
        //     "color": "#5F9EA0",
        //     "hot": false,
        //     "count": 0,
        //     "sim": []
        //   }
        //   ,
        //   {
        //     "id": "D",
        //     "day": "10 Days",
        //     "speed": "9GB",
        //     "spec": "Internet",
        //     "des": "SIM 49 THB / Topup 250 THB",
        //     "credit": "250",
        //     "price": 100,
        //     "color": "#5F9EA0",
        //     "hot": false,
        //     "count": 0,
        //     "sim": []
        //   },
        //   {
        //     "id": "E",
        //     "day": "20 Days",
        //     "speed": "6GB",
        //     "spec": "Internet",
        //     "des": "SIM 49 THB / Topup 250 THB",
        //     "credit": "250",
        //     "price": 100,
        //     "color": "#5F9EA0",
        //     "hot": false,
        //     "count": 0,
        //     "sim": []
        //   }

        // ]





//         {
// 	"products":[
// 		{
// 			"product_id":1,
// 			"name":"1",
//             "CHARACTER":"A",
//             "DAY": {
//                 "EN":"Days",
//                 "TH":"วัน"
//                     },
//              "INTERNET":"2.5",
//              "INTERNET_UNIT": {
//                      "EN":"GB",
//                      "TH":"กิกะไบต์"
//                     },
//              "CALL&TEXT":"250",
//              "CALL&TEXT_UNIT": {
//                      "EN":"Bath Credit",
//                      "TH":"บาท Credit"
//                     },
//             "price": "299",
//             "PRICE_UNIT": {
//                      "EN":"THB",
//                      "TH":"บาท"
//                     },
//             "HOT":"Y",
//             "description":"SIM 49 THB/Topup 250 THB",
//             "GROUPT":"BEST_Seller"
// 		},
// 	    {
// 			"product_id":2,
// 			"name":"2",
//             "CHARACTER":"B",
//             "DAY": {
//                 "EN":"Days",
//                 "TH":"วัน"
//                     },
//              "INTERNET":"2.6",
//              "INTERNET_UNIT": {
//                      "EN":"GB",
//                      "TH":"กิกะไบต์"
//                     },
//              "CALL&TEXT":"260",
//              "CALL&TEXT_UNIT": {
//                      "EN":"Bath Credit",
//                      "TH":"บาท Credit"
//                     },
//             "price": "300",
//             "PRICE_UNIT": {
//                      "EN":"THB",
//                      "TH":"บาท"
//                     },
//             "HOT":"N",
//             "description":"SIM 49 THB/Topup 250 THB",
//             "GROUPT":"BEST_Seller"
// 		}
// 	]
// }