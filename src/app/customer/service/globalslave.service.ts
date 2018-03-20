import { Injectable } from '@angular/core';
import { $WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';

@Injectable()
export class GlobalslaveService {
   ws_slave: $WebSocket;  

  constructor() {
    this.ws_slave = new $WebSocket("ws://localhost:8080/RemoteSlave");  
     console.log("onNewSlaveSocket ","Create");  
   }

}
