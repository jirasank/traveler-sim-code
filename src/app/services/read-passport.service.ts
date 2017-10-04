import { Injectable } from '@angular/core';


@Injectable()
export class ReadPassportService {
  private url: string;
  private websocket: any;
  private listeners: PassportEventListener[] = new Array();
  
  constructor() { 
    this.url = 'ws://localhost:8080/ReadPassport';
  }
  public start() : void {
    this.websocket = new WebSocket(this.url); 
    this.websocket.onopen = (evt) => {
      console.log('ReadPassport Websocket -> Open');
    };  

    this.websocket.onmessage = (evt) => {
      console.log('ReadPassport Websocket -> Message');
      this.decodeMessage(evt.data);
    };
    
    this.websocket.onerror = (evt) => {
      console.log('ReadPassport Websocket -> Error');
    };
    
    this.websocket.onclose = () => {
      console.log('ReadPassport Websocket -> Close');      
    };
  }

  public stop() : void {
    this.websocket.close();
  }

  public addListener(listener: PassportEventListener) : void {
    this.listeners.push(listener);
  }

  private decodeMessage(jsonString) : void {
    let obj = JSON.parse(jsonString);
    if (obj.Event == "OnScanDocCompleted") {
      let profile = window.atob(obj.Data);
      this.listeners.forEach(function(listener) {
        if (listener.onScanPassportCompleted)
          listener.onScanPassportCompleted(profile, obj.DataPageImage);
      });
    } else if (obj.Event == "OnScanDocError") {
      this.listeners.forEach(function(listener) {
        if (listener.onScanPassportError)
          listener.onScanPassportError(obj.Error, obj.Message);
      });
    }
  }  
}

export interface PassportEventListener {
  onScanPassportCompleted(profile: string, base64DataPage: string): void;
  onScanPassportError(errorCode: number, message: string): void;
}