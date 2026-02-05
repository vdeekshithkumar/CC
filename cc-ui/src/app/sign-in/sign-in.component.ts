import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInService } from './sign-in.service';
import { SessionService } from '../session.service';
import { DialogComponent } from '../dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SharedServiceService } from '../shared-service.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
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
  styleUrls: ['./sign-in.component.css', '../app.component.css']
})

export class SignInComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;
  showModal = false;
  submitted: Boolean = false;
  Invalid: Boolean = false;
  showPassword = false;
  show = false;
  email!: string;
  showValidationErrors: boolean = false;
  errorMessage: string | undefined;


  @Output() emailSent = new EventEmitter<any>();

  constructor(private snackBar: MatSnackBar, private router: Router, private formBuilder: FormBuilder, private dialog: MatDialog, private sessionService: SessionService, private signInService: SignInService, private sharedservice: SharedServiceService) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  isUserValid: boolean = false;
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
    this.signInService.login(this.loginForm.value).subscribe(
      (response: Object) => {
        const loginResponse = response as LoginResponse;
        console.log(response);

        if (loginResponse.message === 'Admin Login Successful') {
          this.snackBar.open('hdhdhdh', 'OK', {
            duration: 3000,
            verticalPosition: 'top'
          });
          this.sessionService.setCurrentUser(loginResponse.user);//session
          console.log("admin login success inside loop")

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
          this.snackBar.open(`${loginResponse.message}`, 'OK', {
            duration: 3000,
            verticalPosition: 'top',

          });
          this.router.navigate(['/register']);

          this.loginForm.reset();
        }

        else if (loginResponse.message === 'Account Not Approved Yet') {
          this.snackBar.open(`${loginResponse.message}`, 'OK', {
            duration: 3000,
            verticalPosition: 'top',
          });
          this.loginForm.reset();
        }

        else if (loginResponse.message === 'Admin Password Mismatched') {
          this.snackBar.open(`${loginResponse.message}`, 'OK', {
            duration: 3000,
            verticalPosition: 'top',
          });
          this.loginForm.reset();
        }


        else if (loginResponse.message === 'User Password Mismatched') {
          this.snackBar.open(`${loginResponse.message}`, 'OK', {
            duration: 3000,
            verticalPosition: 'top',
          });
          this.loginForm.reset();
        }

        else if (loginResponse.message === 'Account Not Active') {
          this.snackBar.open(`${loginResponse.message}`, 'OK', {
            duration: 3000,
            verticalPosition: 'top',
          });
          this.loginForm.reset();
        }
        else if (loginResponse.message === 'Not Verified') {

          this.email = this.loginForm.value.email;
          this.sharedservice.setRegisteredEmail(this.email);
          console.log(this.email + "email emiting from sign in page");
          this.snackBar.open("Email is " + loginResponse.message + ". OTP sent to your email , Please Verify your email to Continue", 'OK', {
            duration: 3000,
            verticalPosition: 'top',
          });

          this.sendOtp(this.email);

        }
        else {
          // display error message
          this.snackBar.open(`${loginResponse.message}`, 'OK', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['custom-snackbar']
          });

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



  sendOtp(email: string) {

    this.signInService.sendOtp(email).subscribe(
      (response) => {
        console.log('OTP sent successfully: send otp fntn', response);
        // Handle success, e.g., display a success message to the user
      },
      (error) => {
        console.error('Failed to send OTP:', error);
        // Handle error, e.g., display an error message to the user
      }
    );
    this.router.navigate(['/otp-validation']);
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
