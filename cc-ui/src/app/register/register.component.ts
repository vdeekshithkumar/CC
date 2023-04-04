
import { Component,Inject  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { Registerservice } from './register.service';
import { Country, State, City } from 'country-state-city';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm!: FormGroup;
  form: any;
  company_name="";
  company_list :any;
  
  constructor(private formBuilder: FormBuilder,private router:Router,private registerservice:Registerservice) {

    
}
ngOnInit(): void {
  this.registrationForm = this.formBuilder.group({
    user_id: ['2',Validators.required],
    company_id:['1',Validators.required],
    fname: ['fanbns', Validators.required],
    lname: ['oo', Validators.required],
    address: ['fgc', Validators.required],
    email: ['ffgdgd', Validators.required],
    phone_no:['9875446788', Validators.required],
    password: ['tfhgff', Validators.required],
    is_verified:['1',Validators.required],
    is_approved:['0',Validators.required],
    is_active:['1',Validators.required],
    last_login:['2023-07-15',Validators.required],
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
//  get f(){
//     return this.form.controls;
// //  }
//  getCities(){
//   const countries = Country.getAllCountries();
//   const country = countries.find((country: { name: string; }) => country.name === this.countryName);

//   let iso= country?.isoCode|| '';
//   this.phoneCode = country?.phonecode || '';
//   const allCityDetails= City.getCitiesOfCountry(iso);
//   return allCityDetails?.map((city: { name: any; })=>city.name);

// }


// getCountries(){
//   const countries = Country.getAllCountries();
//   const countryNames = countries.map((country: { name: any; }) => country.name);

//   // Find a specific country by name
//   return countryNames;
// }

 onSubmit() {

  //  if(this.registrationForm.valid){
  //   this.router.navigate(['/sign-in'])
  //   console.log(this.registrationForm.value); 
  // }
  // else {
  //   alert('User form is not valid!!')
  // }
//  this.registerservice.register(this.registrationForm).subscribe(
//   (response)=>console.log(response),
//   (error)=>console.warn(console.log(error))
//   );

  // this.registerservice.register(this.registrationForm.value).subscribe(
  //   (response)=>{
  //     console.log(response);
  //     console.log(this.registrationForm.value);
  //     this.router.navigate(['/sign-in'])
  //   },
  //   (error)=>{
  //     console.log('error',error);
  //   }
  //   );



    {
      try {
        const response = this.registerservice.register(this.registrationForm.value).toPromise();
        console.log(response);
        console.log(this.registrationForm.value)
        this.router.navigate(['/sign-in']);
      } 
      catch (error) {
        console.log('Error registering:', error);
      }
    }

}
}
