import { Injectable } from '@angular/core';

declare function escape(s:string): string;

@Injectable()
export class ReadIdcardService {
  private url: string;
  private websocket: any;
  private listeners: IDCardEventListener[] = new Array();
  
  constructor() { 
    this.url = 'ws://localhost:8080/ReadIDCard';
  }

  public start() : void {
    this.websocket = new WebSocket(this.url); 
    this.websocket.onopen = (evt) => {
      console.log('ReadIDCard Websocket -> Open');
    };  

    this.websocket.onmessage = (evt) => {
      console.log('ReadIDCard Websocket -> Message');
      this.decodeMessage(evt.data);
    };
    
    this.websocket.onerror = (evt) => {
      console.log('ReadIDCard Websocket -> Error');
    };
    
    this.websocket.onclose = () => {
      console.log('ReadIDCard Websocket -> Close');      
    };
  }

  public stop() : void {
    this.websocket.close();
  }

  public addListener(listener: IDCardEventListener) : void {
    this.listeners.push(listener);
  }

  private decodeMessage(jsonString) : void {
    let obj = JSON.parse(jsonString);
    if (obj.Event == "OnCardInserted") {
      this.listeners.forEach((listener) => {
        if (listener.onCardStatusChanged)
          listener.onCardStatusChanged(obj.ReaderName, true);
      });
    } else if (obj.Event == "OnCardRemoved") {
      this.listeners.forEach(function(listener) {
        if (listener.onCardStatusChanged)
          listener.onCardStatusChanged(obj.ReaderName, false);
      });
    } else if (obj.Event == "OnCardLoadProgress") {
      var value = obj.Progress;
      this.listeners.forEach(function(listener) {
        if (listener.onCardLoadProgress)
          listener.onCardLoadProgress(value);
      });
    } else if (obj.Event == "OnCardLoadCompleted") {
      //var str = window.atob(obj.Data);
      let profile = decodeURIComponent(escape(window.atob( obj.Data )));
      this.listeners.forEach(function(listener) {
        if (listener.onCardLoadCompleted)
          listener.onCardLoadCompleted(profile, obj.CardImage, obj.PhotoImage);
      });
    } else if (obj.Event == "OnCardLoadError") {
      this.listeners.forEach(function(listener) {
        if (listener.onCardLoadError)
          listener.onCardLoadError(obj.Error, obj.Message);
      });
    }
  }  
}

export interface IDCardEventListener {
  onCardStatusChanged(readerName: string, state: boolean): void;
  onCardLoadProgress(progress: number): void;
  onCardLoadCompleted(profile: string, base64Card: string, base64Photo: string): void;
  onCardLoadError(errorCode: number, message: string): void;
}