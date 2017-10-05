import { Component, OnInit } from '@angular/core';
import { ReadIdcardService, IDCardEventListener } from './services/read-idcard.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, IDCardEventListener {
  ws = new ReadIdcardService();
  status = '';
  progressValue = '0%';
  imageCard = '';
  showStatusBar = false;

  ngOnInit(){
    //called after the constructor and called  after the first ngOnChanges() 
    this.ws.addListener(this);
    this.ws.start();
    this.showStatusBar = false;
  }

  onCardStatusChanged(readerName: string, state: boolean) : void {
      this.showStatusBar = state;
      if (state)
         this.imageCard = '';
  }
  onCardLoadProgress(progress: number) : void {
    this.progressValue = progress.toString() + '%';
  }
  onCardLoadCompleted(profile: string, base64Card: string, base64Photo: string) : void {
    this.status = profile;
    this.imageCard = 'data:image/png;base64,' + base64Card;
    this.showStatusBar = false;
  }
  onCardLoadError(error: number, message: string) : void {
    this.status = message;
  }            
}
