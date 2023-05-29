import { Component, OnInit } from '@angular/core';
import { ResetService } from '../reset-password/reset.service';
import { ConfirmationResponse } from '../reset-password/ConfirmationResponse';
import { ForgotPassService } from './forgot-password.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from 'src/app/dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent{
  /**
   *
   */
  showValidationErrors: boolean = false;
  email: string= ''
  otp?: any
  validCode = false

  constructor(private resetService: ResetService,private dialog: MatDialog,private formBuilder: FormBuilder, private forgotService: ForgotPassService,private router:Router) {
  
  }


  IfExistsThenSendOTP() {
    debugger

    this.resetService.confirmation(this.email).subscribe(
      (response: ConfirmationResponse) => {
        if (response.message === "User found") {
          debugger
          this.forgotService.setEmail(this.email)//sets the email value to refer from other components
          this.forgotService.getOTP(this.email).subscribe(response => {
            this.otp = response
            this.validCode= ! this.validCode
            this.router.navigate(['verify'])
            this.forgotService.otp = response
          })
          // Do something with user_id and company_id
        } else {
          console.log("User not found");
        }
      },
      error => {
        console.log("error occured while fetching the email: "+ error)
      }
    );
  }
  openErrorDialog(message: string): void {
    this.dialog.open(DialogComponent, {
      data: {
        message: message
      }
    });
  }



}
