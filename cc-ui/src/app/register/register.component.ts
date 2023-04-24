
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
  r: any;

  constructor(private formBuilder: FormBuilder,private router:Router,private registerservice:Registerservice) {
  }

ngOnInit(): void {

  const now = new Date();
    const formattedDate = now.toISOString().split('T')[0]; // get date in format yyyy-mm-dd
  this.registrationForm = this.formBuilder.group({
    user_id: ['2',Validators.required],
    company_id:['',Validators.required],
    fname: ['fanbns', Validators.required],
    lname: ['oo', Validators.required],
    address: ['fgc', Validators.required],
    email: ['', Validators.required],
    phone_no:['9875446788', Validators.required],
    password: ['tfhgff', Validators.required],
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

 onSubmit() {
    {
      try {
        const response = this.registerservice.register(this.registrationForm.value).toPromise();
        alert("OTP Sent Successfully, Check Your Email")
        console.log(response);
        console.log(this.registrationForm.value)

        // console.log("This is the fetched user_d",this.fetched_user_id);
        //       alert("User added success verification pending")
        // this.router.navigate(['/sign-in'], { queryParams: { registered: true }});
      } 
      catch (error) {
        console.log('Error registering:', error);
      
      }
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
}
