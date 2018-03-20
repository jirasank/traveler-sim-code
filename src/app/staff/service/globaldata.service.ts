import { Injectable } from '@angular/core';
//import { ReadIdcardService, IDCardEventListener } from '../.././services/read-idcard.service'
import { package_model } from '../shared/model/package.model';
import { $WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';
// interface iPackage {
//   id: string;
//   day: string;
//   speed: string;
//   credit: string;
//   spec:string;
//   des: string;
//   price: number;
//   color:string;
// }

@Injectable()
export class GlobaldataService {
  globalIpAddress:string = "";
  globalPageCurrent:string = "";
  globalCallCenterMsg = "";
  globalTab = 2;
  globalPackageSelect: package_model[]=[];
  globalPackageSelectCustomer: package_model[]=[];
  globalTotal:number=0; //จำนวน sim รวม
  globalAmount:number=0; //ยอดเงินรวม
  globalPaid:number=0; //จำนวนเงินที่ต้องจ่าย
  globalCash:boolean=true; //แสดง Cash only
  globalStatusSimDone= "scan"; //scan sim
 // AtrString:string; //not use:ex.3B6800000073C84000009000
 // FormatVersion:string; //not use:ex.0003
  globalCardType:string = "";
  globalNationalID:string = "";
  globalThaiTitleName:string= "";
  globalThaiFirstName:string= "";
  globalThaiMiddleName:string= "";
  globalThaiLastName:string= "";
  globalEnglishTitleName:string= "";
  globalEnglishFirstName:string= "";
  globalEnglishMiddleName:string= "";
  globalEnglishLastName:string= "";
  globalBirthdate:string= "";
  globalSex:string= ""; //1: male | 2:female
  globalNationality:string= "";
  //RequestNo:string; //not use:ex.12994332496/12280839
  globalIssuePlace:string= "";
  //IssuerCode:string; //not use:ex.129930026
  globalIssueDate:string= "";
  globalExpireDate:string= "";
 // CardType:string; //not use: ex. 01
  globalAddress:string= "";
  globalMoo:string= "";
  globalTrok:string= "";
  globalSoi:string= "";
  globalThanon:string= "";
  globalTumbol:string= "";
  globalAmphur:string= "";
  globalProvince:string= "";
  //PhotoRefNo:string; //not use: ex.12990312280839
  globalZipcode:string= "";
  globalBase64Str:string= "";
  globalBase64ForSumit:string= "";
 
  // ws_master: $WebSocket;        
  constructor() {
    // this.ws_master = new $WebSocket("ws://localhost:8080/RemoteMaster");       
    // console.log("onNewMasterSocket ","Create");  
     // this.ws = new ReadIdcardService();
   }
  //set
  createWsMaster(){
   // this.ws_master = new $WebSocket("ws://localhost:8080/RemoteMaster");       
    // console.log("onNewMasterSocket ","Create");  
  }
  setProfileToGlobalData(profile: string,base64Str: string,base64ForSumit: string,type :string) {
    let json = JSON.parse(profile);
    if(type == "idCard"){
      this.globalCardType = "1";
      this.globalNationalID = json.NationalID;    
      this.globalThaiTitleName = json.ThaiTitleName;
      this.globalThaiFirstName = json.ThaiFirstName;
      this.globalThaiMiddleName = json.ThaiMiddleName ;
      this.globalThaiLastName = json.ThaiLastName;
      this.globalEnglishTitleName = json.EnglishTitleName;
      this.globalEnglishFirstName = json.EnglishFirstName;
      this.globalEnglishMiddleName = json.EnglishMiddleName;
      this.globalEnglishLastName = json.EnglishLastName;
      this.globalBirthdate = json.Birthdate;
      this.globalSex = json.Sex;
      this.globalIssuePlace = json.IssuePlace;
      this.globalIssueDate = json.IssueDate;
      this.globalExpireDate = json.ExpireDate;
      this.globalAddress = json.Address;
      this.globalMoo = json.Moo;
      this.globalTrok = json.Trok;
      this.globalSoi = json.Soi;
      this.globalThanon = json.Thanon;
      this.globalTumbol = json.Tumbol;
      this.globalAmphur = json.Amphur;
      this.globalProvince = json.Province;
      this.globalNationality = json.Nationality;
      this.globalBase64Str = base64Str;
      this.globalBase64ForSumit = base64ForSumit;
    } else {
      this.globalCardType = "0";
      this.globalNationalID = json.PassportNumber;    
      this.globalThaiTitleName = "";
      this.globalThaiFirstName = "";
      this.globalThaiMiddleName = "" ;
      this.globalThaiLastName = "";
      this.globalEnglishTitleName = "";
      this.globalEnglishFirstName = json.GivenName;
      this.globalEnglishMiddleName = "";
      this.globalEnglishLastName = json.Surname;
      this.globalBirthdate = json.BirthDate;
      this.globalSex = json.Sex;
      this.globalIssuePlace = "";
      this.globalIssueDate = "";
      this.globalExpireDate = json.ExpireDate;
      this.globalAddress = "";
      this.globalMoo = "";
      this.globalTrok = "";
      this.globalSoi = "";
      this.globalThanon = "";
      this.globalTumbol = "";
      this.globalAmphur = "";
      this.globalProvince = "";
      this.globalNationality = json.Nationality;
      this.globalBase64Str = base64Str;
      this.globalBase64ForSumit = base64ForSumit;  //empty when sumit use globalBase64Str
    }
  }
   clarData(){
    this.globalPageCurrent = "";
    this.globalCallCenterMsg = "";
    this.globalPageCurrent = "";
    this.globalPackageSelect = [];
    this.globalPackageSelectCustomer = [];
    this.globalTotal = 0;
    this.globalAmount=0;
    this.globalPaid=0;
    this.globalCash=true;
    this.globalStatusSimDone="scan";

    this.globalCardType = "";
    this.globalNationalID = '';    
    this.globalThaiTitleName = '';
    this.globalThaiFirstName = '';
    this.globalThaiMiddleName = '';
    this.globalThaiLastName = '';
    this.globalEnglishTitleName = '';
    this.globalEnglishFirstName = '';
    this.globalEnglishMiddleName = '';
    this.globalEnglishLastName = '';
    this.globalBirthdate = '';
    this.globalSex = '';
    this.globalNationality = '';
    this.globalIssuePlace = '';
    this.globalIssueDate = '';
    this.globalExpireDate = '';
    this.globalAddress = '';
    this.globalMoo = '';
    this.globalTrok = '';
    this.globalSoi = '';
    this.globalThanon = '';
    this.globalTumbol = '';
    this.globalAmphur = '';
    this.globalProvince = '';
    this.globalBase64Str = '';
    this.globalBase64ForSumit = "";
   }
   clearProfile(){
    this.globalNationalID = '';    
    this.globalThaiTitleName = '';
    this.globalThaiFirstName = '';
    this.globalThaiMiddleName = '';
    this.globalThaiLastName = '';
    this.globalEnglishTitleName = '';
    this.globalEnglishFirstName = '';
    this.globalEnglishMiddleName = '';
    this.globalEnglishLastName = '';
    this.globalBirthdate = '';
    this.globalSex = '';
    this.globalNationality = '';
    this.globalIssuePlace = '';
    this.globalIssueDate = '';
    this.globalExpireDate = '';
    this.globalAddress = '';
    this.globalMoo = '';
    this.globalTrok = '';
    this.globalSoi = '';
    this.globalThanon = '';
    this.globalTumbol = '';
    this.globalAmphur = '';
    this.globalProvince = '';
    this.globalBase64Str = '';
    this.globalBase64ForSumit = "";
   }

}

//id profile
// Address:"97/92"
// Amphur:"อำเภอเมืองนนทบุรี"
// AtrString:"3B6800000073C84000009000"
// Birthdate:"25320923"
// CardType:"01"
// EnglishFirstName:"Phayungkiet"
// EnglishLastName:"Unruan"
// EnglishMiddleName:""
// EnglishTitleName:"Mr."
// ExpireDate:"25630922"
// FormatVersion:"0003"
// IssueDate:"25541228"
// IssuePlace:"เทศบาลนครนนทบุรี/จังหวัดนนทบุรี"
// IssuerCode:"129930026    "
// Moo:"หมู่ที่ 9"
// NationalID:"1509900747945"
// PhotoRefNo:"12990312280839"
// Province:"จังหวัดนนทบุรี"
// RequestNo:"12994332496/12280839"

//"{"AtrString":"3B6800000073C84000009000", "FormatVersion":"0003", "NationalID":"1509900747945", "ThaiTitleName":"นาย",
// "ThaiFirstName":"พยุงเกียรติ", "ThaiMiddleName":"", "ThaiLastName":"อุ่นเรือน", "EnglishTitleName":"Mr.", "EnglishFirstName":"Phayungkiet", 
//"EnglishMiddleName":"", "EnglishLastName":"Unruan", "Birthdate":"25320923", "Sex":"1", "RequestNo":"12994332496/12280839",
// "IssuePlace":"เทศบาลนครนนทบุรี/จังหวัดนนทบุรี", "IssuerCode":"129930026    ", "IssueDate":"25541228", "ExpireDate":"25630922", 
//"CardType":"01", "Address":"97/92", "Moo":"หมู่ที่ 9", "Trok":"", "Soi":"", "Thanon":"", "Tumbol":"ตำบลบางเขน", "Amphur":"อำเภอเมืองนนทบุรี",
// "Province":"จังหวัดนนทบุรี", "PhotoRefNo":"12990312280839"}"

//passport
//{"DocType":"P", "IssuingCountry":"UTO", "Surname":"ALMER", "GivenName":"GERHARD", "PassportNumber":"55098742", "Nationality":"D",
// "BirthDate":"621222", "Sex":"M", "ExpireDate":"170419", "PersonalNumber":"2300569"}