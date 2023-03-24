import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Country, State, City, ICity, ICountry }  from 'country-state-city';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  countryName:string="";
  phoneCode:string="";
  ngOnInit(): void {
  }

  getCities(){
    const countries = Country.getAllCountries();
    const country = countries.find(country => country.name === this.countryName);
    
    let iso= country?.isoCode|| '';
    this.phoneCode = country?.phonecode || '';
    const allCityDetails= City.getCitiesOfCountry(iso);
    return allCityDetails?.map((city)=>city.name);

  }

 
  getCountries(){
    const countries = Country.getAllCountries();
    const countryNames = countries.map((country) => country.name);

    // Find a specific country by name
    return countryNames;
  }
}

