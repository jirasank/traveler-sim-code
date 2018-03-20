import { Component, ViewChild, ElementRef, OnInit, OnDestroy, AfterViewInit,Input,Output,EventEmitter } from '@angular/core';
import { GlobaldataService } from '../.././service/globaldata.service';
import { HostListener } from '@angular/core'; //olny back web
import { PlatformLocation } from '@angular/common';
import { $WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';
declare function escape(s:string): string;

@Component({
  selector: 'app-idcard',
  templateUrl: './idcard.component.html',
  styleUrls: ['./idcard.component.scss']
})
export class IdcardComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() profileJson : EventEmitter<any> = new EventEmitter();
  @ViewChild('imageIdCard') imageIdCard: ElementRef;
  @ViewChild('labelStatus') labelStatus: ElementRef;
  private ws: $WebSocket = null;
  progressValue = '0%';
  showStatusBar = false;
  showProgress = false;
  constructor(
    public data: GlobaldataService
  ){ //, location: PlatformLocation) { 
    // location.onPopState(() => { //back and forward
    //   this.ws.stop();      
    //   this.ws = null;  
    // });   
  }


  ngOnInit() {
     if(this.data.globalBase64Str != "" && this.data.globalBase64Str != null){
        var  img = this.imageIdCard.nativeElement;    
        img.setAttribute("src", 'data:image/jpg;base64,' + this.data.globalBase64Str + '');  
     } 
     this.onReadIdCard();
  }
  onReadIdCard(){
     var  img = this.imageIdCard.nativeElement;    
    if(this.ws) {
       this.ws.close();
       this.ws = null;   
    } 
        
    this.ws = new $WebSocket("ws://localhost:8080/ReadIDCard");
    this.ws.onError((err) => {
             this.showStatusBar = true;
             this.showProgress = false;
             var label = this.labelStatus.nativeElement;
             label.innerHTML = 'Websocket failed';
             label.style.color = 'red';
        });
   // set received message callback
        this.ws.onMessage(
            (msg: MessageEvent) => {
                //console.log("onMessage ", msg.data);
                var label = this.labelStatus.nativeElement;
                var obj = JSON.parse(msg.data);
                if (obj.Event == "OnInitialized") {
                    if (obj.Error != 0) {
                       this.showProgress = false;
                       this.showStatusBar = true;
                        label.innerHTML = "Not Found Reader: " + obj.Message; 
                        label.style.color = 'red';
                    } 
                } else if (obj.Event == "OnCardInserted") {
                   img.setAttribute("src", 'assets/images/id-blank.png');
                   this.profileJson.emit({profile: "", base64Str: ""});
                   // label.innerHTML = 'Card inserted';
                   // label.style.color = 'black';
                } else if (obj.Event == "OnCardRemoved") {
                   // label.innerHTML = 'Card removed';
                   // label.style.color = 'black';  
                   this.showProgress = false; 
                   this.showStatusBar = false;      
                       
                  //  this.progressDiv.nativeElement.style.visibility = "hidden";
                } else if (obj.Event == "OnCardLoadProgress") {
                    label.innerHTML = 'Loading card data ...';
                    label.style.color = 'darkgreen';
                   // this.progressDiv.nativeElement.style.visibility = "visible";
                   // var control = this.progressBar.nativeElement;
                  //  control.style = 'width: ' + obj.Progress + '%';
                   // control.innerHTML = obj.Progress + '%';
                   this.showProgress = true;
                   this.showStatusBar = true;
                   this.progressValue = obj.Progress + '%';
                } else if (obj.Event == "OnCardLoadCompleted") {
                   // label.innerHTML = 'Load completed.';
                    let profile = decodeURIComponent(escape(window.atob( obj.Data )));
                  //  this.outputText.nativeElement.value = profile;
                    this.showProgress = false;
                    this.showStatusBar = false;
                  //  var img = this.imageIdCard.nativeElement;
                    var base64str = obj.CardImage;
                    if (base64str != null) {
                        img.setAttribute("src", 'data:image/jpg;base64,' + base64str + '');  
                    }
                    this.profileJson.emit({profile: profile, base64Str: base64str,base64ForSumit:obj.CardImage});
                } else if (obj.Event == "OnCardLoadError") {                  
                    img.setAttribute("src", 'assets/images/id-blank.png');                    
                   // img.setAttribute("src", 'assets/images/error-card.png'); 
                     this.showProgress = false;
                     this.showStatusBar = true;
                     label.innerHTML = "Not Found Reader: " + obj.Message; 
                     label.style.color = 'red';
                }             
            },
            {autoApply: false}
        );
    }
    ngAfterViewInit() {
      //  this.labelStatus.nativeElement.innerHTML = '';
      //  this.progressDiv.nativeElement.style.visibility = "hidden";
    }
    clearImage(){
     var  img = this.imageIdCard.nativeElement;
     img.setAttribute("src", 'assets/images/id-blank.png');  
     // alert('resume');
   //  this.ws.reconnect();
    // this.ws.close();
    // this.ws = new $WebSocket("ws://localhost:8080/ReadIDCard");
    }
    ngOnDestroy() {
        this.ws.close();
        
    }
    // test(){
    //    this.profileJson.emit({profile: "profile", base64Str: "base64str"});
    // }
  // onCardStatusChanged(readerName: string, state: boolean): void {
  //   this.showStatusBar = state;
  //   if (state)
  //     this.imageCard = '';
  // }
  // onCardLoadProgress(progress: number): void {
  //   this.progressValue = progress.toString() + '%';
  // }
  // onCardLoadCompleted(profile: string, base64Card: string, base64Photo: string): void {
  //   this.status = true;
  //   this.textTitle = "Read National ID Card";
  //   this.imageCard = 'data:image/png;base64,' + base64Card;
  //   this.showStatusBar = false;
  //   this.data.setProfileToGlobalData(profile);
  // }
  // onCardLoadError(error: number, message: string): void {
  //   this.status = false;
  //   this.textTitle = "Can not Read National ID Card!";
  // } 

}



// import { Component, OnInit,Input } from '@angular/core';
// import { ReadIdcardService, IDCardEventListener } from '../../.././services/read-idcard.service'
// import { GlobaldataService } from '../.././service/globaldata.service';
// import { HostListener } from '@angular/core'; //olny back web
// import { PlatformLocation } from '@angular/common';

// @Component({
//   selector: 'app-read-passport',
//   templateUrl: './read-passport.component.html',
//   styleUrls: ['./read-passport.component.scss']
// })
// export class ReadPassportComponent implements OnInit, IDCardEventListener {
//  // @Input() stopWS:boolean;
//   ws = new ReadIdcardService();
//   status = true;
//   progressValue = '0%';
//   imageCard = '';
//   showStatusBar = false;
//   textTitle = "Read National ID Card";
//   // jsonObj = JSON.parse('{"id":""}'); 
//   constructor(public data: GlobaldataService, location: PlatformLocation) { 
//     location.onPopState(() => { //back and forward
//       this.ws.stop();      
//       this.ws = null;  
//     });   
//   }

// //  @HostListener('window:beforeunload', ['$event']) //when close web
// //   doSomething($event) {
// //     alert('t')
// //    // if(this.hasChanges) $event.returnValue='Your data will be lost!';
// //   }
//   ngOnInit() {
//      this.ws.addListener(this);
//      this.ws.start();
//     //  this.data.ws.addListener(this);
//     // this.data.ws.start();
//     this.showStatusBar = false;
//   }
//   onCardStatusChanged(readerName: string, state: boolean): void {
//     this.showStatusBar = state;
//     if (state)
//       this.imageCard = '';
//   }
//   onCardLoadProgress(progress: number): void {
//     this.progressValue = progress.toString() + '%';
//   }
//   onCardLoadCompleted(profile: string, base64Card: string, base64Photo: string): void {
//     this.status = true;
//     this.textTitle = "Read National ID Card";
//     this.imageCard = 'data:image/png;base64,' + base64Card;
//     this.showStatusBar = false;
//     this.data.setProfileToGlobalData(profile);
//   }
//   onCardLoadError(error: number, message: string): void {
//    // this.status = message;
//     this.status = false;
//     this.textTitle = "Can not Read National ID Card!";
//     //this.progressValue = '0%';
//   } 
//   //  @HostListener('window:popstate', ['$event']) //only back
//   //   onPopState(event) {
//   //   this.ws.stop();    
//   // }

// }
