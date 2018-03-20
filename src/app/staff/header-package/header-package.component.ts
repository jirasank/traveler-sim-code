import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { CashierService } from '../cashier/cashier.service';
import { AlertConfirmService } from '../shared/alert-confirm/alert-confirm.service';
import { ActivatedRoute, Router } from "@angular/router";
import { GlobaldataService } from '../service/globaldata.service';
import { GlobalmasterService } from '../service/globalmaster.service';
import { PrintService } from '../service/print.service';
import { JwtHelper } from 'angular2-jwt';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'staff-header-package',
  templateUrl: './header-package.component.html',
  styleUrls: ['./header-package.component.scss']
})
export class HeaderPackageComponent implements OnInit {  
 // chkbox : boolean;
 // groupProcess = 1;
 @Output() chkbox : EventEmitter<boolean> = new EventEmitter();
  tab = 1;
  process: number = 1;
  jwtHelper: JwtHelper = new JwtHelper();   
  userToken : any;
  sUserID: string;
  sLocationCode: string;

 constructor(
             public packageSelect:GlobaldataService  
             , public globalmasterService : GlobalmasterService
             , private cashierService : CashierService
             , private alertConfirmService : AlertConfirmService
             , private router: Router
             , private route: ActivatedRoute
             , private printService: PrintService
             , private cookieService: CookieService
             ) { }

  ngOnInit() {
    this.setLanguage(1);
    
  }
  onPrint(){
     this.userToken = this.jwtHelper.decodeToken(this.cookieService.get("accessToken"));
     // this.sUserID = this.userToken.username; 
    // this.sLocationCode = this.userToken.locationCode; 
     this.sUserID = "POS_TEST";    
     this.sLocationCode = "1004";
    this.printService.printPlguin(this.sUserID,this.sLocationCode);
    this.printService.printTDM();
  }
  setLanguage(btn){   
    this.tab = btn;   
   // if(btn == 2)     this.router.navigate(['./finish'], { relativeTo: this.route });
  }
  setCashOnly(e){
    let chkValue = e.target.checked;      
    this.packageSelect.globalCash = chkValue;
     let message: any = {   
       command: "cash", 
       data: chkValue
     };
     this.cashierService.setMessage(message);
 }
//   setCashOnly(e){
//     let chkValue = e.target.checked;      
//     this.chkbox.emit(chkValue);
//  }
 onGroupClick(opt){
 
   switch(opt){
     case 1 :
       this.process = 1;        
        this.router.navigate(['./'], { relativeTo: this.route });    
                  
        var str = {
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
       
     break;
     case 2 :
            
     this.process = 2;
         this.router.navigate(['./passport'], { relativeTo: this.route });
          
     break;
     case 3 :
       
      this.process = 3;
         this.router.navigate(['./scansim'], { relativeTo: this.route });
     break;
     case 4 :
    //    str = {
    //     command: 'next',
    //     data: '/customer/customer-passport-payment'
    //    } ;
      
    //  //  let data = '{"command":"open","packages":}';
    //     this.packageSelect.ws_master.send(str).subscribe(
    //         (msg)=> {
    //             console.log("next", msg.data);
    //         },
    //         (msg)=> {
    //             console.log("error", msg);
    //         },
    //         ()=> {
    //             console.log("complete");
    //         }
    //     );

      this.process = 4;
         this.router.navigate(['./calulate'], { relativeTo: this.route });
     break;
   }
 }
 onCancel(){
   let customBtn: object[] = [
      {
        name: "Cancel",
        class: "simplert__close",
        function: this.onBackFromAlert.bind(this)
      }
     
    ];
   this.alertConfirmService.openConfirm("Would you like to cancel the current order?",customBtn);
  // this.alertConfirmService.openError("Sim Duplicate"); 
 }
 onBackFromAlert(){
   alert('test');
   this.alertConfirmService.closPopup();
 }
 fullscreen(){
   
   // alert('test');
 }
 print(){
  //  let printContents, popupWin;
  // // printContents = document.getElementById('printSection').innerHTML;
  //  popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  // popupWin.document.open();
  //  popupWin.document.write(`
  //         <html>
  //             <head>
  //                 <title>test</title>
  //                 <style>
  //                     //........Customized style.......
  //                 </style>
  //             </head>
  //             <body onload="window.print();window.close()"> 
  //             </body>
  //         </html>`
  //      );
  // popupWin.document.close();


  //  let e = '<p id="myId" class="myClass">innerHTML<h2 id="h2ID" class="h2CLASS">Heading2</h2></p>';
  //  let div = document.createElement('div');
  //   div.innerHTML = e;
  //  // return div.childNodes;
   
  //   var restorepage = document.body.innerHTML;
  //   var printcontent = document.getElementById('myId').innerHTML;
  //   document.body.innerHTML = printcontent;
  //   window.print();
   // document.body.innerHTML = restorepage;

    var mywindow = window.open('', 'PRINT', 'height=400,width=600');
   // let mywindow : any;
     mywindow.document.write('<html><head><title>' + document.title  + '</title>');
     mywindow.document.write('</head><body >');
     mywindow.document.write('</head><body onLoad="print();self.close();">'); 
     mywindow.document.write('<h1>' + document.title  + '</h1>');
  //  // mywindow.document.write(document.getElementById(elem).innerHTML);
    // mywindow.document.write(' <script language="VBScript">');
    // mywindow.document.write(' Sub Print()');
    // mywindow.document.write(' OLECMDID_PRINT = 6');
    // mywindow.document.write(' OLECMDEXECOPT_DONTPROMPTUSER = 2');
    // mywindow.document.write(' OLECMDEXECOPT_PROMPTUSER = 1');
    //  mywindow.document.write(' If DA Then');
    //   mywindow.document.write('  call WebBrowser1.ExecWB(OLECMDID_PRINT, OLECMDEXECOPT_DONTPROMPTUSER,1)  Else ');
    //    mywindow.document.write('  call WebBrowser1.IOleCommandTarget.Exec _');
    //     mywindow.document.write('  (OLECMDID_PRINT ,OLECMDEXECOPT_DONTPROMPTUSER,"","","")  End If  End Sub');
    //   mywindow.document.write('</script>');
     mywindow.document.write('</body></html>');

  // document.write('<html><head><title>' + document.title  + '</title>');
    
     mywindow.document.close(); // necessary for IE >= 10
    // mywindow.focus(); // necessary for IE >= 10*/
  //  window.print();
    //mywindow.print();
     
 }
}