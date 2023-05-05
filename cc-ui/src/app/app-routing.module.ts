import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import {RegisterComponent} from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UploadContractComponent } from './upload-contract/upload-contract.component';
import { UploadInventoryComponent } from './upload-inventory/upload-inventory.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AuthGuard } from './auth.guard';
import { PageNotFoundComponent } from './redundant/page-not-found/page-not-found.component';
import { ResetPasswordComponent } from './sign-in/reset-password/reset-password.component';
import { OtpVerifyComponent } from './otp-verify/otp-verify.component';
import { ForgotPasswordComponent } from './sign-in/forgot-password/forgot-password.component';
import { VerifyComponent } from './sign-in/forgot-password/verify/verify.component';
import { PostAdComponent } from './post-ad/post-ad.component';
import { ForecastingComponent } from './forecasting/forecasting.component';
import { ForecastingTableViewComponent } from './forecasting/forecasting-table-view/forecasting-table-view.component';
const routes: Routes = [
  {
    component:HomeComponent,
    path:''
  },
  {
    component:RegisterComponent,
    path:'register'
  },
  {
    component:SignInComponent,
    path:'sign-in'
  },
  {
    component:DashboardComponent,
    path:'dashboard',
    canActivate: [AuthGuard]
  },
  {
    component:UploadContractComponent,
    path:'upload-contract',
    canActivate: [AuthGuard]
  },
  {
    component:UploadInventoryComponent,
    path:'upload-inventory',
    canActivate: [AuthGuard]
  },
  {
    component:ProfileComponent,
    path:'profile',
    canActivate: [AuthGuard]
  },
  {
    component:AddEmployeeComponent,
    path:'add-employee',
    canActivate: [AuthGuard]
  },
  {
    component:ResetPasswordComponent,
    path:'reset-password',
    canActivate: [AuthGuard]
  },
  {
    component:OtpVerifyComponent,
    path:'otp-validation',
  },
  {
    component:ForgotPasswordComponent,
    path:'forgot-password',
    canActivate: [AuthGuard]

  },
  {
    component:ForecastingComponent,
    path:'forecasting',
    canActivate: [AuthGuard]

  },
  {
    component:ForecastingTableViewComponent,
    path:'forecasting-table-view',
    canActivate: [AuthGuard]

  },
  {
    component:PostAdComponent,
    path:'post-ad',
    // canActivate: [AuthGuard]

  },
  
  {
    component:VerifyComponent,
    path:'verify',
    canActivate: [AuthGuard]
  },

  {path: '**', component: PageNotFoundComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
