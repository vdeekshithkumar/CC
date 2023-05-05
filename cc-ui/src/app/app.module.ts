import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
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
import { Registerservice } from './register/register.service';
import { EditProfileService } from './profile/edit-profile/edit-profile.service';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { SessionService } from './session.service';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchPipe } from './search.pipe';
import { PageNotFoundComponent } from './redundant/page-not-found/page-not-found.component';
import { ResetPasswordComponent } from './sign-in/reset-password/reset-password.component';
import { OtpVerifyComponent } from './otp-verify/otp-verify.component';
import { ForgotPasswordComponent } from './sign-in/forgot-password/forgot-password.component';
import { VerifyComponent } from './sign-in/forgot-password/verify/verify.component';
import { PostAdComponent } from './post-ad/post-ad.component';
import { ForecastingComponent } from './forecasting/forecasting.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ForecastingTableViewComponent } from './forecasting/forecasting-table-view/forecasting-table-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
          PostAdComponent,
          ForecastingComponent,
          AppComponent,
          ForecastingTableViewComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
  
  ],
  providers: [UploadInventoryservice,  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },SignInService,Registerservice,EditProfileService,SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
