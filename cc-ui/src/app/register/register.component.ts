
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
   company_name= "";
   company_list : any;

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


onverifyOtp(){

  const emailValue = this.registrationForm.value.email;
  console.log('Email value:', emailValue);

  this.registerservice.getEmail(emailValue).subscribe(
    (response: Object) => {
      const RegisterResponse = response as RegisterResponse;
  
      console.log("this is user retrhhhhhhhhhhhhhhhhhieved" + RegisterResponse);
      this.user_data= RegisterResponse;
      const parseData = JSON.parse(this.user_data);
      console.log('parsed user user data ' +  parseData.user.user_id)

   { this.verifyotpForm.setValue({
      UserId:parseData.user.user_id,
      otp:''
    });
  }

    },
    (error) => {
      console.log("Error while retrieving", error);
      
    }
  );

  
      
    
  
  
  


console.log(this.verifyotpForm.value)
// this.Email();
    
  try {
     
    const response = this.registerservice.verify(this.verifyotpForm.value).toPromise();
    console.log(response);
    // console.log(this.fetched_user_id);
    console.log(this.verifyotpForm.value)
    alert(" success verification ")

    // this.router.navigate(['/sign-in'], { queryParams: { registered: true }});

  } 
  catch (error) {
    console.log('Error registering:', error);

  }
}
}
