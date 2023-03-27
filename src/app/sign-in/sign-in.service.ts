
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
  })
  export class SignInService {
    private baseServerUrl='https://localhost:7157/User/Login';
 
  constructor(private http:HttpClient) {
    
  }
    login(loginForm: FormGroup<any>){
      const headers=new HttpHeaders().set('Content-Type','application/x-www-urlencoded');
      return this.http.post(this.baseServerUrl,loginForm,{headers});
      
    // }
    // login(logininfo:Array<string>){
    //     return this.http.post(
    //         this.baseServerUrl,
    //         {
    //             Email:logininfo[0],
    //             Password:logininfo[1],
    //         },
    //         {
    //             responseType:'text',
    //         }
    //     );
    }
  
  }