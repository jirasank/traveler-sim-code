import { Injectable } from '@angular/core';
import { $WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';

@Injectable()
export class GlobalmasterService {
ws_master: $WebSocket;   
  constructor() {
     this.ws_master = new $WebSocket("ws://localhost:8080/RemoteMaster");       
     console.log("onNewMasterSocket ","Create");  
   }

}
