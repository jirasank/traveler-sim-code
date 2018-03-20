import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [  
  { path: 'login' , component: LoginComponent },
  {
    path: 'staff',
    loadChildren: 'app/staff/staff.module#StaffModule', data: { preload: true }
  },
  {
    path: 'customer',
    loadChildren: 'app/customer/customer.module#CustomerModule', data: { preload: true }
  },
 /* {
    path: 'register-number', loadChildren: 'app/register-number/register-number.module#RegisterNumberModule',
    data: {
      urlBackLink: '/',
      internal: true,
      headerText: 'เปิดเบอร์ใหม่',ng
      rightIcon: false
    }
  },*/
  {path: '', redirectTo: '/staff', pathMatch: 'full'},
  {path: '**', redirectTo: '/staff', pathMatch: 'full'}  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],//, { useHash: true }
  exports: [RouterModule]
})

export class AppRoutingModule {
}
