
import { Component,Inject, OnInit, Output,EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Registerservice } from './register.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog.component';



interface RegisterResponse {
  message: string;
  user? : {
  user_id:number;
  otp:number;
};
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','../../app.component.css']
})
export class RegisterComponent implements OnInit 
{
  email!:string;

  @Output() emailSent = new EventEmitter<any>();
  showValidationErrors: boolean = false;
  company_id!:string;

  firstName!: string;
  lastName!: string;
  address!:string;
  agreeToTerms: boolean = false;  
  phone_no!:number;
  public user_id? : number;
  public otp?:number;
  registrationForm!: FormGroup;

  emailFormControl! :FormGroup;
  user_data:any;
  form: any;
  fetched_user_id:any;
  userId:any;
  Otp:any;
   company_name= "";
   company_list : any;
   errors:any;
  r: any;
  
  showPassword=false;
  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder,private dialog: MatDialog,private router:Router,private registerservice:Registerservice) {
   }

ngOnInit(): void {
  const now = new Date();
    const formattedDate = now.toISOString().split('T')[0]; // get date in format yyyy-mm-dd
  this.registrationForm = this.formBuilder.group({
    user_id: ['2',Validators.required],
    company_id:['',Validators.required],
    fname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    lname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    address: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    email: ['', [Validators.required, Validators.email]],
    phone_no:['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$')]],
    city:['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    otp:['12345',Validators.required],
    is_verified:['0',Validators.required],
    is_approved:['1',Validators.required],
    is_active:['1',Validators.required],
    last_login:formattedDate,
    designation: ['admin',Validators.required],
    
  });


  this.registerservice.getAllCompanies().subscribe(
    data => {
      this.company_list = data;
      console.log("port list fetched: ", this.company_list); 
    },
    error => {
      console.log("Company loading error: "+ error);
    }
  );

}



onSubmit(): void {
  const formValue = this.registrationForm.value;
  
  if (
    !formValue.fname ||
    !formValue.lname ||
    !formValue.email ||
    !formValue.address ||
   
    !formValue.company_id ||
    !formValue.password
  ) {
    this.showValidationErrors = true;
    let errorMessage = 'The following fields are required:\n';
    if (!formValue.fname) {
      errorMessage += '- First Name\n';
    }
    if (!formValue.lname) {
      errorMessage += '- Last Name\n';
    }
    if (!formValue.email) {
      errorMessage += '- Email\n';
    }
   
    if (!formValue.company_id) {
      errorMessage += '- Company Name\n';
    }
    if (!formValue.password) {
      errorMessage += '- Password\n';
    }
    this.openErrorDialog(errorMessage);
    
    return;
  }

  if (!this.registrationForm.controls['email'].valid) {
    this.openErrorDialog('Invalid email format');
    return;
  }

  if (!this.registrationForm.controls['address'].valid) {
    this.openErrorDialog('Invalid Country Name');
    return;
  }

  if (!this.registrationForm.controls['fname'].valid) {
    this.openErrorDialog('Invalid First Name Format');
    return;
  }

  if (!this.registrationForm.controls['lname'].valid) {
    this.openErrorDialog('Invalid Last Name Format');
    return;
  }
  const passwordControl = this.registrationForm.get('password');
  if (passwordControl && passwordControl.invalid) {
    this.showValidationErrors = true;
    let passwordErrorMessage = 'Invalid password:\n';
    if (passwordControl.errors?.['required']) {
      passwordErrorMessage += '- Password is required\n';
    }
    if (passwordControl.errors?.['minlength']) {
      passwordErrorMessage += '- Password must be at least 8 characters long\n';
    }
    if (passwordControl.errors?.['pattern']) {
      passwordErrorMessage += '- Password must contain at least one uppercase letter, one lowercase letter, and one digit\n';
    }
    this.openErrorDialog(passwordErrorMessage);
    return;
  }

  try {
    const response = this.registerservice.register(formValue).toPromise();
    alert('OTP Sent Successfully, Please verify your Email');
    this.email = this.registrationForm.value.email;
    this.emailSent.emit(this.email);
    console.log(this.email+"email emiting");
 
    console.log(response);
    console.log(formValue);
    this.router.navigate(['/otp-validation'])
  } catch (error) {
    console.log('Error registering:', error);
  }

}




private redirect(){

  
    this.router.navigate(['/sign-in'])
  

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

// register(): void {
//   if (!this.firstName || !this.lastName||!this.email||!this.address||!this.phone_no||!this.company_id) {
//     alert('Fields should not be empty');
//     return;
//   }
// }
}