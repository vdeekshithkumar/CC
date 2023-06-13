import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
// import {RegisterComponent} from './home-template/register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UploadContractComponent } from './upload-contract/upload-contract.component';
import { UploadInventoryComponent } from './upload-inventory/upload-inventory.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AuthGuard } from './auth.guard';
import { PostAdComponent } from './my-advertisement/post-ad/post-ad.component';
import { PageNotFoundComponent } from './redundant/page-not-found/page-not-found.component';
import { ResetPasswordComponent } from './sign-in/reset-password/reset-password.component';
// import { OtpVerifyComponent } from './home-template/otp-verify/otp-verify.component';
import { ForgotPasswordComponent } from './sign-in/forgot-password/forgot-password.component';
import { VerifyComponent } from './sign-in/forgot-password/verify/verify.component';
import { MyAdvertisementComponent } from './my-advertisement/my-advertisement.component';
import { ViewContractsComponent } from './view-contracts/view-contracts.component';
import { ForecastingTableViewComponent } from './forecasting/forecasting-table-view/forecasting-table-view.component';
import { ForecastingComponent } from './forecasting/forecasting.component';
import { ForecastMapComponent } from './forecasting/forecast-map/forecast-map.component';
import { ViewOtherAdsComponent } from './view-other-ads/view-other-ads.component';
import { NegotiationsComponent } from './negotiations/negotiations.component';
import { HomeTemplateComponent } from './home-template/home-template.component';
import { MessagingComponent } from './messaging/messaging.component';
import { ViewOtherAdsMapViewComponent } from './view-other-ads/view-other-ads-map-view/view-other-ads-map-view.component';
import { TemplateComponent } from './template/template.component';
const routes: Routes = [
  {
    component:HomeComponent,
    path:''
  },
  {
    component:HomeTemplateComponent,
    path:'register'
  },
  {
    component:HomeTemplateComponent,
    path:'sign-in'
  },
  {
    // component:DashboardComponent,
    component:TemplateComponent,
    path:'dashboard',
    canActivate: [AuthGuard]
  },
  {
    component:MyAdvertisementComponent,
    path:'my-ad',
    canActivate: [AuthGuard]
  },
  {
    component:PostAdComponent,
    path:'post-ad',
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
    component:HomeTemplateComponent,
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
    path:'forecasting-table-view',
    canActivate: [AuthGuard]

  },
  
  {
    component:VerifyComponent,
    path:'verify',
    canActivate: [AuthGuard]
  },
  {
    component:ForecastingComponent,
    path:'forecasting',
    canActivate: [AuthGuard]

  },
  {
    component:MyAdvertisementComponent,
    path:'my-ad',
    canActivate: [AuthGuard]
  },
  {
    component:PostAdComponent,
    path:'post-ad',
    canActivate: [AuthGuard]
  },
  {
    component:ViewOtherAdsComponent,
    path:'view-other-ads',
    canActivate: [AuthGuard]
  },
  {
    component:ViewOtherAdsMapViewComponent ,
    path:'view-other-ads-map-view',
    canActivate: [AuthGuard]
  },
  {
    component:ForecastingTableViewComponent,
    path:'forecasting-table-view',
    canActivate: [AuthGuard]

  },
  {
    component:ForecastMapComponent,
    path:'forecast-map',
    canActivate: [AuthGuard]

  },
  {
    component:MessagingComponent,
    path:'messaging',
    canActivate:[AuthGuard]
  },
  {
    component:ViewContractsComponent,
    path:'view-contract',
    canActivate: [AuthGuard]
  },
  {
    component:NegotiationsComponent,
    path:'negotiations',
    canActivate: [AuthGuard]
  },

  {path: '**', component: PageNotFoundComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }