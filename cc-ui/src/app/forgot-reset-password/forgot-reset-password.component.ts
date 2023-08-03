import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/session.service';

import {Location} from '@angular/common';
import { Router } from '@angular/router';

import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ForgotPassService } from '../sign-in/forgot-password/forgot-password.service';
import { ResetService } from '../sign-in/reset-password/reset.service';
import { ConfirmationResponse, PassWriteRes } from '../sign-in/reset-password/ConfirmationResponse';
@Component({
  selector: 'app-forgot-reset-password',
  templateUrl: './forgot-reset-password.component.html',
  styleUrls: ['./forgot-reset-password.component.css']
})
//Model for confirmation of email
  
export class ForgotResetPasswordComponent implements OnInit{
  userId : any; 
  showPassword=false;
  companyId : any;
  success = false
  isFailure = false
  showEmailInput = true;
  email = '';
 password: any;
password1: any;
password2: any;
isFailureOldPassword: boolean = false;
isNewPasswordsMatch = true;

// Initialize a flag to track the input values
isFormValid = false;


  constructor(private snackBar: MatSnackBar,private router:Router,private sessionService:SessionService, private resetService:ResetService, private _location : Location
    ,private forgotService:ForgotPassService) {
    this.showEmailInput = this.resetService.getShowEmailInput();
   }
  ngOnInit(): void {
    debugger
    this.sessionService.getUserId().subscribe(
      (userId: number) => {
        this.userId = userId;
        // this.resetService.setUid(userId)
      },
      (error: any) => {
        console.error('Error retrieving user ID:', error);
      }
    );
    this.sessionService.getCompanyId().subscribe(
      (companyId: number) => {
        this.companyId = companyId;
        // this.resetService.setCid(companyId)
      },
      (error: any) => {
        console.error('Error retrieving company ID:', error);
      }
    );

    //if you enter via forgot password workflow
    if (this.email = this.forgotService.getEmail())
    {
      
      this.resetService.confirmation(this.email).subscribe(
        (response: ConfirmationResponse) => {
          if (response.message === "User found") {
            const { user_id, company_id } = response.user;
            this.userId = user_id
            this.companyId = company_id
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

  }
  


  getBack(){
    this._location.back();
  }
  
  compare(){
    debugger
    if (this.password1 === this.password2)
    return true 
    else return false
  }


  checkFormValidity() {
    // Check if all inputs are filled
    if (this.password && this.password1 && this.password2) {
      this.isFormValid = true;
    } else {
      this.isFormValid = false;
    }
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
  OnSubmit() {
    this.isFailureOldPassword = false; // Reset the old password error message
    if (this.password1 !== this.password2) {
      this.isNewPasswordsMatch = false;
      return;
    }
    // Call the reset-password service to check and update the password
    this.resetService.resetPassword(this.userId, this.password).subscribe(
      (result: any) => {
        if (result.message === "Password matched") {
          // Password matched, update the password
          this.resetService.updatePassword(this.userId, this.companyId, this.password2).subscribe(
            (response: PassWriteRes) => {
              if (response.message === "Success") {
                // Password successfully changed
                this.success = true;
                setTimeout(() => {
                  // Redirect to login page
                  this.router.navigate(['/sign-in']);
                }, 3000);
              } else {
                // Password update failed, display error message
                this.isFailure = true;
                console.log("Error in the password changing process");
              }
            },
            (error: any) => {
              console.log("Network error");
            }
          );
        }
      },
      (error: any) => {
        if (error.status === 400 && error.error.message === "Password not matched") {
          // Old password does not match, display error message
          this.isFailureOldPassword = true;
          console.log("Old password does not match");
          
          // Reset the form input fields
          this.password = '';
          this.password1 = '';
          this.password2 = '';
        } else {
          console.log("Network error");
        }
      }
    );
  }
  
  
  
  
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}