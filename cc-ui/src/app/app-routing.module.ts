import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import {RegisterComponent} from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UploadContractComponent } from './upload-contract/upload-contract.component';
import { UploadInventoryComponent } from './upload-inventory/upload-inventory.component';

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
    path:'dashboard'

  },
  {
    component:UploadContractComponent,
    path:'upload-contract'
  },
  {
    component:UploadInventoryComponent,
    path:'upload-inventory'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }