import { Injectable } from '@angular/core';
import { ServiceApiService } from '../service/api/service-api.service';
import { AlertConfirmService } from '../shared/alert-confirm/alert-confirm.service';

@Injectable()
export class PrintService {
  sUserID: string;
  sLocationCode: string;
  constructor(
      private serviceApiService: ServiceApiService
    , private alertConfirmService: AlertConfirmService
    
  ) { }

  printPlguin(sUserID,sLocationCode){
    this.sUserID = sUserID;
    this.sLocationCode = sLocationCode;
    let receiptPlugin = JSON.parse(localStorage.getItem('receiptPlugin'));
    let arryPrint : any = [];
    this.recursivePrint(receiptPlugin,0,arryPrint,(err) => {
      if (err) {
        console.log('create receipt plugin fail', err); // should not do
        this.alertConfirmService.openError("Error:<br>" + err);
      } else {
       
         let strJson = JSON.stringify(arryPrint);
         
        console.log('receipt:',strJson);
        //********************************** */
        let arryObj = JSON.parse(strJson);
      //  let str = JSON.parse(arryObj[0]);
        console.log('json string:',arryObj);
        let PP_RECEIPT_LOCATION = arryObj[0].PP_RECEIPT_LOCATION;
        let PP_RECEIPT_DATE = arryObj[0].PP_RECEIPT_DATE;


        console.log('20000 create receipt plugin completed');
      }
    });
  }
  printTDM(){    
      let path = JSON.parse(localStorage.getItem('receiptTDMPDF'));
      let pathFile =  path.filePath;
      let fileName =  path.fileName;
      console.log('pathTDM', path);

      //********************************************** */
  }
private  recursivePrint(receiptPlugin, subindex: number,arryPrint, cb: any) { // array
    if (!receiptPlugin[subindex]) { // exit
      return cb();
    }
    // --- loop print $$$$$$$$$$$$$$$$$$$$
    let info = {
      "PP_SERVICE_OPTION": "R",
      "PP_RECEIPT_LOCATION": this.sLocationCode, //1004
      // PP_LOCATION_CODE: this.sLocationCode,
      "PP_RECEIPT_TYPE": "W-CO",
      //"PP_RECEIPT_DATE": "2017-10-17", 
      "PP_RECEIPT_DATE": receiptPlugin[subindex].trndate,
      //"PP_RECEIPT_NO": "473", 
      "PP_RECEIPT_NO": receiptPlugin[subindex].ID,
      "PP_USER_ID": this.sUserID //"PATJP529"
     
    }
    this.serviceApiService.getPPReceiptPlugin(info).then((response) => {
      if (response.resultCode === '20000') { // register complete
        console.log('Response getPPReceiptPlugin:' + receiptPlugin[subindex].ID + ' complete.', response);       
         arryPrint.push(response.data.A_GetPPReceiptResponse.outbuf);
         this.recursivePrint(receiptPlugin, ++subindex,arryPrint, cb);
      } else {
        console.log('99999 get receipt transcation:' + receiptPlugin[subindex].ID + ' error.', response);
        return cb(response); 
      }

     
    }).catch((err) => {
      console.log('8888 Exception get receipt transaction:' + receiptPlugin[subindex].ID + ' message =>, ' + JSON.parse(err._body).developerMessage);
      return cb(err);
    });
  }
  
}
