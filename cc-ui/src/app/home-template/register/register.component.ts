import { Component,Inject, OnInit, Output,EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Registerservice } from './register.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog.component';
import { countries, Country } from 'countries-list';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
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
  countryList: { value: string; name: string; }[] = Object.values(countries)

  .sort((a, b) => a.name.localeCompare(b.name))

  .map((country: Country) => ({

    value: country.name,

    name: country.name

  }));
  

  @Output() emailSent = new EventEmitter<any>();
  showValidationErrors: boolean = false;
  company_id!:string;
 checkEnabled:boolean = false;
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
  
  constructor(private snackBar: MatSnackBar,private route: ActivatedRoute,private formBuilder: FormBuilder,private dialog: MatDialog,private router:Router,private registerservice:Registerservice) {
   }

ngOnInit(): void {
 
  const now = new Date();
    const formattedDate = now.toISOString().split('T')[0]; // get date in format yyyy-mm-dd
  this.registrationForm = this.formBuilder.group({
    user_id: ['2',Validators.required],
    company_id:['',Validators.required],
    fname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(20)]],
    lname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(20)]],
    address: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(25)]],
    phone_no:['', [Validators.pattern('[0-9]*'), Validators.maxLength(15)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$'), Validators.maxLength(15)]],
    city:['', [Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(10)]],
    otp:['12345',Validators.required],
    is_verified:['0',Validators.required],
    is_approved:['1',Validators.required],
    is_active:['1',Validators.required],
    last_login:formattedDate,
    designation: ['admin',Validators.required],
    iagree: [false, Validators.requiredTrue]
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
    !formValue.iagree||
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
    if (!formValue.address) {
      errorMessage += '- Country\n';
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
    if (this.registrationForm.controls['email'].hasError('email')) {
      this.openErrorDialog('Invalid email format');
    } else if (this.registrationForm.controls['email'].hasError('maxlength')) {
      this.openErrorDialog('Maximum character limit exceeded');
    }
    return;
  }

  if (!this.registrationForm.controls['address'].valid) {
    this.openErrorDialog('Invalid Country Name');
    return;
  }

  
if (!this.registrationForm.controls['fname'].valid) {
  if (this.registrationForm.controls['fname'].hasError('maxlength')) {
    this.openErrorDialog('Maximum character limit exceeded for First Name');
  } else {
    this.openErrorDialog('Invalid First Name Format');
  }
  return;
}
  if (!this.registrationForm.controls['lname'].valid) {
    if (this.registrationForm.controls['lname'].hasError('maxlength')) {
      this.openErrorDialog('Maximum character limit exceeded for Last Name');
    } else {
      this.openErrorDialog('Invalid Last Name Format');
    }
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
    if (passwordControl.errors?.['maxlength']) {
      passwordErrorMessage += '- Password cannot exceed 15 characters\n'; // Add your desired max limit message
    }
    if (passwordControl.errors?.['pattern']) {
      passwordErrorMessage += '- Password must contain at least one uppercase letter, one lowercase letter, and one digit\n';
    }
    this.openErrorDialog(passwordErrorMessage);
    return;
  }
  
  if (!this.registrationForm.controls['phone_no'].valid) {
    if (this.registrationForm.controls['phone_no'].hasError('maxlength')) {
      this.openErrorDialog('Maximum character limit exceeded');
    } else{
      this.openErrorDialog('Invalid format');
    }
    return;
  }

  if (!this.registrationForm.controls['city'].valid) {
    if (this.registrationForm.controls['city'].hasError('city')) {
      this.openErrorDialog('Invalid format');
    } else if (this.registrationForm.controls['city'].hasError('maxlength')) {
      this.openErrorDialog('Maximum character limit exceeded');
    }
    return;
  }
  try {
    const response = this.registerservice.register(formValue).toPromise();
    this.snackBar.open('OTP Sent Successfully, Please verify your Email', 'OK', {
      duration: 3000,
           verticalPosition: 'top',
    });
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

 changeInputType(input: { setAttribute: (arg0: string, arg1: any) => void; }, type: any) {
  setTimeout(function() {
    input.setAttribute('type', type);
  }, 100);
}


openErrorDialog(message: string): void {
  this.dialog.open(DialogComponent, {
    data: {
      message: message
    }
  });
}
toggleCheckEnabled():void{
  this.checkEnabled = !this.checkEnabled;
  console.log("dfd"+ this.checkEnabled);
}
togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}


}