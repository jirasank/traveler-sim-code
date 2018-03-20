import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';
import { AlertService } from "client-my-channel-lib/src/components/alert/alert.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  providers: [
    LoginService,
    AlertService
  ]
})
export class LoginModule { }
