
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
  })
  export class Registerservice {
    private apiUrl='https://localhost:7157/SaveUser';
 
  constructor(private http:HttpClient) {
    
  }
    register(registrationForm: FormGroup<any>){
      const headers=new HttpHeaders().set('Content-Type','application/json');
      return this.http.post(this.apiUrl,registrationForm,{headers});
      
    }
  }
