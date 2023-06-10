import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInService } from './sign-in.service';
import { SessionService } from '../session.service';
import { DialogComponent } from '../dialog.component';
import { MatDialog } from '@angular/material/dialog';

interface LoginResponse {
  message: string;
  user?: {
    email: string;
    password: string;
  };
}
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css','../app.component.css']
})

export class SignInComponent implements OnInit{
  loginForm!: FormGroup;
  hide = true;
  showModal=false;
  submitted: Boolean = false;
  Invalid: Boolean = false;
  showPassword=false;
  show=false;
  email!: string;
  showValidationErrors: boolean = false;
  errorMessage: string | undefined;


@Output() emailSent = new EventEmitter<any>();
  
constructor(private router: Router,private formBuilder: FormBuilder,private dialog: MatDialog,private sessionService: SessionService, private signInService: SignInService) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})')]],
    });
  }
isUserValid:boolean=false;
  onLoginSubmit() {
    const formValue = this.loginForm.value;
  if (
    !formValue.email ||
    !formValue.password
  ) {
    this.showValidationErrors = true;
    let errorMessage = 'The following fields are required:\n';
    if (!formValue.email) {
      errorMessage += '- Email\n';
    }
    if (!formValue.password) {
      errorMessage += '- Password\n';
    }
    this.openErrorDialog(errorMessage);
    return;
  }
  if (!this.loginForm.controls['email'].valid) {
    this.openErrorDialog('Invalid email format');
    return;
  }
  // const passwordControl = this.loginForm.get('password');
  // if (passwordControl && passwordControl.invalid) {
  //   this.showValidationErrors = true;
  //   let passwordErrorMessage = 'Invalid password:\n';
  //   if (passwordControl.errors?.['required']) {
  //     passwordErrorMessage += '- Password is required\n';
  //   }
  //   this.openErrorDialog(passwordErrorMessage);
  //   return;
  
    this.signInService.login(this.loginForm.value).subscribe(
      (response: Object) => {
        const loginResponse = response as LoginResponse;
        console.log(response);
        
        if (loginResponse.message === 'Admin Login Successful') {
          debugger
          this.sessionService.setCurrentUser(loginResponse.user);//session
          console.log("admin login success inside loop")
          // this.showModal=true;
          this.router.navigate(['/dashboard']);
      
          this.loginForm.reset();
        } 
        if (loginResponse.message === 'User Login Successful') {
          this.sessionService.setCurrentUser(loginResponse.user);//session
          // redirect to dashboard
          console.log("printed from loop")
          this.router.navigate(['/dashboard']);
        
          this.loginForm.reset();
        } 

        else if (loginResponse.message === 'User Not Found') {
          alert(loginResponse.message);
          this.router.navigate(['/register']);
     
          this.loginForm.reset();
        }

        else if (loginResponse.message === 'Account Not Approved Yet') {
            alert(loginResponse.message);
            this.loginForm.reset();
          }

        else if (loginResponse.message === 'Admin Password Mismatched') {
            alert(loginResponse.message);
            this.loginForm.reset();
        }


        else if (loginResponse.message === 'User Password Mismatched') {
            alert(loginResponse.message);
            this.loginForm.reset();
        }

        else if (loginResponse.message === 'Account Not Active') {
            alert(loginResponse.message);
            this.loginForm.reset();
        }
        else if (loginResponse.message === 'Not Verified') {
          this.email = this.loginForm.value.email;
          this.emailSent.emit(this.email);
          console.log(this.email+"email emiting from sign in page");
            alert("Email is "+loginResponse.message+ ". OTP sent to your email , Please Verify your email to Continue");
            
            this.router.navigate(['/otp-validation']);
        }
        else {
          // display error message
          alert(loginResponse.message);
          this.loginForm.reset();
        }
      },
      (error) => {
        console.log('Error logging in:', error);
        // display error message
        alert('Error logging in. Please try again.');
        this.loginForm.reset();
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
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
