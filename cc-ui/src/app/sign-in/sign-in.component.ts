import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInService } from './sign-in.service';
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
onSubmit() {
  // if(this.loginForm.valid){
  //     this.router.navigate(['/dashboard'])
  //   }
  //   else {
  //     alert('User form is not valid!!')
  //   }
        
  
  this.signInService.login(this.loginForm.value).subscribe(
    (response)=>{
      console.log(response);
      this.router.navigate(['/dashboard'])
    },
    (error)=>{
      console.log('error',error);
      alert('Invalid User')
    }
    );
  
}
// get Email():FormControl{
//   return this.loginForm.get('email')as FormControl;
// }
// get Password():FormControl{
//   return this.loginForm.get('password')as FormControl;
// }


}
