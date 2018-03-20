import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { CustomerWelcomeComponent } from './customer-welcome/customer-welcome.component';
import { CustomerShowPackageComponent } from './customer-show-package/customer-show-package.component';
import { CustomerShowPassportComponent } from './customer-show-passport/customer-show-passport.component';
import { CustomerPassportPaymentComponent } from './customer-passport-payment/customer-passport-payment.component';
import { CustomerDoneComponent } from './customer-done/customer-done.component';

const CostomerRoutes: Routes = [
 { path: '', component: CustomerComponent,
    children: [
      {
        path: '', component: CustomerWelcomeComponent        
      }
      ,{
        path: 'customer-show-package', component: CustomerShowPackageComponent        
      },
      {
        path: 'customer-show-passport', component: CustomerShowPassportComponent        
      },
       {
        path: 'customer-passport-payment', component: CustomerPassportPaymentComponent        
      },
       {
        path: 'customer-done', component: CustomerDoneComponent        
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(CostomerRoutes)],
  exports: [RouterModule]
})

export class customerRoutesModule {
}
