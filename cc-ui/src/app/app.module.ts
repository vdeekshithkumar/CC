import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { RegisterComponent } from './home-template/register/register.component';

import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './redundant/sidebar/sidebar.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadContractComponent } from './upload-contract/upload-contract.component';
import { UploadInventoryComponent } from './upload-inventory/upload-inventory.component';
import { HeaderComponent } from './redundant/header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { UploadInventoryservice } from './upload-inventory/upload-inventory.service';
import { SignInService } from './sign-in/sign-in.service';
import { Registerservice } from './home-template/register/register.service';
import { EditProfileService } from './profile/edit-profile/edit-profile.service';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { SessionService } from './session.service';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';


import { SearchPipe } from './search.pipe';
import { PageNotFoundComponent } from './redundant/page-not-found/page-not-found.component';
import { ResetPasswordComponent } from './sign-in/reset-password/reset-password.component';
import { OtpVerifyComponent } from './home-template/otp-verify/otp-verify.component';
import { ForgotPasswordComponent } from './sign-in/forgot-password/forgot-password.component';
import { VerifyComponent } from './sign-in/forgot-password/verify/verify.component';
import { MyAdvertisementComponent } from './my-advertisement/my-advertisement.component';
import { PostAdComponent } from './my-advertisement/post-ad/post-ad.component';
import { EmpSearchPipe } from './employee-search.pipe';
import { ViewContractsComponent } from './view-contracts/view-contracts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { ForecastingComponent } from './forecasting/forecasting.component';
import { ForecastingTableViewComponent } from './forecasting/forecasting-table-view/forecasting-table-view.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ForecastMapComponent } from './forecasting/forecast-map/forecast-map.component';
import { FormComponent } from './forecasting/forecast-map/form/form.component';

import { ViewOtherAdsComponent } from './view-other-ads/view-other-ads.component';
import { EditUserDetailsComponent } from './redundant/header/edit-user-details/edit-user-details.component';
import { NegotiationListComponent } from './negotiation-list/negotiation-list.component';
import { NegotiationsComponent } from './negotiations/negotiations.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
import { HomeTemplateComponent } from './home-template/home-template.component';
import { MessagingComponent } from './messaging/messaging.component';
import { ViewOtherAdsMapViewComponent } from './view-other-ads/view-other-ads-map-view/view-other-ads-map-view.component';


@NgModule({
  declarations: [
    AppComponent,
    
    HomeComponent,
    RegisterComponent,
    SignInComponent,
    DashboardComponent,
    SidebarComponent,
    UploadContractComponent,
    UploadInventoryComponent,
    HeaderComponent,
    ProfileComponent,
    EditProfileComponent,
    AddEmployeeComponent,
   
    SearchPipe,
    
    PageNotFoundComponent,
          ResetPasswordComponent,
          OtpVerifyComponent,
          ForgotPasswordComponent,
          VerifyComponent,
          MyAdvertisementComponent,
          PostAdComponent,
          EmpSearchPipe,
          ViewContractsComponent,
          ForecastingComponent,
          ForecastingTableViewComponent,
          ForecastMapComponent,
          FormComponent,
          ViewOtherAdsComponent,
          EditUserDetailsComponent,
          NegotiationListComponent,
          NegotiationsComponent,
          DialogComponent,
          HomeTemplateComponent,
          MessagingComponent,
          ViewOtherAdsMapViewComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxPaginationModule,
    GoogleMapsModule,
    MatDialogModule,
  ],
  providers: [UploadInventoryservice,  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },SignInService,Registerservice,EditProfileService,SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }