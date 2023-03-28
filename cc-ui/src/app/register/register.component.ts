
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
   countryName: string='';
  phoneCode:string="";
  constructor(private formBuilder: FormBuilder,private router:Router,private registerservice:Registerservice) {

}
ngOnInit(): void {
  this.registrationForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
     country:['', Validators.required],
     city:['',Validators.required],
  email: ['',[Validators.email]],
   phoneNumber:['',[Validators.required]],
    companyName:['',[Validators.required]],
    password: ['', [Validators.minLength(5),Validators.maxLength(15)]],
  });
}
//  get f(){
//     return this.form.controls;
//  }
 getCities(){
  const countries = Country.getAllCountries();
  const country = countries.find((country: { name: string; }) => country.name === this.countryName);

  let iso= country?.isoCode|| '';
  this.phoneCode = country?.phonecode || '';
  const allCityDetails= City.getCitiesOfCountry(iso);
  return allCityDetails?.map((city: { name: any; })=>city.name);

}


getCountries(){
  const countries = Country.getAllCountries();
  const countryNames = countries.map((country: { name: any; }) => country.name);

  // Find a specific country by name
  return countryNames;
}
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
  this.registerservice.register(this.registrationForm.value).subscribe(
    (response)=>{
      console.log(response);
      this.router.navigate(['/sign-in'])
    },
    (error)=>{
      console.log('error',error);
    }
    );

}
}
