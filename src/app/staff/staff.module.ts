import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { CashierComponent } from './cashier/cashier.component';
import { staffRoutesModule} from './staff-routing.module';
//import { ItemPackageComponent } from './shared/item-package/item-package.component';
import { SelectedItemComponent } from './shared/selected-item/selected-item.component';
import { TotalPackageComponent } from './shared/total-package/total-package.component';
import { SetAttributeDirective } from './directive/set-attribute.directive';
import { ScanPassportComponent } from './scan-passport/scan-passport.component';
import { GlobaldataService } from './service/globaldata.service';
import { GlobalmasterService } from './service/globalmaster.service';
import { FinishComponent } from './finish/finish.component';
import { HeaderComponent } from './header/header.component';
import { ItemPackageModule } from './shared/item-package/item-package.module';
import { HeaderPackageComponent } from './header-package/header-package.component';
import { CashierShowPackageComponent } from './cashier-show-package/cashier-show-package.component';
import { CallCenterComponent } from './shared/call-center/call-center.component';
import { CashierService } from './cashier/cashier.service'
import { ItemPackageSmallModuleModule } from './shared/item-package-small-module/item-package-small-module.module';
import { ReadPassportModule } from './shared/read-passport/read-passport.module';
import { IdcardModule } from './shared/idcard/idcard.module';
import { AlertConfirmModule } from './shared/alert-confirm/alert-confirm.module'
import { AlertConfirmService } from './shared/alert-confirm/alert-confirm.service';
import { ItemSimModule } from './shared/item-sim/item-sim.module';
import { SimComponent } from './sim/sim.component';
import { CalculateCashComponent } from './calculate-cash/calculate-cash.component';
import { ScanSimComponent } from './scan-sim/scan-sim.component';
import { ProcessSimComponent } from './process-sim/process-sim.component';
import { ItemSimProgressComponent } from './shared/item-sim-progress/item-sim-progress.component';
import { PageLoadingModule } from './shared/page-loading/page-loading.module';
import { PageLoadingService } from './shared/page-loading/page-loading.service';
import { ServiceApiService } from './service/api/service-api.service';
import { PrintService } from './service/print.service';

// import { LoginModule } from './login/login.module';
// import { LoginComponent } from './login/login.component';

import { FormsModule } from '@angular/forms';
//import { AuthModule } from "client-my-channel-lib/src/services/auth/auth.module";

//import { AuthModule } from "./service/auth/auth.module";


@NgModule({
  imports: [
    CommonModule,
    staffRoutesModule,
    ItemPackageModule,
    ItemPackageSmallModuleModule,
    ReadPassportModule,
    AlertConfirmModule
    ,ItemSimModule
    ,IdcardModule
    ,PageLoadingModule
   // ,LoginModule  
    ,FormsModule  
    //,AuthModule
    
  ],
  providers: [GlobaldataService
          ,GlobalmasterService
          ,CashierService
          ,AlertConfirmService
          ,PageLoadingService
          ,ServiceApiService
          ,PrintService          
  ],
  declarations: [
   // LoginComponent,
    StaffComponent,
   CashierComponent, 
  // ItemPackageComponent, 
   SelectedItemComponent, 
   TotalPackageComponent, 
   SetAttributeDirective, 
   ScanPassportComponent, 
   FinishComponent, 
   HeaderComponent, 
   HeaderPackageComponent, 
   CashierShowPackageComponent, 
   CallCenterComponent
   , SimComponent
   , CalculateCashComponent
   , ScanSimComponent
   , ProcessSimComponent
   , ItemSimProgressComponent
   
   ]
})
export class StaffModule { }
