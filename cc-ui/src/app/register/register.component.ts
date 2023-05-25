
import { Component,Inject, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Registerservice } from './register.service';



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
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit 
{
  company_id!:string;
  email!:string;
  firstName!: string;
  lastName!: string;
  address!:string;
  phone_no!:number;
  public user_id? : number;
  public otp?:number;
  registrationForm!: FormGroup;
  verifyotpForm! :FormGroup;
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
  constructor(private formBuilder: FormBuilder,private router:Router,private registerservice:Registerservice) {
  }

ngOnInit(): void {
  const now = new Date();
    const formattedDate = now.toISOString().split('T')[0]; // get date in format yyyy-mm-dd
  this.registrationForm = this.formBuilder.group({
    user_id: ['2',Validators.required],
    company_id:['',Validators.required],
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone_no:['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})')]],
    otp:['12345',Validators.required],
    is_verified:['1',Validators.required],
    is_approved:['1',Validators.required],
    is_active:['1',Validators.required],
    last_login:formattedDate,
    designation: ['admin',Validators.required],
    
  });

  this.verifyotpForm = this.formBuilder.group({
    UserId: ['23'],
    otp:['',Validators.required],
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
    !formValue.phone_no ||
    !formValue.company_id ||
    !formValue.password
  ) {
    alert('Fields should not be empty');
    return;
  }
  try {
    const response = this.registerservice.register(formValue).toPromise();
    alert('OTP Sent Successfully, Check Your Email');
    console.log(response);
    console.log(formValue);
  } catch (error) {
    console.log('Error registering:', error);
  }
}


private redirect(){

  
    this.router.navigate(['/sign-in'])
  

}

onverifyOtp(){
  const emailValue = this.registrationForm.value.email;
  console.log('Email value:', emailValue);
  
  const otp = this.verifyotpForm.value.otp;
  console.log('otp value:', otp);

  this.registerservice.getEmail(emailValue).subscribe(
    (response: Object) => {
      const RegisterResponse = response as RegisterResponse;
  
 
      this.user_data= RegisterResponse;
      const parseData = JSON.parse(this.user_data);
      console.log('parsed user user id' +  parseData.user.user_id)
      this.userId=parseData.user.user_id;
     this.Otp=otp;
              try {
                this.registerservice.verify(this.userId,this.Otp)
                .subscribe(
                  response => {
                    console.log('verified suhhhhhhhhhccessfully:', response.message);
               if(response.message=="OTP verified successfully"){
              debugger
                alert("Registration Successfull")
                this.redirect();
               }
               else{
                alert("Enter the valid OTP")
               }
                    // window.location.reload()
                  },
                  error => {
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
    (error) => {
      console.log("Error while retrieving", error);
      
    }
  );

}
// register(): void {
//   if (!this.firstName || !this.lastName||!this.email||!this.address||!this.phone_no||!this.company_id) {
//     alert('Fields should not be empty');
//     return;
//   }
// }
}
