import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable({
    providedIn: 'root'
    
  })
  export class OtpService {
    private apiUrl='https://localhost:7157/SaveUser';
    private baseUrl='https://localhost:7157/VerifyOTP';
    private getUrl = 'https://localhost:7157/GetuserByEmail'
 
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