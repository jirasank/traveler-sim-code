import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { $WebSocket, WebSocketSendMode } from 'angular2-websocket/angular2-websocket';
import { package_model } from '../../staff/shared/model/package.model';
import { GlobaldataService } from '../../staff/service/globaldata.service';

@Component({
  selector: 'app-customer-welcome',
  templateUrl: './customer-welcome.component.html',
  styleUrls: ['./customer-welcome.component.scss']
})
export class CustomerWelcomeComponent implements OnInit, OnDestroy {
  private ws: $WebSocket;
  public showMessage: boolean;
  public message: string;
  interval: any;
  constructor(
    private router: Router
    , private route: ActivatedRoute
    , public packageSelect: GlobaldataService
  ) { }

  ngOnInit() {
   // this.ws = new $WebSocket("ws://localhost:8080/RemoteSlave");

    // set received message callback
    // this.ws.onMessage(
    //     (msg: MessageEvent) => {
    //         console.log("onMessage ", msg.data);
    //         this.message = msg.data;
    //         this.showMessage = true;
    //        // alert(this.message);
    //         let json = JSON.parse(this.message);
    //       //  let pack: package_model[] = [];
    //       //  pack = json.data;

    //        // alert(pack);
    //          if(json.command == "next"){
    //            // this.router.navigate(['./customer-show-package'], { relativeTo: this.route });
    //              this.router.navigate([json.data], { relativeTo: this.route });
    //          }


    //     },
    //     {autoApply: false}
    // );

    // this.showMessage = false;
    // this.message = '';
    this.onProcess()
    this.interval = setInterval(() => {
      if (!this.showMessage) {
        this.ws.close();
        this.onProcess();
      } else {
        clearInterval(this.interval);
      }

    }, 1000);
  }
  onProcess() {
    this.ws = new $WebSocket("ws://localhost:8080/RemoteSlave");

    // set received message callback
    this.ws.onMessage(
      (msg: MessageEvent) => {
        console.log("onMessage Welcome ", msg.data);
        this.message = msg.data;
        this.showMessage = true;
        // alert(this.message);
        let json = JSON.parse(this.message);
        // alert(pack);
        if (json.command == "next") {
          if (this.packageSelect.globalPageCurrent == "") {
            this.router.navigate(['./customer-show-package'], { relativeTo: this.route });
          } else {
            this.router.navigate([this.packageSelect.globalPageCurrent], { relativeTo: this.route });
            // this.router.navigate([json.data], { relativeTo: this.route });
          }
        }

      },
      { autoApply: false }
    );

    this.showMessage = false;
    this.message = '';
  }
  ngOnDestroy() {
    this.ws.close();
  }

}
