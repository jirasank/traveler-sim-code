import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { GlobaldataService } from '../service/globaldata.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalmasterService } from '../service/globalmaster.service';
//import { PlatformLocation } from '@angular/common'
//import { HostListener } from '@angular/core';

@Component({
  selector: 'app-scan-passport',
  templateUrl: './scan-passport.component.html',
  styleUrls: ['./scan-passport.component.scss']
})
export class ScanPassportComponent implements OnInit {
 // chkbox: boolean = true;
  callCenterMsg:string ="Passport,please";
  id : string;
  firstName : string;
  lastName : string;
  nationality : string;
  typeValue : string = "passport";
  @ViewChild('imageTypeID') imageTypeID: ElementRef;
  @ViewChild('viewIdCard') viewIdCard;
  @ViewChild('viewPassport') viewPassport;
 // stopWS = false;

  constructor(public packageSelect:GlobaldataService
              ,public globalmasterService : GlobalmasterService
              ,private location: Location
              , private router: Router
              ,private route: ActivatedRoute
  ) { //,location: PlatformLocation
    // location.onPopState(() => {

    //     alert('pressed back!');

    // });
   }

  ngOnInit() {
    var str = {
        command: 'next',
        data: '/customer/customer-show-passport'
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

    if(this.packageSelect.globalNationalID !== ""){
      this.setProfile()
       if(this.packageSelect.globalNationalID.length == 13){
       this.typeValue = "idCard";
       }
   }
    

  }
  result($event){
    let base64Str = $event.base64Str;
    let profileJson = $event.profile;
    let base64ForSumit = $event.base64ForSumit;
    if(profileJson != ""){
      this.packageSelect.setProfileToGlobalData(profileJson,base64Str,base64ForSumit,this.typeValue);      
    } else {
      this.packageSelect.clearProfile();     
    }    
    this.setProfile();
   
  }
  // @HostListener('window:popstate', ['$event'])
  // onPopState(event) {
  //   alert('Back button pressed');
  // }
  onScanSim(){   
    this.router.navigate(['/staff/scansim'], { relativeTo: this.route });
  } 

onResumeScan(){
  if(this.typeValue == "passport"){
     this.viewPassport.onReadPassport();
  } else {
     this.viewIdCard.onReadIdCard();
  }
}

onClear(){
  this.packageSelect.clearProfile();
  this.setProfile();
   if(this.typeValue == "passport"){
     this.viewPassport.clearImage();
  } else {
     this.viewIdCard.clearImage();
  }
}
onBack(){
  // this.location.back();
 //   this.router.navigate(['./'], { relativeTo: this.route });    
   this.router.navigate(['./cashier'], { relativeTo: this.route });    
    var  str = {
        command: 'next',
        data: '/customer/customer-show-package'
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
setProfile(){
  this.id = this.packageSelect.globalNationalID;   
  if(this.packageSelect.globalCardType=="1") {
    this.firstName = this.packageSelect.globalThaiTitleName + " "+ this.packageSelect.globalThaiFirstName;
    this.lastName = this.packageSelect.globalThaiLastName;
    this.nationality = this.packageSelect.globalNationality ;  
  } else {
     this.firstName = this.packageSelect.globalEnglishFirstName;
     this.lastName = this.packageSelect.globalEnglishLastName;
     this.nationality = this.packageSelect.globalNationality ;  
  }
}

onSelectionChange(typeValue){ 
  this.onClear();
  this.typeValue = typeValue;
  //  var img = this.imageTypeID.nativeElement;
  // if(this.typeValue == "passport"){
  //    img.setAttribute("src", 'assets/images/passport.png');    
  // } else {
  //    img.setAttribute("src", 'assets/images/id-card-icon.png');    
  // }
 }
  // setChkboxCash(chkboxValue){
  //  this.chkbox = chkboxValue;
  // }
}


