
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class SignInService {
    private baseServerUrl='https://container-conundrum-api.azurewebsites.net/Login';
    private otpApiUrl = 'https://container-conundrum-api.azurewebsites.net/SendOtp'; // Replace with your backend API endpoint

  constructor(private http:HttpClient) {
    
  }

    login(loginForm: FormGroup<any>){
      const headers=new HttpHeaders().set('contentType','application/json; charset=UTF-8');
      return this.http.post(this.baseServerUrl,loginForm,{headers});
      
  
    }
  
  
  // loginUser(loginUserData: { email: string; password: string; }){
  //   return this.http.post<any>(this.apiUrl,loginUserData)
  // }

  
  
  sendOtp(email: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  const payload = {
      email: email
    };
    const url = `${this.otpApiUrl}`;

    return this.http.post(url, payload, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
      
  }
  private handleError(error: any) {
    console.error('An error occurred ,', error);
    return throwError(error);
  }
  
  
  }