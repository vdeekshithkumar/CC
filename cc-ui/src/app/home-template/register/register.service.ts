
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, throwError } from 'rxjs';

export interface Company {
  id: number;
  name: string;
}
@Injectable({
    providedIn: 'root'
    
  })
  export class Registerservice {
    private apiUrl='https://container-conundrum-api.azurewebsites.net/SaveUser';
    private baseUrl='https://container-conundrum-api.azurewebsites.net/VerifyOTP';
    private getUrl = 'https://container-conundrum-api.azurewebsites.net/GetuserByEmail'
 
  constructor(private http:HttpClient) {
    
  }
    register(registrationForm: FormGroup<any>){
      const headers=new HttpHeaders().set('Content-Type','application/json');
      return this.http.post(this.apiUrl,registrationForm,{headers});
      
    }

    

    verify(userId:number,otp:number): Observable<any> {
      debugger
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
    getAllCompanies(): Observable<any> {
      return this.http.get('https://container-conundrum-api.azurewebsites.net/GetAllCompany');
    }
    
  }
