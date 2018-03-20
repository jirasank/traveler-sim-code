import { Component, ViewChild, ElementRef, OnInit, OnDestroy, AfterViewInit,Input,Output,EventEmitter } from '@angular/core';
import { GlobaldataService } from '../.././service/globaldata.service';
import { HostListener } from '@angular/core'; //olny back web
import { PlatformLocation } from '@angular/common';
import { $WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';
declare function escape(s:string): string;

@Component({
  selector: 'app-read-passport',
  templateUrl: './read-passport.component.html',
  styleUrls: ['./read-passport.component.scss']
})
export class ReadPassportComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() profileJson : EventEmitter<any> = new EventEmitter();
  @ViewChild('imageDataPage') imageDataPage: ElementRef;
  @ViewChild('labelStatus') labelStatus: ElementRef;
  private ws: $WebSocket;
  showStatusBar = false;
  constructor(public data: GlobaldataService, location: PlatformLocation) { 
    // location.onPopState(() => { //back and forward
    //   this.ws.stop();      
    //   this.ws = null;  
    // });   
  }


  ngOnInit() {
     if(this.data.globalBase64Str != "" && this.data.globalBase64Str != null){
        var  img = this.imageDataPage.nativeElement;    
        img.setAttribute("src", 'data:image/jpg;base64,' + this.data.globalBase64Str + '');  
     } 
     this.onReadPassport();
   }

    ngAfterViewInit() {
      //  this.labelStatus.nativeElement.innerHTML = '';
      //  this.progressDiv.nativeElement.style.visibility = "hidden";
    }
    onReadPassport(){
     var  img = this.imageDataPage.nativeElement;   
     if(this.ws) {
       this.ws.close();
       this.ws = null;   
     } 
     this.ws = new $WebSocket("ws://localhost:8080/ReadPassport");
        
        this.ws.onError((err) => {
             this.showStatusBar = true;
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
                      this.showStatusBar = true;
                      label.innerHTML = "Not Found Scanner: " + obj.Message;    
                      label.style.color = 'red';                      
                    } 
                } else if (obj.Event == "OnScanDocCompleted") {    
                    this.showStatusBar = false;
                    var str = window.atob(obj.Data);
                    let profile = str;
                    var img = this.imageDataPage.nativeElement;
                    var base64str = obj.DataPageImage;
                    if (base64str != null) {
                        img.setAttribute("src", 'data:image/jpg;base64,' + base64str + '');  
                    }
                    this.profileJson.emit({profile: profile, base64Str: base64str,base64ForSumit:""});
                } else if (obj.Event == "OnScanDocError") {
                     this.showStatusBar = true;
                     img.setAttribute("src", 'assets/images/passport-blank.png');
                     label.innerHTML = obj.Message;
                     label.style.color = 'red';                   
                }
            },
            {autoApply: false}
        );
    }
    clearImage(){
     var  img = this.imageDataPage.nativeElement;   
     img.setAttribute("src", 'assets/images/passport-blank.png');     
    }
    ngOnDestroy() {
        this.ws.close();
    }  
}


//{"DocType":"P", "IssuingCountry":"UTO", "Surname":"ALMER", "GivenName":"GERHARD", "PassportNumber":"55098742", "Nationality":"D", "BirthDate":"621222", "Sex":"M", "ExpireDate":"170419", "PersonalNumber":"2300569"}