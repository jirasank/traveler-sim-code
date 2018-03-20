import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { customerRoutesModule} from './customer-routing.module';
import { CustomerWelcomeComponent } from './customer-welcome/customer-welcome.component';
import { CustomerShowPackageComponent } from './customer-show-package/customer-show-package.component';
//import { CostomerShowPassportComponent } from './customer-show-passport/customer-show-passport.component';
//import { CostomerProcessComponent } from './customer-process/customer-process.component';
import { ItemPackageModule } from '../staff/shared/item-package/item-package.module';
import { CustomerShowPassportComponent } from './customer-show-passport/customer-show-passport.component';
import { CustomerPassportPaymentComponent } from './customer-passport-payment/customer-passport-payment.component';
import { CustomerDoneComponent } from './customer-done/customer-done.component';
import { ItemSimModule } from '../staff/shared/item-sim/item-sim.module';
import { GlobaldataService } from '../staff/service/globaldata.service';
import { GlobalslaveService } from './service/globalslave.service';


@NgModule({
  imports: [
    CommonModule
    ,customerRoutesModule
    ,ItemPackageModule
    ,ItemSimModule
  ],
  declarations: [CustomerComponent
    , CustomerWelcomeComponent
     , CustomerShowPackageComponent
     , CustomerShowPassportComponent
     , CustomerPassportPaymentComponent
     , CustomerDoneComponent
     
    ],
    providers: [GlobalslaveService,GlobaldataService
    
    ]
})
export class CustomerModule { }
