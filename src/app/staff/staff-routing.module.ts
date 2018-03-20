import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff.component';
import { CashierComponent } from './cashier/cashier.component';
import { ScanPassportComponent } from './scan-passport/scan-passport.component';
import { FinishComponent } from './finish/finish.component';
import { CashierShowPackageComponent } from './cashier-show-package/cashier-show-package.component';
import { CalculateCashComponent } from './calculate-cash/calculate-cash.component';
import { ScanSimComponent } from './scan-sim/scan-sim.component';
import { ProcessSimComponent } from './process-sim/process-sim.component';
//import { LoginComponent } from './login/login.component';

const StaffRoutes: Routes = [
 { path: '', component: StaffComponent,
    children: [
      {
        path: '', component: CashierComponent        
      },
      {
        path: 'cashier', component: CashierComponent      
      },
      {
         path: 'scansim', component: ScanSimComponent        
       },
      {
         path: 'calulate', component: CalculateCashComponent        
       },
       {
         path: 'process-sim', component: ProcessSimComponent        
       },
       {
         path: 'passport', component: ScanPassportComponent        
       },
        {
         path: 'finish', component: FinishComponent        
       }
       ,
        {
         path: 'cashier-show-package', component: CashierShowPackageComponent      
       }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(StaffRoutes)],
  exports: [RouterModule]
})

export class staffRoutesModule {
}
