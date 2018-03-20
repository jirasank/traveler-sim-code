import { Component, OnInit } from '@angular/core';
import { $WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobaldataService } from '../../staff/service/globaldata.service';
//import { GlobalslaveService } from '../service/globalslave.service';

@Component({
  selector: 'app-customer-show-passport',
  templateUrl: './customer-show-passport.component.html',
  styleUrls: ['./customer-show-passport.component.scss']
})
export class CustomerShowPassportComponent implements OnInit {
  callCenterMsg:string ="Passport, please";
 //chkbox:boolean = true;
  private ws: $WebSocket;
  constructor(
     public packageSelect:GlobaldataService, 
     private router: Router
    , private route: ActivatedRoute
    //,public wsSlave: GlobalslaveService
  ) { }

  ngOnInit() {
    this.packageSelect.globalPageCurrent = this.router.url;
    console.log("router current:",this.router.url);
    
     this.ws = new $WebSocket("ws://localhost:8080/RemoteSlave");
   // set received message callback
       this.ws.onMessage(
            (msg: MessageEvent) => {
                console.log("onMessage ", msg.data);                        
                let json = JSON.parse(msg.data);     
                if(json.command == "next"){
                     this.router.navigate([json.data], { relativeTo: this.route });
                } else if(json.command == "cash") {
                 this.packageSelect.globalCash = json.data;
                }                          
              
            },
            {autoApply: false}
        );
  }
    ngOnDestroy() {
        this.ws.close();
    }

}
