import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/session.service';
import { ResetService } from './reset.service';
import { ConfirmationResponse, PassWriteRes } from './ConfirmationResponse';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ForgotPassService } from '../forgot-password/forgot-password.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
//Model for confirmation of email

export class ResetPasswordComponent implements OnInit {
  userId: any;
  showPassword = false;
  companyId: any;
  success = false
  isFailure = false
  showEmailInput = true;
  email = '';
  password1!: string
  password2!: string
  constructor(private snackBar: MatSnackBar, private router: Router, private sessionService: SessionService, private resetService: ResetService, private _location: Location
    , private forgotService: ForgotPassService) {
    this.showEmailInput = this.resetService.getShowEmailInput();
  }
  ngOnInit(): void {

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
    if (this.email = this.forgotService.getEmail()) {

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



  getBack() {
    this._location.back();
  }

  compare() {
    if (this.password1 === this.password2)
      return true
    else return false
  }



  onEmailSend() {

    this.resetService.confirmation(this.email).subscribe(
      (response: ConfirmationResponse) => {
        if (response.message === "User found") {
          const { user_id, company_id } = response.user;
          if (user_id === this.userId && company_id === this.companyId) {

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
    this.resetService.updatePassword(this.userId, this.companyId, this.password2).subscribe((response: PassWriteRes) => {

      if (response.message === "Success") {
        this.success = true
        new Promise(f => setTimeout(f, 1000));
      }
      else {
        console.log("error in the password changing process")

        this.isFailure = true
      }
    },
      error => {
        console.log("network error")
      }
    );
    this.snackBar.open('Password Reset Successfull', 'OK', {
      duration: 3000
    });
    this.router.navigate(['/sign-in']);
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
