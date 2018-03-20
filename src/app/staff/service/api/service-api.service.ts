import { Injectable } from '@angular/core';
import { package_model } from '../../shared/model/package.model';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { AuthHttpService } from 'client-my-channel-lib/src/services/auth/auth-http.service';
import 'rxjs/add/operator/map';
import { GlobaldataService } from '../globaldata.service';
import { Sim_item } from '../../shared/model/sim.model';

@Injectable()
export class ServiceApiService {
   private menuAPI: string;
   Package: any[];
  constructor(
     private http:Http,
     private authHttp: AuthHttp,
     private authHttpService: AuthHttpService
     , public profile: GlobaldataService
    // private authHttp: AuthHttp
  ) { }

   getPackage(): Promise<package_model[]> {
     this.Package = [
          {
            "id": "A",
            "day": "7 Days",
            "speed": "2.5GB",
            "spec": "Internet",
            "des": "SIM 49 THB / Topup 250 THB",
            "credit": "250",
            "price": 1100,
            "color": "#5F9EA0",
            "hot": true,
            "count": 0,
            "sim": []
          }
          , {
            "id": "B",
            "day": "8 Days",
            "speed": "2.5GB",
            "spec": "Internet",
            "des": "SIM 49 THB / Topup 250 THB",
            "credit": "250",
            "price": 599,
            "color": "#5F9EA0",
            "hot": false,
            "count": 0,
            "sim": []
          }
          , {
            "id": "C",
            "day": "9 Days",
            "speed": "4GB",
            "spec": "Internet",
            "des": "SIM 49 THB / Topup 250 THB",
            "credit": "250",
            "price": 100,
            "color": "#5F9EA0",
            "hot": false,
            "count": 0,
            "sim": []
          }
          ,
          {
            "id": "D",
            "day": "10 Days",
            "speed": "9GB",
            "spec": "Internet",
            "des": "SIM 49 THB / Topup 250 THB",
            "credit": "250",
            "price": 100,
            "color": "#5F9EA0",
            "hot": false,
            "count": 0,
            "sim": []
          },
          {
            "id": "E",
            "day": "20 Days",
            "speed": "6GB",
            "spec": "Internet",
            "des": "SIM 49 THB / Topup 250 THB",
            "credit": "250",
            "price": 100,
            "color": "#5F9EA0",
            "hot": false,
            "count": 0,
            "sim": []
          }

        ]  
    return Promise.resolve(this.Package);
  }
    fndTopUp(str: string) {
        var prctopup = new Array(); // topup

        var sp1 = str.split("|");
        for (var i = 0; i < sp1.length; i++) { // console.log('group | :'+splitted[i]);
            var sp2 = sp1[i].split(":");
            for (var j = 0; j < sp2.length; j++) {
                if (j == 0) { // for topup
                    if (Number(sp2[j]) > 0) { // for not rechecharge
                        // this.getPPFtMt_0 (t, sp2[j]); // pass amount
                        prctopup.push({ a: 0, b: sp2[j] });
                    }
                }

            }
        }
        return prctopup;
    }
    //-----------------------------------------------------
    // get find feature
    //-----------------------------------------------------	
    fndFeature(str: string) {
        var prcfeatr = new Array(); // feature

        var sp1 = str.split("|");
        for (var i = 0; i < sp1.length; i++) { // console.log('group | :'+splitted[i]);
            var sp2 = sp1[i].split(",");
            for (var j = 0; j < sp2.length; j++) {
                var sp3 = sp2[j].split(":");
                // this.getPPFtMt (t , sp3[k]); // pass feature name
                prcfeatr.push({ a: 1, b: sp3[sp3.length - 1] });


            }
        }
        return prcfeatr;
    }

  // getMyCPC_Package ():any {  
  //    return this.http.get('assets/json/pkg.json').map((res: any) => res.json()).toPromise(); 
  // }
  getMyCPC_Package (): Promise<any> {	     
    // let obj= { "consumer": "abcdefghijk12345678"};		
    // this.menuAPI = '/posairport/products';
		// return this.authHttpService.post(this.menuAPI, obj).toPromise();    
     return this.http.get('assets/json/pkg.json').map((res: any) => res.json()).toPromise(); 		
	}
  getMobileBySim(serial: string):any{    
   	let obj = {
			PP_SERVICE_OPTION: "A",
			PP_SIM_SERIAL_NO_VC: serial
		};		
    console.log("Request getPPSimSt2:",obj);
		this.menuAPI = '/posairport/getPPSimSt2';
		return this.authHttpService.post(this.menuAPI, obj).toPromise();
  }
  // getMobileBySim(serial: string):any{    
  //      if(serial == "1111111111111"){
  //         return this.http.get('assets/json/mobilebysim1.json').map((res: any) => res.json()).toPromise(); 
  //       // return this.http.get('assets/json/mobilebysim1.json').map(res => res.json());
  //     } else if(serial == "2222222222222"){
  //        return this.http.get('assets/json/mobilebysim2.json').map((res: any) => res.json()).toPromise(); 
  //           // return this.http.get('assets/json/mobilebysim2.json').map(res => res.json());
  //        } else if(serial == "3333333333333"){
  //           return this.http.get('assets/json/mobilebysim3.json').map((res: any) => res.json()).toPromise(); 
  //            //return this.http.get('assets/json/mobilebysim3.json').map(res => res.json());
  //        } else if(serial == "4444444444444"){
  //           return this.http.get('assets/json/mobilebysim4.json').map((res: any) => res.json()).toPromise(); 
  //            //return this.http.get('assets/json/mobilebysim4.json').map(res => res.json());
  //         } else if(serial == "1540964977153"){
  //            return this.http.get('assets/json/mobilebysim.json').map((res: any) => res.json()).toPromise(); 
  //           // return this.http.get('assets/json/mobilebysim.json').map(res => res.json());
  //        } else {
  //           return this.http.get('assets/json/mobilebysim5.json').map((res: any) => res.json()).toPromise(); 
  //           // return this.http.get('assets/json/mobilebysim5.json').map(res => res.json());
  //        }
     
    
  //  }
  // postPrepaidIdentifier (sim: Sim_item, userId,location: any): Promise<any> {
	
  //    let sCardImage = "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";
  //   	let info = {
  //     "userId": userId,
	// 	  "locationCode": location,
  //     "mobileNo": sim.mobileNumber,
	// 	  "firstName": "จิรศักดิ์",
	// 	  "lastName": "นพแสง",
	// 	  "firstNameEng": "jirasank",
	// 	  "lastNameEng": "noppasank",
	// 	  "cardType": "1",
	// 	  "cardNo": "3160101189501",
	// 	  "channel": "WEB",
	// 	  "idCardImage": sCardImage
    
	// 	 // "mobileNo": sim.mobileNumber,
  //    // "firstName": this.profile.globalThaiFirstName,
  //    //"lastName": this.profile.globalThaiLastName,
  //    // "firstNameEng": this.profile.globalEnglishFirstName,
	// 	  // "lastNameEng": this.profile.globalEnglishLastName,
	// 	  // "cardType": this.profile.globalCardType,
	// 	  // "cardNo": this.profile.globalNationalID,
  //     // "channel": "WEB",
  //     // "idCardImage": this.profile.globalBase64ForSumit
	// 	};
		
	// 	console.log("Request PI:",info);
	//  	this.menuAPI = '/posairport/prepaidIdentifier';
	//  	return this.authHttpService.post(this.menuAPI, info).toPromise();
  
	//  }

  postPrepaidIdentifier(sim: Sim_item, userId,location: any): any {
     if(sim.simNumber == "4444444444444"){
       if(sim.stepRetry == "pi2"){
          return this.http.get('assets/json/prepaididen.json')
                      .map(res => res.json()).toPromise();
       } else {
          return this.http.get('assets/json/prepaididenerr.json')
                      .map(res => res.json()).toPromise();
      }
     } else {
      return this.http.get('assets/json/prepaididen.json')
                  .map(res => res.json()).toPromise();
     }
  }
 	confPPSPTSim (info: any): Promise<any> {
   this.menuAPI = '/posairport/confPPSPTSim';
   console.log("Request confPPSPTSim:",info);
	 return this.authHttpService.post(this.menuAPI, info).toPromise();
  //  return this.http.get('assets/json/confppsptsim.json').map(res => res.json()).toPromise();    
  }
  getPPFtMt (sSIMfeature): Promise<any> {
		let obj = {
			PP_SERVICE_OPTION: "K",
			PP_FEATURE_NAME: sSIMfeature
		};
		this.menuAPI = '/posairport/getPPFtMt';
     console.log("Request getPPFtMt:",obj);
	 	return this.authHttpService.post(this.menuAPI, obj).toPromise();
   //  return this.http.get('assets/json/getPPFtMt.json').map(res => res.json()).toPromise();
	}
  listPPPSTSIM (sim, q: string): Promise<any> {
		let obj = {
			"PP_SERVICE_OPTION": "N",
			"PP_FML_STR7": q,
			"PP_MOBILE_NO": sim.mobileNumber
		};
		this.menuAPI = '/posairport/listPPPSTSIM';
     console.log("Request listPPPSTSIM:",obj);
		return this.authHttpService.post(this.menuAPI, obj).toPromise();
    // return this.http.get('assets/json/listPPPSTSIM.json').map(res => res.json()).toPromise();
	}
  getPPReceiptPlugin (info: any): Promise<any> {
		
		this.menuAPI = '/posairport/getPPReceipt';
		return this.authHttpService.post(this.menuAPI, info).toPromise();
   // return this.http.get('assets/json/getPPReceipt.json').map(res => res.json()).toPromise();
	}
  queryBalance(sMobileNo : string) : Promise<any> {
		let obj = {
            mobileNumber: sMobileNo
        }; // mobile no convert to MSISDN in service
		this.menuAPI = '/posairport/queryBalance';
    console.log("Request queryBalance:",obj);
		return this.authHttpService.post(this.menuAPI, obj).toPromise();
    // return this.http.get('assets/json/querybalance.json').map(res => res.json()).toPromise();
	}
  //  queryBalance(){
  //    return this.http.get('assets/json/querybalance.json')
  //                .map(res => res.json());
  // }
  createReceiptTDM(info: any): Promise<any> {
        
		this.menuAPI = '/posairport/createReceipt';
    console.log("Request createReceipt:",info);
		return this.authHttpService.post(this.menuAPI, info).toPromise();
    // return this.http.get('assets/json/createReceiptTDM.json').map(res => res.json()).toPromise();
	}
 
  createDocPDF (info: any): Promise<any> {        
		this.menuAPI = '/posairport/createDocPDF';
    console.log("Request createDocPDF:",info);
		return this.authHttpService.post(this.menuAPI, info).toPromise();
    // return this.http.get('assets/json/createDocPDF.json').map(res => res.json()).toPromise();
	}

}
