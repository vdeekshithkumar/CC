import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
    
  })
  export class OtpService {
    private apiUrl='https://container-conundrum-api.azurewebsites.net/SaveUser';
    private baseUrl='https://container-conundrum-api.azurewebsites.net/VerifyOTP';
    private getUrl = 'https://container-conundrum-api.azurewebsites.net/GetuserByEmail'
 
  constructor(private http:HttpClient) {
    
  }

    

    verify(userId:number,otp:number): Observable<any> {
 
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
    const payload = {
        userId: userId,
        otp:otp
      };
      const url = `${this.baseUrl}`;
  
      return this.http.post(url, payload, httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    }
    private handleError(error: any) {
      console.error('An error occurred ,', error);
      return throwError(error);
    }


    getEmail(email:string): Observable<any> {
    
      return this.http.get(`${this.getUrl}/${email}`,{ responseType:'text' });
      
    }
   
    
  }