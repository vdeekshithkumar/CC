import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInService } from './sign-in.service';

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
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit{
  loginForm!: FormGroup;
  submitted: Boolean = false;
  Invalid: Boolean = false;


  errorMessage: string | undefined;
constructor(private router: Router,private formBuilder: FormBuilder, private signInService: SignInService) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["",Validators.email], 
      password: ["",Validators.required],
    });
  }
// loginForm=new FormGroup({

// email:new FormControl('',Validators.email),
// password:new FormControl('',Validators.required)
// });
    // debugger
  
//  getdetails(){
// // const data=registrationForm.value;
//  }
isUserValid:boolean=false;
// async onLoginSubmit() {
  
 
 
//       const response = await this.signInService.login(this.loginForm.value).subscribe(
     
//         (response)=>{
//               console.log(response);
//              this.router.navigate(['/dashboard'])
//              this.loginForm.reset();

//              },  
//              (error)=>{
//                   console.log('error',error);
//                    alert('Invalid User')
//                    this.loginForm.reset();
//                 }
//                 );
             
             
// }

  onLoginSubmit() {
    this.signInService.login(this.loginForm.value).subscribe(
      (response: Object) => {
        const loginResponse = response as LoginResponse;
        console.log(response);
        if (loginResponse.message === 'Login successful') {
          // redirect to dashboard
          this.router.navigate(['/dashboard']);
          this.loginForm.reset();
        } 
        else if (loginResponse.message === 'User not exist') {
          this.router.navigate(['/register']);
          alert(loginResponse.message);
          this.loginForm.reset();
        }
        else {
          // display error message
          alert(loginResponse.message);
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
  


}
