
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
    providedIn: 'root'
  })
  export class SignInService {

    private apiUrl='Login';
    private otpApiUrl = 'SendOtp'; // Replace with your backend API endpoint


  constructor(private http:HttpClient,private apiService: ApiService) {
    
  }
    login(loginForm: FormGroup<any>){
      const url = this.apiService.getFullUrl(this.apiUrl);
      const headers=new HttpHeaders().set('contentType','application/json; charset=UTF-8');
      return this.http.post(url,loginForm,{headers});
    }
  sendOtp(email: string): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json' })};
  const payload = { email: email};
  const url = this.apiService.getFullUrl(this.otpApiUrl);
   return this.http.post(url, payload, httpOptions).pipe(catchError(this.handleError));
    }

  private handleError(error: any) {
    console.error('An error occurred ,', error);
    return throwError(error);
  }
  
  
  }