import { Component, OnInit } from '@angular/core';
import { AlertService } from "client-my-channel-lib/src/components/alert/alert.service";
import { LoginService } from "./login.service";
import { environment } from '../../environments/environment';

import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  macAddress: string;
  clientID: string;
  channelType: string;
  oauthFn: any;
  loginFn: any;
  error: string;

  ngOnInit (): void {
    this.getMacAddress();
    this.getChannelType();
    this.getClientID();
  }

  constructor (
    private loginService: LoginService,
    private alertService: AlertService
    ,private router: Router
    ,private route: ActivatedRoute
  ) { }

  onSubmit (): void {
    const loginInfo: any = {
      username: this.username,
      password: this.password,
      macAddress: this.macAddress,
      clientID: this.clientID,
      channelType: this.channelType
    };
    console.log(loginInfo);
    this.login(loginInfo);
  }

  formRedirect (tokenID: string): void {
   //  this.router.navigate(['/staff'], { relativeTo: this.route });
    // Create form
    const form: any = document.createElement("form");
    form.setAttribute('method', "post");
    form.setAttribute('action', "/api/auth/login");

    // Create input field
    const inputFiled: any = document.createElement("input");
    inputFiled.setAttribute('type', "hidden");
    inputFiled.setAttribute('name', "tokenID");
    inputFiled.value = tokenID;
    form.appendChild(inputFiled);

    const redirectInputField: any = document.createElement("input");
    redirectInputField.setAttribute('type', "hidden");
    redirectInputField.setAttribute('name', 'redirectURL');
    redirectInputField.value = "/staff";
    form.appendChild(redirectInputField);

    document.body.appendChild(form);
    //Submit form
    form.submit();
  }

  login (loginInfo: any): void {
    const self: any = this;
   // this.formRedirect("token");

    this.oauthFn = this.loginService.getTokenID(loginInfo);
    this.oauthFn.then(
      (res: any) => {
        if (res && res.data && res.data.token) {
          this.formRedirect(res.data.token);
        } else {
          this.callPopup('TokenID not found!');
        }
      }
    ).catch((err: any) => {
      const responseErrorBody: any = JSON.parse(err._body);
      console.log('Error', err);
      this.callPopup(responseErrorBody.resultDescription);
      return null;
    });
  }

  private getMacAddress (): void {
    this.macAddress = '';
  }

  private getClientID (): void {
    this.clientID = environment.clientID;
	console.log('client', this.clientID);
  }

  private getChannelType (): void {
    this.channelType = 'mychannel-web';
  }

  private callPopup (err: any): void {
    this.alertService.setpopupMessage(err);
    this.alertService.openPopup();
  }
}
