import { Component, EventEmitter, Input, OnInit,Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServiceService } from '../../shared-service.service';
import { Observable, catchError, throwError } from 'rxjs';
import { OtpService } from './otp.service';
import { DialogComponent } from '../../dialog.component';
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
  styleUrls: ['./otp-verify.component.css','../../app.component.css']
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
  verifyotpForm! :FormGroup;
registeredEmail:any;
 

 

 
  constructor(private router: Router,private formBuilder: FormBuilder,private sharedservice: SharedServiceService,private dialog: MatDialog,private OtpService:OtpService) { }
  ngOnInit(): void {
    
    this.sharedservice.registeredEmail$.subscribe((email: any) => {
      this.registeredEmail = email;
    });
    

    this.otpForm = this.formBuilder.group({
      email: ["",Validators.email], 
      otp: ["", [Validators.required, Validators.pattern(/^\d+$/)]],
    });

  }

  onValidate(){
    console.log("this is otp compoent email caputered"+ this.registeredEmail)

    const formValue = this.otpForm.value;
    if (
   
      !formValue.otp
    ) {
      this.showValidationErrors = true;
      let errorMessage = 'The following fields are required:\n';
     
      if (!formValue.password) {
        errorMessage += '- OTP\n';
      }
      this.openErrorDialog(errorMessage);
      return;
    }

   

  const numericValidator = Validators.pattern('^[0-9]*$');
  this.otpForm.get('otp')?.setValidators([numericValidator]);
    if (this.otpForm.invalid) {
      if (this.otpForm.controls['otp'].errors?.['pattern']) {
        this.openErrorDialog('Please enter a valid OTP');
      } 
      return;
    }
 
    
    const otp = this.otpForm.value.otp;
    console.log('otp value:', otp);
  
    this.OtpService.getEmail(this.registeredEmail).subscribe(
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
                
                  this.openErrorDialog("Pleasse Enter the valid OTP");
                 }
                      // window.location.reload()
                    },
                    (error: any) => {
                      console.error('An error occurred while verifying:', error);
                    }
                  );
                
                  // const response = this.registerservice.verify(this.userId,this.Otp).toPromise();
                  // console.log(response);
                  // alert(" success verification ")
                } 
                catch (error) {
                  console.log('Error veryfying:', error);
                }
              },
              (error: any) => {
                console.log("Error while retrieving", error);
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