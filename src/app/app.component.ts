import { Component, OnInit } from '@angular/core';
import { ReadIdcardService, IDCardEventListener } from './services/read-idcard.service'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, IDCardEventListener {
  ws = new ReadIdcardService();
  status = '';
  progress = 0;
  imageUrl = '';
  
  ngOnInit(){
    //called after the constructor and called  after the first ngOnChanges() 
    this.ws.addListener(this);
    this.ws.start();
 }

  onCardStatusChanged(readerName: string, state: boolean) : void {
    this.status = state ? 'Card inserted' : 'Card removed';
  }
  onCardLoadProgress(progress: number) : void {
    this.status = 'Loading data ...'; 
    this.progress = progress;
  }
  onCardLoadCompleted(profile: string, base64Card: string, base64Photo: string) : void {
    this.status = profile;
    this.imageUrl = 'data:image/png;base64,' + base64Card + '';
  }
  onCardLoadError(error: number, message: string) : void {
    this.status = message;
  }            
}
