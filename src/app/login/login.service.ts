import { Injectable } from '@angular/core';
import { AuthHttpService } from 'client-my-channel-lib/src/services/auth/auth-http.service';

@Injectable()
export class LoginService {

    constructor (
        private authHttpService: AuthHttpService
    ) {
    }

    getTokenID (loginInfo: any): Promise<any> {
        return this.authHttpService.login(
            loginInfo.username, loginInfo.password, loginInfo.channelType, loginInfo.clientID, loginInfo.macAddress
        ).toPromise();
    }
}
