
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiService } from 'src/app/api.service';

export interface Company {
  id: number;
  name: string;
}
@Injectable({
    providedIn: 'root'
    
  })
  export class Registerservice {
    private apiUrl='SaveUser';
    private getUrl = 'GetuserByEmail'
 
  constructor(private http:HttpClient,private apiService: ApiService) {
    
  }
    register(registrationForm: FormGroup<any>){
      const url = this.apiService.getFullUrl(this.apiUrl);
      const headers=new HttpHeaders().set('Content-Type','application/json; charset=UTF-8');
      return this.http.post(url,registrationForm,{headers});
      
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
    getAllCompanies(): Observable<any> {
      const url = this.apiService.getFullUrl(`GetAllCompany`);
      return this.http.get(url);
    }
    
  }
