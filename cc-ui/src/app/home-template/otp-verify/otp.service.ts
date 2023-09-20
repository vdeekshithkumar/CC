import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiService } from 'src/app/api.service';


@Injectable({
    providedIn: 'root'
    
  })
  export class OtpService {

    private getUrl = 'GetuserByEmail'


  constructor(private http:HttpClient,private apiService: ApiService) { 
  }
    verify(userId: number, otp: number): Observable<any> {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      const payload = { userId: userId, otp: otp };
      const fullUrl = this.apiService.getFullUrl(`VerifyOTP`);
      return this.http.post(fullUrl, payload, httpOptions).pipe(catchError(this.handleError));
    }
    private handleError(error: any) {
      console.error('An error occurred ,', error);
      return throwError(error);
    }
    getEmail(email:string): Observable<any> {
      const url = this.apiService.getFullUrl(`${this.getUrl}/${email}`);
      return this.http.get(url,{ responseType:'text' });
      
    }
    
  }