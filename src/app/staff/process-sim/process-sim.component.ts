import { Component, OnInit } from '@angular/core';
import { package_model } from '../shared/model/package.model';
import { GlobaldataService } from '../service/globaldata.service';
import { Sim_item, ISIMs, ITranST, ITranSTs, IRCP } from '../shared/model/sim.model';
import { ActivatedRoute, Router } from "@angular/router";
import { JwtHelper } from 'angular2-jwt';
import { CookieService } from 'angular2-cookie/core';
import { ServiceApiService } from '../service/api/service-api.service';
import { GlobalmasterService } from '../service/globalmaster.service';
import { PageLoadingService } from '../shared/page-loading/page-loading.service';

@Component({
    selector: 'app-process-sim',
    templateUrl: './process-sim.component.html',
    styleUrls: ['./process-sim.component.scss']
})
export class ProcessSimComponent implements OnInit {
    // Package: any; 
    Package: package_model[] = [];
    PackageHide: package_model;
    //arr_names = new Array(2);
    statusDone: string = "processing";
    simProgress: Sim_item[];
    interval: any;
    intervalOne: any;
    index: number = 0;
    indexSim: number = 0;
    countItem: number;
    countSim: number;
    //typeButtonError: string = "error";
    //callCenterMsg:string ="Please wait for a while";
    //chkbox: boolean = true;
    sScript: string = "ในขั้นตอนขณะกำลังดำเนินการ Provision SIM ควรเตรียมเปิดเครื่องมือถือ<br>ของลค. และจัดเก็บซิมเดิมที่มีไว้ในพื้นที่ที่ปลอดภัยต่อไฟฟ้าสถิตย์";
    txtSim: string = "SIM";

    jwtHelper: JwtHelper = new JwtHelper();
    userToken: any;
    sUserID: string;
    sLocationCode: string;
    processAll: boolean = true;
  
    constructor(
        public packageSelect: GlobaldataService
        , private router: Router
        , private route: ActivatedRoute
        , private cookieService: CookieService
        , private serviceApiService: ServiceApiService
        , public globalmasterService: GlobalmasterService
        , private pageLoadingService: PageLoadingService
   ) { }

    ngOnInit() {
        
        this.userToken = this.jwtHelper.decodeToken(this.cookieService.get("accessToken"));
    
        // this.sUserID = this.userToken.username; 
        // this.sLocationCode = this.userToken.locationCode; 
        this.sUserID = "POS_TEST";
        this.sLocationCode = "1004";

        this.packageSelect.globalCallCenterMsg = "Please wait for a while";
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
        //  this.Package =[
        //    {       
        //       "id": "123",
        //         "character":"A",
        //         "day": "7 Days",
        //         "speed": "2.5 GB",
        //         "call_text_unit": "Baht Credit",
        //         "des": "SIM 49 THB / Topup 250 THB",
        //         "credit": "250",
        //         "price": 100,   
        //         "price_unit": "THB",
        //         "hot": "N",
        //         "count": 3,
        //         "group": "BEST_SELLER",
        //         "sim": [
        //           {        
        //             "simNo": "1",
        //             "simNumber": "1234567890123",
        //             "mobileNumber": "",
        //             "balance": "",
        //             "step": 0,
        //             "error": false,
        //             "errorDetail": "",
        //             "statusError": ""
        //           },
        //           {        
        //             "simNo": "2",
        //             "simNumber": "1234567890123",
        //             "mobileNumber": "",
        //             "balance": "",
        //             "step": 0,
        //             "error": false,
        //             "errorDetail": "",
        //             "statusError": ""
        //           },
        //           {        
        //             "simNo": "3",
        //             "simNumber": "1234567890123",
        //             "mobileNumber": "",
        //             "balance": "",
        //             "step": 0,
        //             "error": false,
        //             "errorDetail": "",
        //             "statusError": ""
        //           }
        //         ]          
        //    }
        //   ,
        //     {
        //       "id": "456",
        //         "character":"B",
        //         "day": "7 Days",
        //         "speed": "2.5 GB",
        //         "call_text_unit": "Baht Credit",
        //         "des": "SIM 49 THB / Topup 250 THB",
        //         "credit": "250",
        //         "price": 100,   
        //         "price_unit": "THB",
        //         "hot": "N",
        //         "count": 1,
        //         "group": "BEST_SELLER",         
        //         "sim": [
        //              {
        //                "simNo": "4",
        //               "simNumber": "1234567890123",
        //               "mobileNumber": "",
        //               "balance": "",
        //               "step": 0,
        //               "error": false,
        //               "errorDetail": "",
        //               "statusError": ""
        //              }
        //            ]
        //    }
        //     ,
        //     {
        //       "id": "456",
        //         "character":"C",
        //         "day": "7 Days",
        //         "speed": "2.5 GB",
        //         "call_text_unit": "Baht Credit",
        //         "des": "SIM 49 THB / Topup 250 THB",
        //         "credit": "250",
        //         "price": 100,   
        //         "price_unit": "THB",
        //         "hot": "N",
        //         "count": 1,
        //         "group": "BEST_SELLER",         
        //         "sim": [
        //              {
        //                "simNo": "4",
        //               "simNumber": "1234567890123",
        //               "mobileNumber": "",
        //               "balance": "",
        //               "step": 0,
        //               "error": false,
        //               "errorDetail": "",
        //               "statusError": ""
        //              }
        //            ]
        //    }
        //  ] ;

        this.sendToSlave();
        if (this.packageSelect.globalTotal > 1) this.txtSim = "SIMs";
        this.Package = this.packageSelect.globalPackageSelect.filter(pkg => pkg.count > 0);
        this.packageSelect.globalCallCenterMsg = this.packageSelect.globalTotal + ' ' + this.txtSim + ' are ' + this.statusDone;
        this.sendSlavePackage("processing");

        // this.userToken = this.jwtHelper.decodeToken(this._cookieService.get("accessToken"));
        //  this.sUserID = userToken.username; // from getPPSimSt2
        // this.sLocationCode = userToken.locationCode; // from getPPSimSt2   

        this.countItem = this.Package.length;
        //  this.countSim = this.Package[this.index].sim.length;
        //   this.interval = setInterval(() => {
        //     // if(this.index >= this.countItem) {
        //     //      clearInterval(this.interval);  
        //     //      this.statusDone = this.checkDoneProcess(); 
        //     //   } else {
        //     //      this.onProcess();
        //     //   }
        //     this.onProcess();
        //  }, 1000);

        this.pageLoadingService.openLoading();
        this.recursiveScan((err) => {
            if (err) {
                this.pageLoadingService.closeLoading();
                console.log('------------------------------------');
                console.log('  Found some SIMs has error exception ', err);
                console.log('------------------------------------');
            } else {
                this.statusDone = this.checkDoneProcess();
                this.packageSelect.globalCallCenterMsg = this.packageSelect.globalTotal + ' ' + this.txtSim + ' are ' + this.statusDone;
                this.sendSlavePackage('done');
                this.pageLoadingService.closeLoading();
            }
        });

    }
  
    recursiveScan(cb: any) { // array
        this.countSim = this.Package[this.index].sim.length;
        if (this.indexSim >= this.countSim) {
            this.index++;
            this.indexSim = 0;    
        }
       
        if (!this.Package[this.index]) { // exit
                return cb();
         }
      
        let topup = this.Package[this.index].topup;

        let sim: Sim_item;
        sim = {
            "simNo": this.Package[this.index].sim[this.indexSim].simNo,
            "simNumber": this.Package[this.index].sim[this.indexSim].simNumber,
            "mobileNumber": this.Package[this.index].sim[this.indexSim].mobileNumber,
            "imsiNumber": this.Package[this.index].sim[this.indexSim].imsiNumber,
            "simType": this.Package[this.index].sim[this.indexSim].simType,
            "balance": "",
            "step": 0,
            "error": false,
            "errorDetail": "",
            "statusError": "error",
            "stepRetry": "",
            "sTransID": []
        };
        sim.step = 1;

        this.Package[this.index].sim[this.indexSim] = sim;
        this.Package[this.index].sim[this.indexSim].stepRetry = "pi";
        console.log('---Step---', 'Pi Sim:' + this.indexSim);
        this.serviceApiService.postPrepaidIdentifier(sim, this.sUserID,this.sLocationCode).then((response) => {
            console.log('Response PrepaidIdentifier:', response);
            this.sendSlavePackage("processing");

            if (response.resultCode === '20000') { //success                         

                console.log('20000 PrepaidIdentifier [' + sim.simNumber + '] => pass, ', sim || {});

                // this.Package[this.index].sim[this.indexSim] = sim;   
                setTimeout(() => {

                    this.addSIMValue(sim, topup).then((response) => {
                        if (response.resultCode === '20000') { //success

                            console.log('20000 add package [' + sim.simNumber + '] => pass');
                            this.indexSim++;
                            this.recursiveScan(cb); // nexst sim after then                             
                        } else {
                            console.log('88888 add package [' + sim.simNumber + '] => not pass ************');
                            this.indexSim++;
                            this.recursiveScan(cb); // nexst sim after then                              
                        }
                    });

                }, 100);

            } else {
                console.log('Error PI [' + sim.simNumber + '] => not pass ' + response.developerMessage);
                sim.errorDetail = 'Error PI :' + response.developerMessage;
                sim.error = true;
                this.indexSim++;
                this.recursiveScan(cb); // nexst sim after then                 
            }
        })
            .catch((err) => {
                console.log('catch PI [' + sim.simNumber + ']  => ',JSON.parse(err._body));
                let delvelopMSG = JSON.parse(err._body);
                sim.errorDetail = 'Exeption PI [' + sim.simNumber + ']  => ' + delvelopMSG.developerMessage;
                sim.error = true;
                this.indexSim++;
                this.recursiveScan(cb); // nexst sim after then   
              
            });
    }
    addSIMValue(sim, topup): Promise<any> {
        var params1 = this.serviceApiService.fndTopUp(topup);
        var params2 = this.serviceApiService.fndFeature(topup);
        // console.log('param1 ', params1);
        // console.log('param2 ', params2); 

        return new Promise((resolve, reject) => {
            // try {
            this.doTOPUP(sim, params1, 0, (err) => {
                if (err) {
                    console.log('do topup error,', err);
                    resolve({ resultCode: '88888', data: "do topup error" });
                } else {
                    console.log('topup add complete');
                    // try {
                    setTimeout(() => {
                        this.doPackage(sim, params2, 0, (err) => {
                            if (err) {
                                console.log('do package error,', err);
                                resolve({ resultCode: '88888', data: 'do package error' });
                            } else {
                                console.log('package add Complete', sim);
                                setTimeout(() => {
                                    this.doCheckBalance(sim, 0, (err) => {
                                        if (err) {
                                            console.log('doQuerybalance Fail ...3,', err);
                                            resolve({ resultCode: '88888', data: 'do doQuerybalance error' });
                                        } else {
                                            console.log('doQuerybalance Complete ...3');
                                            resolve({ resultCode: '20000', data: 'do doQuerybalance pass' });
                                        }
                                    });
                                }, 100);

                            }
                        });

                    }, 100);


                }
            });
            // }  catch (e) { console.log(e); }   
        });
    }
    doCheckBalance(sim, index: number, cb: any) { //sim  no have index 
        if (!(index === 0)) { // exit
            return cb();
        }
        sim.step = 4;
        this.Package[this.index].sim[this.indexSim].stepRetry = "check_balance:"; //**************************************
        console.log('---Step---', 'check_balance:' + sim.mobileNumber);
        this.serviceApiService.queryBalance(sim.mobileNumber).then((response) => {
            this.sendSlavePackage("processing");
            console.log('Response queryBalance:', sim, response);

            if (response.resultCode === '20000') { //success
                sim.balance = response.balanceSummary.remainingBalance + ".00 THB";;
                //  sim.balance = "0.00 THB"                  
                this.Package[this.index].sim[this.indexSim] = sim;
                if (response.balanceSummary.remainingBalance == 0) {
                    sim.errorDetail = 'query balance completed. Remaining bal.:' + response.balanceSummary.remainingBalance;
                    //sim.sStatus = "Q";				
                    console.log('20000 query balance Mobile No.:' + sim.mobileNumber + ' completed. Remaining bal.:', response.balanceSummary.remainingBalance);
                    this.doCheckBalance(sim, ++index, cb);

                } else {
                    sim.errorDetail = 'query balance Mobile No.:' + sim.mobileNumber + ' not pass.';
                    console.log('99999 query balance Mobile No.:' + sim.mobileNumber + ' not pass.');
                    sim.error = true;
                    return cb('err');
                }
            } else {
                console.log(response.resultCode + ' query balance Mobile No.:' + sim.mobileNumber + ' => not pass.');
                sim.errorDetail = 'Error query balance:' + response.resultCode + ' ' + response.developerMessage;
                sim.error = true;
                return cb('err');
            }
        }).catch((err) => {
            console.log('88888 Exception query balance Mobile No.:' + sim.mobileNumber, err); //,JSON.parse (err._body).developerMessage
            sim.errorDetail = 'Exception query balance ' + err;
            sim.error = true;
            return cb(err);
        });
    }
    //-----------------------------------------------------
    // Process TOP up SIM 
    //-----------------------------------------------------	
    doTOPUP(sim, account: any, index: number, cb: any) { // array
        if (!account[index]) { //exit
            return cb();
        }
        sim.step = 2;
        this.Package[this.index].sim[this.indexSim].stepRetry = "topup:" + index;  //********************************** */
        console.log('---Step---', 'topup:' + index);
        let amt = account[index].b;
        let sVAT: string = (Number(amt) - Number(((Number(amt) * 100) * 1.00 / (100 + 7)).toFixed(3))).toFixed(2);

        let moinfo1 = {
            PP_MOBILE_NO: sim.mobileNumber,
            PP_IMSI: sim.imsiNumber,
            PP_RECHARGE_AMT: amt,
            PP_TOTAL_AMT: amt,
            PP_TOTAL_VAT: sVAT,
            PP_TAX_AMT: "0.00",
            PP_RECHARGE_TYPE_VC: "5",
            PP_PAY_TYPE_CODE: "CA",
            PP_FPH_FLAG: "Y",
            PP_FML_STR5: "N"
        }

        let info = {
            PP_SERVICE_OPTION: "N",          
            PP_IP_ADDRESS: this.packageSelect.globalIpAddress,           
            PP_LOCATION_CODE: this.sLocationCode,
            PP_USER_ID: this.sUserID,
            mobileInfo: [moinfo1]
        }

        this.serviceApiService.confPPSPTSim(info).then((response) => {
            console.log('Response confPPSPTSim topup:', response);
            if (response.resultCode === '20000' && response.data.A_ConfPPSPTSimResponse.outbuf.PP_TUX_CODE === '0') {

                this.sendSlavePackage("processing");

                // console.log('conf confPPSPTSim topup ',response);
                // if (response.data.data.OutmobileInfo.PP_MOBILE_NO == t.sMobileNo) {
                let output: any = [];
                output = response.data.A_ConfPPSPTSimResponse.outbuf.OutmobileInfo;
                let PP_STATUS = output[0].PP_STATUS;
                //let PP_STATUS = response.data.OutmobileInfo.PP_STATUS;
                if (PP_STATUS === "FAIL") {
                    sim.errorDetail = 'confPPSPTSIM topup : ' + amt + ' => Fail, ' + response.data.data.OutmobileInfo.PP_REMARK;
                    console.log('99999 confPPSPTSIM topup : ' + amt + ' => Fail,' + response.data.data.OutmobileInfo.PP_REMARK);
                    sim.error = true;
                    return cb('err');
                } else {

                    console.log('20000 confPPSPTSIM topup : ' + amt + ' => Success');
                    var params3: ITranSTs = [
                        {
                            ID: output[0].PP_TRANS_ID,
                            status: output[0].PP_STATUS,
                            trndate: '',
                            remark: output[0].PP_REMARK,
                            sStatusPP: '',
                            sStatusFA: '',
                            sStatusRC: '',
                            sStatusAF: '',
                            sStatusALL: '',
                            sTopupOrAddPack: 'topup'
                        }];
                    // {ID:response.data.data.OutmobileInfo.PP_TRANS_ID,
                    // status: response.data.data.OutmobileInfo.PP_STATUS,
                    // trndate:'',
                    //             remark: response.data.data.OutmobileInfo.PP_REMARK,
                    //              sStatusPP: '',
                    //               sStatusFA: '',   
                    //               sStatusRC: '',
                    //               sStatusAF: '',
                    //               sStatusALL: ''
                    // }];
                    this.Package[this.index].sim[this.indexSim].stepRetry = "check_topup:" + index; //********************************* */
                    console.log('---Step---', 'check_topup:' + index);
                    this.mobileProcessStatus(sim, params3).then((response) => {
                        if (response.resultCode === '20000') { //success
                            console.log('20000 topup [' + sim.simNumber + '] => pass', sim);
                            //sharp add
                            sim.sTransID.push({
                                ID: response.params[0].ID,
                                status: response.params[0].status,
                                trndate: response.params[0].trndate,
                                remark: response.params[0].remark,
                                sStatusPP: response.params[0].sStatusPP,
                                sStatusFA: response.params[0].sStatusFA,
                                sStatusRC: response.params[0].sStatusRC,
                                sStatusAF: response.params[0].sStatusAF,
                                sStatusALL: response.params[0].sStatusALL,
                                sTopupOrAddPack: response.params[0].sTopupOrAddPack
                            });

                            // console.log('check structure t ->',t);
                            this.doTOPUP(sim, account, ++index, cb); // nexst sim after then

                        } else {
                            console.log('Status topup [' + sim.simNumber + '] => not pass ************');
                            //  sim.errorDetail = ' topup  => not pass ************';
                            //  sim.error = true;
                            //sharp add  for retry
                            sim.sTransID.push({
                                ID: params3[0].ID,
                                status: params3[0].status,
                                trndate: params3[0].trndate,
                                remark: params3[0].remark,
                                sStatusPP: params3[0].sStatusPP,
                                sStatusFA: params3[0].sStatusFA,
                                sStatusRC: params3[0].sStatusRC,
                                sStatusAF: params3[0].sStatusAF,
                                sStatusALL: params3[0].sStatusALL,
                                sTopupOrAddPack: params3[0].sTopupOrAddPack
                            });
                            return cb('err');
                        }
                    });
                }
                // } else {
                // t.sErrMsg = '99999 confPPSPTSIM topup : '+amt+' => phone no mismatch. ';
                // t.sStatus = "E";
                // console.log('99999 confPPSPTSIM topup : '+amt+' => phone no mismatch.');
                // return cb('err');
                // }
            } else {
                console.log('conf confPPSPTSim', response);
                console.log('99998 confPPSPTSIM topup : ' + amt + ' => response: ' + response.resultCode + ' with error.');
                sim.errorDetail = 'confPPSPTSIM topup : ' + amt + ' ' + response.resultCode + ':' + response.developerMessage + ' PP_TUX_CODE:' + response.data.A_ConfPPSPTSimResponse.outbuf.PP_TUX_CODE;
                sim.error = true;
                return cb('err'); // do not cotinue
            }
        }).catch((err) => {
            console.log('88888 Exeption confPPSPTSIM topup : ' + amt + ' found => ', err);
            sim.errorDetail = 'Exeption confPPSPTSIM topup : ' + amt + ' ' + err;
            sim.error = true;
            return cb(err);
        });
    }

    doPackage(sim, account: any, index: number, cb: (n?: string) => any) { // array
        if (!account[index]) { //exit
            return cb();
        }
        this.Package[this.index].sim[this.indexSim].stepRetry = "addpack:" + index;   //********************************** */
        console.log('---Step---', 'addpack:' + index);
        sim.step = 3;
        let feature = account[index].b;
        // console.log('getppftmtsassd',t);
        this.serviceApiService.getPPFtMt(feature).then((response) => {
            console.log('Response getPPFtMT:', response);
            this.sendSlavePackage("processing");

            if (response.resultCode === '20000') { //success
                var sFeatureCode = response.data.D_GetPPFtMtResponse.outbuf.PP_FEATURE_CODE; // from getPPftMt
                var sFeatureSubCode = response.data.D_GetPPFtMtResponse.outbuf.PP_FEATURE_SUB_CODE; // from getPPftMt
                var sFeatureGroup = response.data.D_GetPPFtMtResponse.outbuf.PP_GROUP_FEATURE; // from getPPftMt
                let vPP_FML_STR5 = (sFeatureCode != '') ? "Y" : "N"; // feature flag found

                let moinfo1 = {
                    PP_MOBILE_NO: sim.mobileNumber,
                    PP_IMSI: sim.imsiNumber,
                    PP_ACTION_TYPE: "REGISTER",
                    PP_GROUP_FEATURE: sFeatureGroup,
                    PP_FEATURE_CODE: sFeatureCode,
                    PP_FEATURE_SUB_CODE: sFeatureSubCode,
                    PP_FML_STR5: vPP_FML_STR5,
                    PP_FPH_FLAG: "N"
                }

                let info = {
                    PP_SERVICE_OPTION: "N",                  
                    PP_IP_ADDRESS: this.packageSelect.globalIpAddress,                  
                    PP_LOCATION_CODE: this.sLocationCode,
                    PP_USER_ID: this.sUserID,
                    mobileInfo: [moinfo1]
                }
                console.log('20000 getPPFtMt feature : ' + feature + ' => found');

                this.serviceApiService.confPPSPTSim(info).then((response) => {
                    console.log('confPPsim response', response);
                    if (response.resultCode === '20000' && response.data.A_ConfPPSPTSimResponse.outbuf.PP_TUX_CODE === '0') {
                        // if (response.data.data.PP_TUX_CODE === '0') {

                        // if (response.data.data.OutmobileInfo.PP_MOBILE_NO == t.sMobileNo) {
                        let output: any = [];
                        output = response.data.A_ConfPPSPTSimResponse.outbuf.OutmobileInfo;
                        let PP_STATUS = output[0].PP_STATUS;
                        if (PP_STATUS === "FAIL") {
                            console.log('99999 confPPSPTSIM feature : ' + feature + ' => fail' + response.data.data.OutmobileInfo.PP_REMARK);
                            sim.errorDetail = 'confPPSPTSIM feature : ' + feature + ' => fail' + response.data.data.OutmobileInfo.PP_REMARK;
                            sim.error = true;
                            return cb('err');
                        } else {

                            console.log('20000 confPPSPTSIM feature : ' + feature + ' => success', sim);
                            var params3: ITranSTs = [
                                {
                                    ID: output[0].PP_TRANS_ID,
                                    trndate: '',
                                    status: output[0].PP_STATUS,
                                    remark: output[0].PP_REMARK,
                                    sStatusPP: '',
                                    sStatusFA: '',
                                    sStatusRC: '',
                                    sStatusAF: '',
                                    sStatusALL: '',
                                    sTopupOrAddPack: 'addpack'
                                }];
                            this.Package[this.index].sim[this.indexSim].stepRetry = "check_addpack:" + index; //**************************************
                            console.log('---Step---', 'check_addpack:' + index);
                            this.mobileProcessStatus(sim, params3).then((response) => {
                                if (response.resultCode === '20000') { //success
                                    console.log('20000 feature [' + sim.simNumber + '] => pass');
                                    console.log('structure ->', sim);
                                    //sharp add
                                    sim.sTransID.push({
                                        ID: response.params[0].ID,
                                        status: response.params[0].status,
                                        trndate: response.params[0].trndate,
                                        remark: response.params[0].remark,
                                        sStatusPP: response.params[0].sStatusPP,
                                        sStatusFA: response.params[0].sStatusFA,
                                        sStatusRC: response.params[0].sStatusRC,
                                        sStatusAF: response.params[0].sStatusAF,
                                        sStatusALL: response.params[0].sStatusALL,
                                        sTopupOrAddPack: response.params[0].sTopupOrAddPack
                                    });

                                    this.doPackage(sim, account, ++index, cb); // nexst sim after then
                                } else {
                                    console.log('88888 feature [' + sim.simNumber + '] => not pass ************');
                                    //  sim.errorDetail = '88888 feature ['+sim.simNumber+'] => not pass ************';
                                    //  sharp add
                                    sim.sTransID.push({
                                        ID: params3[0].ID,
                                        status: params3[0].status,
                                        trndate: params3[0].trndate,
                                        remark: params3[0].remark,
                                        sStatusPP: params3[0].sStatusPP,
                                        sStatusFA: params3[0].sStatusFA,
                                        sStatusRC: params3[0].sStatusRC,
                                        sStatusAF: params3[0].sStatusAF,
                                        sStatusALL: params3[0].sStatusALL,
                                        sTopupOrAddPack: params3[0].sTopupOrAddPack
                                    });
                                    return cb('err');
                                }
                            });
                        }

                        // else {
                        // console.log('99999 confPPSPTSIM feature: '+f+' => phone no mismatch.');
                        // t.sErrMsg = '99999 confPPSPTSIM feature: '+f+' => phone no mismatch. ';
                        // t.sStatus = "E";
                        // return cb('err');
                        // }
                        // } else { // tux
                        // console.log('99999 confPPSPTSIM feature: '+f+' => tuxido error.',response);
                        // t.sErrMsg = '99999 confPPSPTSIM feature: '+f+' => tuxido error. ';
                        // t.sStatus = "E";
                        // return cb('err');
                        // }
                    } else {
                        console.log('99998 confPPSPTSIM feature: ' + feature + ' => response: ' + response.resultCode);
                        sim.errorDetail = '99998 confPPSPTSIM feature: ' + feature + ' => response: ' + response.resultCode;
                        sim.error = true;
                        return cb('err'); // do not cotinue
                    }
                }).catch((err) => {
                    console.log('88888 Exeption confPPSPTSIM feature : ' + feature + ' found => ', err);
                    sim.errorDetail = '88888 Exeption confPPSPTSIM feature : ' + feature + ' found => ';
                    sim.error = true;
                    return cb(err);
                });

            } else {
                console.log('99998 getPPFtMt feature : ' + feature + ' => response: => ' + response.resultCode);
                sim.errorDetail = '99998 getPPFtMt feature : ' + feature + ' => response: => ' + response.resultCode;
                sim.error = true;
                return cb('err'); // do not cotinue
            }
        }).catch((err) => {
            console.log('88888 Exeption getPPFtMt feature :' + feature + ' found => ', err);
            sim.errorDetail = '88888 Exeption getPPFtMt feature :' + feature + ' found =>';
            sim.error = true;
            return cb(err);
        });
    }

    //-----------------------------------------------------
    // async List ttransaction
    //-----------------------------------------------------
    mobileProcessStatus(sim, params3: ITranSTs): Promise<any> {
        return new Promise((resolve, reject) => {
            // try {
            this.doQueryStatus(sim, params3, 0, 0, (err) => {//for time 10
                if (err) {
                    console.log('doQueryStatus promise error');
                    resolve({ resultCode: '99999', data: 'doQueryStatus error' });
                } else {
                    //sharp edit
                    //  sim.sTransID.push({
                    //              ID: params3[0].ID,
                    //          status: params3[0].status,
                    //         trndate: params3[0].trndate,
                    //          remark: params3[0].remark,
                    //       sStatusPP: params3[0].sStatusPP,
                    //       sStatusFA: params3[0].sStatusFA,   
                    //       sStatusRC: params3[0].sStatusRC,
                    //       sStatusAF: params3[0].sStatusAF,
                    //       sStatusALL: params3[0].sStatusALL
                    //     });

                    console.log('20000 doQueryStatus promise complete');
                    resolve({ resultCode: '20000', data: 'doQueryStatus complete', params: params3 });
                }
            });
            // } catch (e) { 
            // console.log(e); 
            // resolve({resultCode: '88888', data: 'Exeption doQuery status'});

            // }
        });
    }

    //-----------------------------------------------------
    // Process do query status mobile 
    //account: ITranSTs,
    //-----------------------------------------------------	
    doQueryStatus(sim, params3: ITranSTs, index: number, retrycnt: number, cb: any) {
        if (!params3[index]) { //exit
            return cb();
        }

        if (retrycnt < 0) {
            console.log('99999 listPPPSTSIM id :' + params3[index].ID + ' process timout ');
            sim.errorDetail = 'listPPPSTSIM id :' + params3[index].ID + ' process timout ';
            sim.error = true;
            return cb('err');
        }
        var trans_id = params3[index].ID; // transaction id
        this.serviceApiService.listPPPSTSIM(sim, trans_id).then((response) => {
            console.log('Response listPPPSTSIM:', response);
            console.log('Status $$$$ 1,2,6,3,4',
                response.data.D_LstPPPSTSIMResponse.outbuf.OutPSTSIM.PP_FML_STR1, response.data.D_LstPPPSTSIMResponse.outbuf.OutPSTSIM.PP_FML_STR2, response.data.D_LstPPPSTSIMResponse.outbuf.OutPSTSIM.PP_FML_STR6, response.data.D_LstPPPSTSIMResponse.outbuf.OutPSTSIM.PP_FML_STR3, response.data.D_LstPPPSTSIMResponse.outbuf.OutPSTSIM.PP_FML_STR4);

            if (response.resultCode === '20000') { //success
                // console.log('list pp',response);
                if (response.data.D_LstPPPSTSIMResponse.outbuf.PP_TUX_CODE === '0') {

                    // console.log('List PPPSTSIM response.data.data.OutPSTSIM ', response.data.D_LstPPPSTSIMResponse.outbuf.OutPSTSIM);

                    params3[index].sStatusALL = response.data.D_LstPPPSTSIMResponse.outbuf.OutPSTSIM.PP_FML_STR4;

                    if (params3[index].sStatusALL === 'COMPLETE') {
                        console.log('20000 listPPPSTSIM id :' + trans_id + ' success ', sim);

                        params3[index].trndate = response.data.D_LstPPPSTSIMResponse.outbuf.OutPSTSIM.PP_RECEIPT_DATE;  //ไม่มีใน t16
                        params3[index].sStatusPP = response.data.D_LstPPPSTSIMResponse.outbuf.OutPSTSIM.PP_FML_STR1;
                        params3[index].sStatusFA = response.data.D_LstPPPSTSIMResponse.outbuf.OutPSTSIM.PP_FML_STR2;
                        params3[index].sStatusRC = response.data.D_LstPPPSTSIMResponse.outbuf.OutPSTSIM.PP_FML_STR6;
                        params3[index].sStatusAF = response.data.D_LstPPPSTSIMResponse.outbuf.OutPSTSIM.PP_FML_STR3;
                        params3[index].sStatusALL = response.data.D_LstPPPSTSIMResponse.outbuf.OutPSTSIM.PP_FML_STR4;
                        params3[index].remark = response.data.D_LstPPPSTSIMResponse.outbuf.OutPSTSIM.PP_REMARK;
                        this.doQueryStatus(sim, params3, ++index, retrycnt, cb);
                    } else {
                        if (params3[index].sStatusALL === 'ERROR') {
                            console.log('99999 listPPPSTSIM id:' + trans_id + ' remark:' + response.data.D_LstPPPSTSIMResponse.outbuf.OutPSTSIM.PP_REMARK);
                            sim.errorDetail = 'ERROR listPPPSTSIM id:' + trans_id + ' remark:' + response.data.D_LstPPPSTSIMResponse.outbuf.OutPSTSIM.PP_REMARK;

                            sim.error = true;
                            return cb('err');
                        } else { // send

                            setTimeout(() => {
                                console.log('retry listPPPSTSIM id:' + trans_id + ' try out: ', retrycnt);
                                this.doQueryStatus(sim, params3, index, --retrycnt, cb);

                            }, 100);
                            // !!!!!!!!!  beware stack over flow
                        }
                    }


                } else { // tux
                    console.log('99999 listPPPSTSIM id: ' + trans_id + ' => tuxido error.' + response);
                    sim.errorDetail = 'listPPPSTSIM id: ' + trans_id + ' => tuxido error.';
                    sim.error = true;
                    return cb('err');
                }

            } else {
                console.log('99998 listPPPSTSIM id: ' + trans_id + ' response.resultCode: ' + response);
                sim.errorDetail = 'listPPPSTSIM id: ' + trans_id + ' ' + response.resultCode + ':' + response.developerMessage;
                sim.error = true;
                return cb('err');
            }
        }).catch((err) => {
            console.log('88888 Exception listPPPSTSIM id: ' + trans_id + ' found => ', err);
            sim.errorDetail = 'Exception listPPPSTSIM id: ' + trans_id + ' found => ';
            sim.error = true;
            return cb(err); // exit this SIM
        });
    }
  
    // onProcess() {
    //     let step: number;
    //     let mobileNumber = this.Package[this.index].sim[this.indexSim].mobileNumber;
    //     let balance = "";
    //     let error: boolean;
    //     let errorDetail = "";
    //     // let statusError = ""; 
    //     this.countSim = this.Package[this.index].sim.length;
    //     step = this.Package[this.index].sim[this.indexSim].step;
    //     let topup = this.Package[this.index].topup;
    //     let tmp: any = [];
    //     tmp = topup.split("|");

    //     switch (step) {
    //         case 0: step = 1;
    //             break;
    //         case 1: step = 2;
    //             break;
    //         case 2: step = 3;
    //             break;
    //         case 3: step = 4;
    //             // mobileNumber = "087830338" + this.Package[this.index].sim[this.indexSim].simNumber.substring(12);

    //             //  mobileNumber = "087830338" + this.Package[this.index].sim[this.indexSim].simNumber.substring(5);
    //             balance = "0.00 THB"
    //             if (this.Package[this.index].sim[this.indexSim].simNumber == "2222222222222") {
    //                 error = true;
    //                 errorDetail = "430893254-server connection timeout";
    //                 balance = "";
    //                 //  mobileNumber= "";     
    //                 // step= 0;
    //                 this.sScript = 'SIM Error:43089324 - server connection timeout.ควรดำเนินการโทรติดต่อ 1303 เพื่อสอบถาม server process หลังบ้านเสียก่อน หากไม่มีดำเนินการใดๆ ควรเลือกกด "Retry"';

    //             }
    //             break;
    //     }

    //     let sim: Sim_item;
    //     sim = {
    //         "simNo": this.Package[this.index].sim[this.indexSim].simNo,
    //         "simNumber": this.Package[this.index].sim[this.indexSim].simNumber,
    //         "mobileNumber": mobileNumber,
    //         "imsiNumber": this.Package[this.index].sim[this.indexSim].imsiNumber,
    //         "simType": this.Package[this.index].sim[this.indexSim].simType,
    //         "balance": balance,
    //         "step": step,
    //         "error": error,
    //         "errorDetail": errorDetail,
    //         "statusError": "error",
    //         "stepRetry": "",
    //         "sTransID": []
    //     };
    //     this.Package[this.index].sim[this.indexSim] = sim;
    //     if (step == 4) {
    //         step = 0; this.indexSim++;
    //     }
    //     if (this.indexSim >= this.countSim) {
    //         this.index++;
    //         this.indexSim = 0;
    //     }

    //     if (this.index >= this.countItem) {
    //         clearInterval(this.interval);
    //         this.statusDone = this.checkDoneProcess();
    //     }

    // }
    // onProcessOne(index, indexSim) {
    //     let step: number;
    //     let mobileNumber = this.Package[index].sim[indexSim].mobileNumber;
    //     let balance = "";
    //     let error: boolean;
    //     let errorDetail = "";
    //     step = this.Package[index].sim[indexSim].step;

    //     switch (step) {
    //         case 0: step = 1;
    //             break;
    //         case 1: step = 2;
    //             break;
    //         case 2: step = 3;
    //             break;
    //         case 3: step = 4;
    //             // mobileNumber = "0999999999" + this.Package[index].sim[indexSim].simNumber.substring(5);
    //             balance = "0.00 THB"
    //             this.statusDone = "done";
    //             break;
    //     }
    //     this.Package[index].sim[indexSim].mobileNumber = mobileNumber;
    //     this.Package[index].sim[indexSim].balance = balance;
    //     this.Package[index].sim[indexSim].step = step;
    //     this.Package[index].sim[indexSim].error = error;
    //     this.Package[index].sim[indexSim].errorDetail = errorDetail;
    //     this.Package[index].sim[indexSim].statusError = "";
    //     //  let  simTmp : Sim_item; 
    //     //  simTmp = {
    //     //   "simNo" : this.Package[this.index].sim[this.indexSim].simNo,
    //     //   "simNumber": this.Package[this.index].sim[this.indexSim].simNumber,
    //     //   "mobileNumber": mobileNumber,
    //     //   "balance": balance,
    //     //   "step": step,
    //     //   "error": error,
    //     //   "errorDetail": errorDetail,
    //     //   "statusError": ""
    //     //   };  

    //     //  this.Package[index].sim[indexSim] = simTmp;        
    //     if (step == 4) clearInterval(this.intervalOne);

    // }
     recursiveScanOne(cb: any) { // array
       
      
        let topup = this.Package[this.index].topup;

        let sim: Sim_item;
        sim = {
            "simNo": this.Package[this.index].sim[this.indexSim].simNo,
            "simNumber": this.Package[this.index].sim[this.indexSim].simNumber,
            "mobileNumber": this.Package[this.index].sim[this.indexSim].mobileNumber,
            "imsiNumber": this.Package[this.index].sim[this.indexSim].imsiNumber,
            "simType": this.Package[this.index].sim[this.indexSim].simType,
            "balance": "",
            "step": 0,
            "error": false,
            "errorDetail": "",
            "statusError": "error",
            "stepRetry": "",
            "sTransID": []
        };
        sim.step = 1;

        this.Package[this.index].sim[this.indexSim] = sim;
        this.Package[this.index].sim[this.indexSim].stepRetry = "pi2";  //chang pi
        console.log('---Step---', 'Pi Sim:' + this.indexSim);
        this.serviceApiService.postPrepaidIdentifier(sim, this.sUserID,this.sLocationCode).then((response) => {
            console.log('Response PrepaidIdentifier:', response);
            this.sendSlavePackage("processing");

            if (response.resultCode === '20000') { //success                         

                console.log('20000 PrepaidIdentifier [' + sim.simNumber + '] => pass, ', sim || {});

                // this.Package[this.index].sim[this.indexSim] = sim;   
                setTimeout(() => {

                    this.addSIMValue(sim, topup).then((response) => {
                        if (response.resultCode === '20000') { //success

                            console.log('20000 add package [' + sim.simNumber + '] => pass');
                             return cb();                           
                        } else {
                            console.log('88888 add package [' + sim.simNumber + '] => not pass ************');
                            return cb('err');                     
                        }
                    });

                }, 100);

            } else {
                console.log('Error PI [' + sim.simNumber + '] => not pass ' + response.developerMessage);
                sim.errorDetail = 'Error PI :' + response.developerMessage;
                sim.error = true;
                 return cb('err');           
            }
        })
            .catch((err) => {
                console.log('catch PI [' + sim.simNumber + ']  => ', err);
                sim.errorDetail = 'Exeption PI [' + sim.simNumber + ']  => ' + err;
                sim.error = true;
                return cb(err); // exit this SIM
              
            });

    }
    onNew(i, j,simNo) {
        this.Package[i].sim[j].step = 0;
        
        this.Package[i].sim[j].statusError = "new";
        this.Package[i].sim[j].stepRetry = "pi";
      
       setTimeout(() => {
          document.getElementById("simNewId" + simNo).focus();
      }, 100);
       // this.Package[i].sim[j].simNumber = "";
    }
    onRetry(indexPackage,indexSim) {
       this.pageLoadingService.openLoading();
       console.log('Retry Package:'+indexPackage+' Sim:'+indexSim)
       this.index = indexPackage;
       this.indexSim = indexSim;
       let stepRetry = this.Package[indexPackage].sim[indexSim].stepRetry;
        if (stepRetry == "pi" || stepRetry == "") {           
             this.recursiveScanOne((err) => {
                if (err) {
                    console.log('------------------------------------');
                    console.log('  Found some SIMs has error exception OnRetry', err);
                    console.log('------------------------------------');
                    this.pageLoadingService.closeLoading();
                } else {
                    this.statusDone = this.checkDoneProcess();
                  //  this.packageSelect.globalCallCenterMsg = this.packageSelect.globalTotal + ' ' + this.txtSim + ' are ' + this.statusDone;
                    this.sendSlavePackage('done');
                    this.pageLoadingService.closeLoading();
                }
            });

        }
    }
    onSkip(i, j) {
        this.Package[i].sim[j].statusError = "skip";
        this.sScript = 'สำหรับ Error ที่เกิดขึ้น จะต้องแยก SIM ที่มีปัญหา<br>เพื่อจัดส่งคืนยังทีม SIM เพื่อตรวจสอบ SIM ต่อไป';
    }
    onCancel(i, j) {
        this.Package[i].sim[j].step = 0;
        this.Package[i].sim[j].error = false;
        // this.Package[i].count--;
        // this.Package[i].sim[j].errorDetail = "";
        this.Package[i].sim[j].statusError = "cancel";
        this.statusDone = this.checkDoneProcess();
        this.packageSelect.globalAmount = this.packageSelect.globalAmount - this.Package[i].price;
        this.packageSelect.globalTotal--;

         this.txtSim = "SIM"
        if (this.packageSelect.globalTotal > 1) this.txtSim = "SIMs";      
        this.packageSelect.globalCallCenterMsg = this.packageSelect.globalTotal + ' ' + this.txtSim + ' are ' + this.statusDone;
    }
    onBack(i, j) {
        this.Package[i].sim[j].statusError = "error";
        //this.typeButtonError = "error";
    }
    //  setChkboxCash(chkboxValue){
    //  this.chkbox = chkboxValue;
    // }
    onNext() {
        this.router.navigate(['/staff/finish'], { relativeTo: this.route });
    }
    onResume(indexPackage,indexSim,simNo) {
      if(this.Package[indexPackage].sim[indexSim].stepRetry == ""){     
            this.pageLoadingService.openLoading();
            console.log('Retry Package:'+indexPackage+' Sim:'+indexSim)
            this.index = indexPackage;
            this.indexSim = indexSim;
                    this.recursiveScanOne((err) => {
                        if (err) {
                            console.log('------------------------------------');
                            console.log('  Found some SIMs has error exception OnRetry', err);
                            console.log('------------------------------------');
                            this.pageLoadingService.closeLoading();
                        } else {
                            this.statusDone = this.checkDoneProcess();
                        //  this.packageSelect.globalCallCenterMsg = this.packageSelect.globalTotal + ' ' + this.txtSim + ' are ' + this.statusDone;
                            this.sendSlavePackage('done');
                            this.pageLoadingService.closeLoading();
                        }
                    });

           
        }
    }
    checkDoneProcess(): string {
        let chk = "done";
        for (var i = 0; i < this.Package.length; i++) {
            for (var j = 0; j < this.Package[i].sim.length; j++) {
                if (this.Package[i].sim[j].statusError != "cancel"  && this.Package[i].sim[j].error) {
                    chk = "processing";
                    break;
                }
            }
        }
        return chk;
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
              document.getElementById("simNewId" + simNo).setAttribute('placeholder', 'Sim Duplicate');
              //i = this.Package.length;
              duplicate = true;
              document.getElementById("simNewId" + simNo).focus();
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
       
       let sim: Sim_item;
          sim = {
            "simNo": simNo,
            "simNumber": "",
            "mobileNumber": "",
            "imsiNumber": "",
            "simType": "",
            "balance": "",
            "step": 0,
            "error": true,
            "errorDetail": "",
            "statusError": "new",
            "stepRetry": "",
            "sTransID": []
        };
        this.Package[indexPkg].sim[indexSim] = sim ;
            this.Package[indexPkg].sim[indexSim].simNumber = inputValue;
            this.Package[indexPkg].sim[indexSim].mobileNumber = mobile;
            this.Package[indexPkg].sim[indexSim].imsiNumber = imsi;
            this.Package[indexPkg].sim[indexSim].simType = simType;

            // if (Number(simNo) < this.packageSelect.globalTotal) {
            //   try {
            //     simNo = Number(simNo) + 1;
            //     document.getElementById("simId" + simNo).focus();
            //   } catch (e) { }
            // }
           // this.packageSelect.globalStatusSimDone = this.checkDoneSim();

          } else {
             document.getElementById("simNewId" + simNo).setAttribute('placeholder', response.developerMessage);
             document.getElementById("simNewId" + simNo).focus();
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
    sendToSlave() {
        var str = {
            command: 'next',
            data: '/customer/customer-done',
            statusDone: ''
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
    sendSlavePackage(stastDoneMSG: string) {
        if (this.packageSelect.globalTotal > 0) {
            var str1 = {
                command: 'open',
                data: this.Package,
                msg: this.packageSelect.globalCallCenterMsg,
                //statusDone: stastDoneMSG,
                amount: this.packageSelect.globalAmount,
                countsim: this.packageSelect.globalTotal
            };
            //  const myObjStr = JSON.stringify(str);    
            //  let data = '{"command":"open","packages":}';
            this.globalmasterService.ws_master.send(str1).subscribe(
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
}


// interface SimProgress {
//   simNumber: string;
//   mobileNumber: string;
//   balance: string;
//   step: number;
// }