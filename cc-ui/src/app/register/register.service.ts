
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

export interface Company {
  id: number;
  name: string;
}
@Injectable({
    providedIn: 'root'
    
  })
  export class Registerservice {
    private apiUrl='https://localhost:7157/SaveUser';
    private baseUrl='https://localhost:7157/VerifyOTP';
    private getUrl = 'https://localhost:7157/GetuserByEmail'
 
  constructor(private http:HttpClient) {
    
  }
    register(registrationForm: FormGroup<any>){
      const headers=new HttpHeaders().set('Content-Type','application/json');
      return this.http.post(this.apiUrl,registrationForm,{headers});
      
    }

    verify(registrationForm: FormGroup<any>){
      const headers=new HttpHeaders().set('Content-Type','application/json');
      return this.http.post(this.baseUrl,registrationForm,{headers});
      
    }

    getEmail(email:string): Observable<any> {
    
      return this.http.get(`${this.getUrl}/${email}`,{ responseType:'text' });
      
    }
    getAllCompanies(): Observable<any> {
      return this.http.get('https://localhost:7157/GetAllCompany');
    }
    
  }
