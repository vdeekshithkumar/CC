import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, catchError, throwError } from 'rxjs';
import { OtpService } from './otp.service';
import { DialogComponent } from '../dialog.component';
import { MatDialog } from '@angular/material/dialog';
interface RegisterResponse {
  message: string;
  user? : {
  user_id:number;
  otp:number;
};
}
@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrls: ['./otp-verify.component.css']
})
export class OtpVerifyComponent implements OnInit{
  otpForm!: FormGroup;
  user_data:any;
  public user_id? : number;
  public otp?:number;
  form: any;
  userId:any;
  Otp:any;
  showValidationErrors: boolean = false;


  constructor(private router: Router,private formBuilder: FormBuilder,private dialog: MatDialog,private OtpService:OtpService) { }
  ngOnInit(): void {
    this.otpForm = this.formBuilder.group({
      email: ["",Validators.email], 
      otp: ["",Validators.required],
    });
  }
  onValidate(){
    const formValue = this.otpForm.value;
  if (
    !formValue.email ||
    !formValue.otp
  ) {
    this.showValidationErrors = true;
    let errorMessage = 'The following fields are required:\n';
    if (!formValue.email) {
      errorMessage += '- Email\n';
    }
    if (!formValue.otp) {
      errorMessage += '- OTP\n';
    }
    this.openErrorDialog(errorMessage);
    return;
  }
    
  if (!this.otpForm.controls['email'].valid) {
    this.openErrorDialog('Invalid email format');
    return;
  }
 
    const emailValue = this.otpForm.value.email;
    console.log('Email value:', emailValue);
    
    const otp = this.otpForm.value.otp;
    console.log('otp value:', otp);
  
    this.OtpService.getEmail(emailValue).subscribe(
      (response: Object) => {
        const RegisterResponse = response as RegisterResponse;
    
   
        this.user_data= RegisterResponse;
        const parseData = JSON.parse(this.user_data);
        console.log('parsed user user id' +  parseData.user.user_id)
        this.userId=parseData.user.user_id;
       this.Otp=otp;
                try {
                  this.OtpService.verify(this.userId,this.Otp)
                  .subscribe(
                    (                    response: { message: string; }) => {
                      console.log('verified successfully:', response.message);
                 if(response.message=="OTP verified successfully"){
                  alert("User Verified Successfully")
              this.router.navigate(['/sign-in']);
                 }
                 else{
                
                  this.openErrorDialog("Enter the valid OTP");
                 }
                      // window.location.reload()
                    },
                    (error: any) => {
                      console.error('An error occurred while verifying:', error);
                      alert(" Error verifying: ")
                      window.location.reload();
                    }
                  );
                
                  // const response = this.registerservice.verify(this.userId,this.Otp).toPromise();
                  // console.log(response);
                  // alert(" success verification ")
                } 
                catch (error) {
                  console.log('Error veryfying:', error);
                  alert(" Error verifying: ")
                  window.location.reload();
                }
              },
              (error: any) => {
                console.log("Error while retrieving", error);
                alert(" Error verifying: ")
                window.location.reload();
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