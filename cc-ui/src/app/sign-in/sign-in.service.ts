
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
  })
  export class SignInService {
    private baseServerUrl='https://localhost:7157/Login';
 
  constructor(private http:HttpClient) {
    
  }

    login(loginForm: FormGroup<any>){
      const headers=new HttpHeaders().set('contentType','application/json; charset=UTF-8');
      return this.http.post(this.baseServerUrl,loginForm,{headers});
      
  
    }
  
  }