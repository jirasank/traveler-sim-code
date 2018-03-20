import { Component, OnInit,HostListener } from '@angular/core';
import { environment } from "../environments/environment";
import { CookieService } from "angular2-cookie/services/cookies.service";

declare let $: any;
//import { ReadIdcardService, IDCardEventListener } from './services/read-idcard.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  implements OnInit{//, IDCardEventListener {
  // ws = new ReadIdcardService();
  // status = '';
  // progressValue = '0%';
  // imageCard = '';
  // showStatusBar = false;
   constructor (
               private cookieService: CookieService
               ) {
  }
  
  ngOnInit(){
   $(document).foundation();

    if (environment.name === 'develop' || environment.name === 'release') {
      // location code 1216 user MCE
      // let accessToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1DRSIsInRpbWVzdGFtcCI6IjIwMTgwMjE0MTQyMCIsImxvY2F0aW9uQ29kZSI6IjEyMTYiLCJlbWFpbCI6IiIsImZpcnN0bmFtZSI6IiIsImxhc3RuYW1lIjoiIiwic2hhcmVkVXNlciI6Ik1PQklMRUFQUCIsInVzZXJUeXBlIjoiIiwicm9sZSI6IiIsImNoYW5uZWxUeXBlIjoiZWFzeS1hcHAiLCJhc2NDb2RlIjoiMTIzNDU2IiwibW9iaWxlTm8iOiIiLCJpYXQiOjE1MDYwNzE2MDQsImV4cCI6MTUwODY2MzYwNH0.yfS8_1-6HkcxpfscZTgpimC9WeSSF9wLh_osQ8Dwo4g';
      // location code 1136 user MCA
      // let accessToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1DQSIsInRpbWVzdGFtcCI6IjIwMTgwMjE0MTQyMCIsImxvY2F0aW9uQ29kZSI6IjExMzYiLCJlbWFpbCI6IiIsImZpcnN0bmFtZSI6IiIsImxhc3RuYW1lIjoiIiwic2hhcmVkVXNlciI6Ik1PQklMRUFQUCIsInVzZXJUeXBlIjoiIiwicm9sZSI6IiIsImNoYW5uZWxUeXBlIjoiZWFzeS1hcHAiLCJhc2NDb2RlIjoiMTIzNDU2IiwibW9iaWxlTm8iOiIiLCJpYXQiOjE1MDU5Nzk3NzksImV4cCI6MTUwODU3MTc3OX0.iinHu0p4OokpWxTKDikhciG9oAxdq_GNd82h-OHKTW8';
      // location code 1100
      // let accessToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1DIiwidGltZXN0YW1wIjoiMjAyMDAyMTQxNDIwIiwibG9jYXRpb25Db2RlIjoiMTEwMCIsImVtYWlsIjoiIiwiZmlyc3RuYW1lIjoiIiwibGFzdG5hbWUiOiIiLCJzaGFyZWRVc2VyIjoiIiwidXNlclR5cGUiOiIiLCJyb2xlIjoiIiwiY2hhbm5lbFR5cGUiOiJlYXN5LWFwcCIsImFzY0NvZGUiOiIxMjM0NTYiLCJtb2JpbGVObyI6IjA4NzgzMDMzODgiLCJpYXQiOjE1MDU0NDgzNjgsImV4cCI6MTUwODA0MDM2OH0.2aTdl_S03fedYnUImMkbdgOd8DfoxMVHlra0kIigtA4';
      // location code 90035
      let accessToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRXMTAwMDAxIiwidGltZXN0YW1wIjoiMTUyMDQyNTE4NTc1OCIsImxvY2F0aW9uQ29kZSI6Ijk3NDYwIiwiZW1haWwiOiIiLCJmaXJzdG5hbWUiOiJUZXN0IG5ldyIsImxhc3RuYW1lIjoiTXkgQ2hhbm5lbCIsInNoYXJlZFVzZXIiOiJBU1BUV1QwMSIsInVzZXJUeXBlIjoiQVNQIiwicm9sZSI6IkFTUCIsImNoYW5uZWxUeXBlIjoibXljaGFubmVsLXdlYiIsImFzY0NvZGUiOiIwMDQ0OTciLCJtb2JpbGVObyI6IiIsImlhdCI6MTUyMDQyNTE5MiwiZXhwIjoxNTIzMDE3MTkyfQ.qbJw8sWIZ-DEtcoMNcOkXaopDTOMrqf3HcwAKRmtWCU';
      let refreshToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRXMTAwMDAxIiwidGltZXN0YW1wIjoiMTUyMDQyNTE4NTc1OCIsImxvY2F0aW9uQ29kZSI6Ijk3NDYwIiwiZW1haWwiOiIiLCJmaXJzdG5hbWUiOiJUZXN0IG5ldyIsImxhc3RuYW1lIjoiTXkgQ2hhbm5lbCIsInNoYXJlZFVzZXIiOiJBU1BUV1QwMSIsInVzZXJUeXBlIjoiQVNQIiwicm9sZSI6IkFTUCIsImNoYW5uZWxUeXBlIjoibXljaGFubmVsLXdlYiIsImFzY0NvZGUiOiIwMDQ0OTciLCJtb2JpbGVObyI6IiIsImlhdCI6MTUyMDQyNTE5MiwiZXhwIjoxNTIzMDE3MTkyfQ.qbJw8sWIZ-DEtcoMNcOkXaopDTOMrqf3HcwAKRmtWCU';
      this.cookieService.put("accessToken", accessToken);
      this.cookieService.put("refreshToken", refreshToken);     
    }
    
     
    // this.ws.addListener(this);
    // this.ws.start();
    // this.showStatusBar = false;
  }
 // @HostListener("document:onwebkitfullscreenchange", []) fullScreen() {}

  // onCardStatusChanged(readerName: string, state: boolean) : void {
  //     this.showStatusBar = state;
  //     if (state)
  //        this.imageCard = '';
  // }
  // onCardLoadProgress(progress: number) : void {
  //   this.progressValue = progress.toString() + '%';
  // }
  // onCardLoadCompleted(profile: string, base64Card: string, base64Photo: string) : void {
  //   this.status = profile;
  //   this.imageCard = 'data:image/png;base64,' + base64Card;
  //   this.showStatusBar = false;
  // }
  // onCardLoadError(error: number, message: string) : void {
  //   this.status = message;
  // }            
}
