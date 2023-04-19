import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/session.service';
import { ResetService } from './reset.service';
import {ConfirmationResponse} from './ConfirmationResponse';
import {Location} from '@angular/common';
import { response } from 'express';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
//Model for confirmation of email
  
export class ResetPasswordComponent implements OnInit{
  userId : any;
  companyId : any;
  constructor(private sessionService:SessionService, private resetService:ResetService, private _location : Location) { }
  ngOnInit(): void {
    this.sessionService.getUserId().subscribe(
      (userId: number) => {
        this.userId = userId;
      },
      (error: any) => {
        console.error('Error retrieving user ID:', error);
      }
    );
    this.sessionService.getCompanyId().subscribe(
      (companyId: number) => {
        this.companyId = companyId;
      },
      (error: any) => {
        console.error('Error retrieving company ID:', error);
      }
    );
  }
  
  showEmailInput = true;
  email = '';
  password1! :string
  password2! :string

  getBack(){
    this._location.back();
  }
  
  compare(){
    if (this.password1 === this.password2)
    return true 
    else return false
  }

  onEmailSend(){
    debugger
    this.resetService.confirmation(this.email).subscribe(
      (response: ConfirmationResponse) => {
        if (response.message === "User found") {
          const { user_id, company_id } = response.user;
          if (user_id ===this.userId && company_id === this.companyId)
          {
            debugger
            this.showEmailInput = false
          }
          // Do something with user_id and company_id
        } else {
          console.log("User not found");
        }
      },
      error => {
       console.log("error occured while fetching the email")
      }
    );
    
  }
  OnSubmit(){
    this.resetService.updatePassword(this.userId,this.companyId,this.password2).subscribe((response)=>{
      console.log(response)
    }
  );
  }
  
}
