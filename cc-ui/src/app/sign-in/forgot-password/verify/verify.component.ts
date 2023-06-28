import { Component } from '@angular/core';
import { ForgotPassService } from '../forgot-password.service';
import { Router } from '@angular/router';
import { ResetService } from '../../reset-password/reset.service';
import { ConfirmationResponse } from '../../reset-password/ConfirmationResponse';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {
  result?: boolean
  constructor(private snackBar: MatSnackBar,private forgotPasswordService: ForgotPassService,  private router: Router,private resetPasswordService:ResetService,
     private resetService: ResetService) { }


  userID = 0
  companyID = 0
  move(e: any, p: any, c: any, n: any) {
    var length = c.value.length;
    var maxlength = c.getAttribute('maxlength');
    if (length == maxlength) {
      if (n != "") { n.focus(); }

    }
    if (e.key === "Backspace") {
      if (p != "") {
        p.focus();
      }
    }
  }
  public updateShowEmailInput(value: boolean): void {
    this.resetPasswordService.setShowEmailInput(value);
  }
  verify(a: string, b: string, c: string, d: string, e: string, f: string) {
    debugger
    this.result = this.forgotPasswordService.verifyOtp(a + b + c + d + e + f)
    if (this.result) {
      this.router.navigate(['forgot-reset-password'])
      // this.resetPassComponent.showEmailInput = false
      this.updateShowEmailInput(false)
      this.resetService.confirmation(this.forgotPasswordService.getEmail()).subscribe(
        (response: ConfirmationResponse) => {
          if (response) {
            this.userID = response.user.user_id
            this.companyID = response.user.company_id
          }
        }
      )
      

    }
    else {
      this.snackBar.open('Invalid OTP, Please enter a valid OTP', 'OK', {
        duration: 3000
      });
    }
  }
}
