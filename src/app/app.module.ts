import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from "client-my-channel-lib/src/components/alert/alert.module";
import { AuthModule } from "client-my-channel-lib/src/services/auth/auth.module";
import { CookieService } from "angular2-cookie/core";
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';

 export function cookieServiceFactory (): Object {
   return new CookieService();
 }
// //import { SlicePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent  
    ,LoginComponent  
    
  ],
  imports: [
    BrowserModule
    ,AppRoutingModule
    ,FormsModule
    ,HttpModule    
    ,AuthModule,
    AlertModule
    ,LoginModule
  ],
  providers: [//{provide: LocationStrategy, useClass: HashLocationStrategy}, //for #
   { provide: CookieService, useFactory: cookieServiceFactory }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
