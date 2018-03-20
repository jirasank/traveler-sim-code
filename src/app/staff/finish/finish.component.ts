import { Component, OnInit } from '@angular/core';
import { GlobaldataService } from '../service/globaldata.service';
import { PrintService } from '../service/print.service';
import { package_model } from '../shared/model/package.model';
import { ActivatedRoute, Router } from "@angular/router";
import { ServiceApiService } from '../service/api/service-api.service';
import { Sim_item, ITranSTs, IRCP } from '../shared/model/sim.model';
import { GlobalmasterService } from '../service/globalmaster.service';
import { JwtHelper } from 'angular2-jwt';
import { CookieService } from 'angular2-cookie/core';
import { AlertConfirmService } from '../shared/alert-confirm/alert-confirm.service';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {
  Package: package_model[];
  PackageHide: package_model;

  // callCenterMsg: string = "Please wait for a while"
  // Package: any; 
  //chkbox: boolean = true;
 
  errorTDMPDF = "";
  txtSim: string = "SIM";
  index: number = 0;
  indexSim: number = 0;
  countItem: number;
  countSim: number;
  jwtHelper: JwtHelper = new JwtHelper();   
  userToken : any;
  sUserID: string;
  sLocationCode: string;
 
  constructor(public packageSelect: GlobaldataService
    , private router: Router
    , private route: ActivatedRoute
    , private serviceApiService: ServiceApiService
    , private printService: PrintService
    , public globalmasterService: GlobalmasterService
    , private cookieService: CookieService
    , private alertConfirmService: AlertConfirmService
  ) { }

  ngOnInit() {
    this.userToken = this.jwtHelper.decodeToken(this.cookieService.get("accessToken"));
     // this.sUserID = this.userToken.username; 
    // this.sLocationCode = this.userToken.locationCode; 
     this.sUserID = "POS_TEST";    
     this.sLocationCode = "1004";

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

    if (this.packageSelect.globalTotal > 1) this.txtSim = "SIMs";

    this.packageSelect.globalCallCenterMsg = this.packageSelect.globalTotal + ' ' + this.txtSim + ' are done Thank you.'

    this.Package = this.packageSelect.globalPackageSelect.filter(pkg => pkg.count > 0);
    var str = {
      command: 'open',
      data: this.Package,
      msg: this.packageSelect.globalCallCenterMsg,
      amount: this.packageSelect.globalAmount
    };
    this.sendToSlave(str);
    //       this.Package =[
    //        {       
    //           "id": "123",
    //             "character":"A",
    //             "day": "7 Days",
    //             "speed": "2.5 GB",
    //             "call_text_unit": "Baht Credit",
    //             "des": "SIM 49 THB / Topup 250 THB",
    //             "credit": "250",
    //             "price": 100,   
    //             "price_unit": "THB",
    //             "hot": "N",
    //             "count": 3,
    //             "group": "BEST_SELLER",
    //             "topup":"",
    //             "sim": [
    //               {        
    //                 "simNo": "1",
    //                 "simNumber": "1234567890123",
    //                 "mobileNumber": "0878303388",
    //                 "balance": "",
    //                 "step": 0,
    //                 "error": false,
    //                 "errorDetail": "",
    //                 "statusError": ""
    //               },
    //               {        
    //                 "simNo": "2",
    //                 "simNumber": "1234567890123",
    //                 "mobileNumber": "0878303387",
    //                 "balance": "",
    //                 "step": 0,
    //                 "error": false,
    //                 "errorDetail": "",
    //                 "statusError": ""
    //               },
    //               {        
    //                 "simNo": "3",
    //                 "simNumber": "1234567890123",
    //                 "mobileNumber": "0878303386",
    //                 "balance": "",
    //                 "step": 0,
    //                 "error": false,
    //                 "errorDetail": "",
    //                 "statusError": ""
    //               }
    //             ]          
    //        }
    //       ,
    //         {
    //           "id": "456",
    //             "character":"B",
    //             "day": "7 Days",
    //             "speed": "2.5 GB",
    //             "call_text_unit": "Baht Credit",
    //             "des": "SIM 49 THB / Topup 250 THB",
    //             "credit": "250",
    //             "price": 100,   
    //             "price_unit": "THB",
    //             "hot": "N",
    //             "count": 1,
    //             "group": "BEST_SELLER",   
    //             "topup":"",      
    //             "sim": [
    //                  {
    //                    "simNo": "4",
    //                   "simNumber": "1234567890123",
    //                   "mobileNumber": "0878303385",
    //                   "balance": "",
    //                   "step": 0,
    //                   "error": false,
    //                   "errorDetail": "",
    //                   "statusError": ""
    //                  }
    //                ]
    //        }
    //         ,
    //         {
    //           "id": "456",
    //             "character":"C",
    //             "day": "7 Days",
    //             "speed": "2.5 GB",
    //             "call_text_unit": "Baht Credit",
    //             "des": "SIM 49 THB / Topup 250 THB",
    //             "credit": "250",
    //             "price": 100,   
    //             "price_unit": "THB",
    //             "hot": "N",
    //             "count": 1,
    //             "group": "BEST_SELLER",   
    //             "topup":"",      
    //             "sim": [
    //                  {
    //                    "simNo": "4",
    //                   "simNumber": "1234567890123",
    //                   "mobileNumber": "0878303384",
    //                   "balance": "",
    //                   "step": 0,
    //                   "error": false,
    //                   "errorDetail": "",
    //                   "statusError": ""
    //                  }
    //                ]
    //        }
    //      ] ;
    //     // this.Package =[
    //     //    {
    //     //      "id": "A",
    //     //     "day": "7 Days",
    //     //     "speed": "2.5GB",
    //     //     "spec": "Internet",
    //     //     "des": "SIM 49 THB / Topup 250 THB",
    //     //     "credit": "250",
    //     //     "price": 100,
    //     //     "color":"#5F9EA0" ,
    //     //     "hot": false,
    //     //     "count": 0,
    //     //     "sim": [
    //     //              {
    //     //                 "simNumber": "9032-5",
    //     //                 "mobileNumber": "0878303366",
    //     //                 "balance": "",
    //     //                 "step": 0,                   
    //     //                 "error": false,
    //     //                 "errorDetail": "",
    //     //                 "statusError": ""
    //     //              },
    //     //               {
    //     //                 "simNumber": "9032-6",
    //     //                 "mobileNumber": "0982857700",
    //     //                 "balance": "",
    //     //                 "step": 0,                   
    //     //                 "error": false,
    //     //                 "errorDetail": "",
    //     //                 "statusError": ""
    //     //              }
    //     //            ]
    //     //    }
    //       //  ,{
    //       //     "id": "B",
    //       //   "day": "11 Days",
    //       //   "speed": "2.5GB",
    //       //   "spec": "Internet",
    //       //   "des": "SIM 49 THB / Topup 250 THB",
    //       //   "credit": "250",
    //       //   "price": 100,
    //       //   "color":"#5F9EA0" ,
    //       //   "hot": false,
    //       //   "count": 0,
    //       //   "sim": [
    //       //            {
    //       //               "simNumber": "9032-7",
    //       //               "mobileNumber": "0871045689",
    //       //               "balance": "",
    //       //               "step": 0,                   
    //       //               "error": false,
    //       //               "errorDetail": "",
    //       //               "statusError": ""
    //       //            }
    //       //          ]
    //       //  }
    //   //   ] ;

   // this.saveReceiptPlugin();
   // this.saveReceiptTDM();
  }

  saveReceiptTDM() {
    var grandTot: number = this.packageSelect.globalAmount;
    var sCardNo: string;
    var sshiftId: string = '5002900120180110';
    var sshiftNum: string = "1";
    var sterminalId: string = "900";
    var prod: any = [];

    for (var i = 0; i < this.Package.length; i++) {
      for (var j = 0; j < this.Package[i].sim.length; j++) {
        prod.push({
          productType: "SIM",
          company: "WDS",
          // brand: "",
          // model: "",
          // color: "",
          matcode: "EC0SIMOTCHFMC2FLY",//???
          imei: this.Package[i].sim[j].simNumber,//"000001431882103001",
          // imei: "000001431882103001",
          freeGoodsFlg: "N",
          qty: "1",
          // tradeNo: "",
          // tradeName: "",
          // cashBackFlag: "",
          // ussdCode: "",
          // returnCode: "",
          // projectType: "",
          // projectCode: "",
          // focCode: "",
          // incAmt: Number(t.sTotalAmt),//"49.00",
          // totalAmt: Number(t.sTotalAmt),//"49.00",
          incAmt: this.Package[i].price,//"49.00",
          totalAmt: this.Package[i].price,//"49.00",
          discount: "0.00",
          // voucherCampaignId: "",
          // voucherCode: "",
          // voucherAmt: "",
          // mobileNoSim: ""
        });

      }
    }

    var d = new Date();
    var datestring = ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" +
      d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getMilliseconds()).slice(-2);

    var sNarrowD = d.getFullYear() + ("0" + (d.getMonth() + 1)).slice(-2) +
      ("0" + d.getDate()).slice(-2) + ("0" + d.getHours()).slice(-2)
      + ("0" + d.getMinutes()).slice(-2);
    var sOrder = 'PA' + sNarrowD + String(Math.ceil(Math.random() * 10000));

    let obj = {
      orderDate: datestring, //"28/11/2017 09:00:00",
     // locationCode: this.userToken.locationCode,
      locationCode: this.sLocationCode,//"5002",
      documentType: "RECEIPT",
      // customerTitle: "",
      // customerName: "",
      // cusMobileNo: "",
      // receiptAddr: {
      // addrNo: "",
      // moo: "",
      // mooban: "",
      // buildingName: "",
      // floor: " ",
      // room: "",
      // soi: "",
      // streetName: "",
      // tumbon: "",
      // amphur: "",
      // province: "",
      // postCode: "",
      // country: ""
      // },
      // shiptoAddr: "",
      // shippingCostAmt: "",
      orderNo: sOrder,//"PA00000000000002", PA yymmddhhmm<rand4>
      // mobileNo: "",
      // pickupLocation: "",
      customerType: "N",
      // taxBranchNo: "",
      // passportNo: "",
      citizenId: sCardNo,//"3160101189501",
      // taxNo: "",
      // preBookingNo: "",
      channelTransection: "POSAIRPORT",
      // cusNonMobileNo: "",
      // contactEmail: "",
      // verifiedId: "",
      grandTotalAmt: String(grandTot), //"98.00",
      userId: this.sUserID,//sunees49//"suraporb",
      // remark: "",
      shiftId: sshiftId,//"5002999120171227",//??
      shiftNum: sshiftNum,
      terminalId: sterminalId,

      products: prod,
      receiptMethods: [{
        paymentMethod: "CA",
        // cardType: "",
        // bankCode: "",
        // bankBranchCode: "",
        // creditCardNo: "",
        // cardExpireDate: "",
        // installmentTerm: "",
        // installmentRate: "",
        paidAmt: String(grandTot) //"98.00"
      }]
    };
    console.log(JSON.stringify(obj));
    this.serviceApiService.createReceiptTDM(obj).then((response) => {
      console.log('Response createReceiptTDN:', response);

      if (response.resultCode === '20000') { //success
        //  let  rcp : IRCP[] = [];
        let output: any = [];
        output = response.receipts;
        let sReceiptId = output[0].receiptId;
        let sReceiptNo = output[0].receiptNo;

        let obj = {
        "type": "Receipt",
        "printerType": "Thermal",
        "documentID": sReceiptId,
        "printType": "ORIGINAL",       
        "userName": this.sUserID,//"Anirs571",
        "userLocationCd": this.sLocationCode//"5002"
       }
         this.serviceApiService.createDocPDF(obj).then((response) => {
              console.log('Response createDocPDF:', response);

                  if (response.resultFlg === 'Y') { //success
                      let obj = {
                        "filePath": response.filePath,
                        "fileName": response.fileName
                      }    
                    localStorage.setItem('receiptTDMPDF', JSON.stringify(obj));
                    let path = localStorage.getItem('receiptTDMPDF');
                    console.log('localStoragePDF', localStorage.getItem('receiptTDMPDF'));
                    console.log('create receipt PDF completed');
                  } else {
                    this.errorTDMPDF = "Create TDM PDF fail: "+ response.message;
                    console.log('create receipt PDF not pass',response);
                  // rcp.sMessage = response.resultCode + ' create receipt PDF not pass' + response.resultDescription;
                  
                  }
            }).catch((err) => {
              console.log('Exception create receipt PDF ', err);
            
             });

      } else {
        this.errorTDMPDF = "Create receiptTDM fail: "+ response.resultMessage;
        console.log('Error create receiptTDM: ' + response);
       // localStorage.setItem('receiptTDM', 'Error Order:' + sOrder + ' ' + response.resultMessage);
      }
    }).catch((err) => {
       this.errorTDMPDF = 'Exception create receipt';
     // localStorage.setItem('receiptTDM', 'Error Exception Order:' + sOrder + ' ' + err);
      console.log('Exception create receipt', err);
      // rcp.sMessage = '88888 Exception create receipt '+err; 
      // rcp.sStatus = "Error";

    });
  }

  saveReceiptPlugin() {
    let iTranSTs: ITranSTs = [];
    for (var i = 0; i < this.Package.length; i++) {
      for (var j = 0; j < this.Package[i].sim.length; j++) {
        for (var k = 0; k < this.Package[i].sim[j].sTransID.length; k++) {
          if (this.Package[i].sim[j].sTransID[k].sTopupOrAddPack == 'topup') {
            iTranSTs.push({
              ID: this.Package[i].sim[j].sTransID[k].ID,
              status: this.Package[i].sim[j].sTransID[k].status,
              trndate: this.Package[i].sim[j].sTransID[k].trndate,
              remark: this.Package[i].sim[j].sTransID[k].remark,
              sStatusPP: this.Package[i].sim[j].sTransID[k].sStatusPP,
              sStatusFA: this.Package[i].sim[j].sTransID[k].sStatusFA,
              sStatusRC: this.Package[i].sim[j].sTransID[k].sStatusRC,
              sStatusAF: this.Package[i].sim[j].sTransID[k].sStatusAF,
              sStatusALL: this.Package[i].sim[j].sTransID[k].sStatusALL,
              sTopupOrAddPack: this.Package[i].sim[j].sTransID[k].sTopupOrAddPack,
            });
          }
        }
      }
    }
    localStorage.setItem('receiptPlugin', JSON.stringify(iTranSTs));
    console.log('localStorage', JSON.parse(localStorage.getItem('receiptPlugin')));

  }

  //  setChkboxCash(chkboxValue){
  //    this.chkbox = chkboxValue;
  //   }  
  // recursivePrint(receiptPlugin, subindex: number, cb: any) { // array
  //   if (!receiptPlugin[subindex]) { // exit
  //     return cb();
  //   }

  //   // --- loop print $$$$$$$$$$$$$$$$$$$$
  //   let info = {
  //     "PP_SERVICE_OPTION": "R",
  //     "PP_RECEIPT_LOCATION": "1004",
  //     // PP_LOCATION_CODE: this.sLocationCode,
  //     "PP_RECEIPT_TYPE": "W-CO",
  //     //"PP_RECEIPT_DATE": "2017-10-17", 
  //     "PP_RECEIPT_DATE": receiptPlugin[subindex].trndate,
  //     //"PP_RECEIPT_NO": "473", 
  //     "PP_RECEIPT_NO": receiptPlugin[subindex].ID,
  //     "PP_USER_ID": "PATJP529"
  //     // PP_USER_ID: this.sUserID,
  //   }
  //   this.serviceApiService.getPPReceiptPlugin(info).then((response) => {
  //     if (response.resultCode === '20000') { // register complete
  //       console.log('20000 get receipt transaction:' + receiptPlugin[subindex].ID + ' complete.', response);

  //       // save print
  //       // $$$$$$$$$$$$$$$





  //     } else {
  //       console.log('99999 get receipt transcation:' + receiptPlugin[subindex].ID + ' error.', response);
  //     }

  //     this.recursivePrint(receiptPlugin, ++subindex, cb);
  //   }).catch((err) => {
  //     console.log('8888 Exception get receipt transaction:' + receiptPlugin[subindex].ID + ' message =>, ' + JSON.parse(err._body).developerMessage);
  //     return cb(err);
  //   });
  // }
  onPrint() {

    this.printService.printPlguin(this.sUserID,this.sLocationCode);
    if(this.errorTDMPDF == ""){
       this.printService.printTDM();
    } else {
       this.alertConfirmService.openError("Error:<br>" + this.errorTDMPDF);
    }

  }
  clearData() {
    this.packageSelect.clarData();
    var str = {
      command: 'next',
      data: '/customer',
      statusDone: 'done'
    };
    this.sendToSlave(str);
    setTimeout(() => {
      this.router.navigate(['/staff'], { relativeTo: this.route });
    }, 100);


  }
  sendToSlave(str) {

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
