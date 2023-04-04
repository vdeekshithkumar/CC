
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
 
  constructor(private http:HttpClient) {
    
  }
    register(registrationForm: FormGroup<any>){
      const headers=new HttpHeaders().set('content-Type','application/json');
      return this.http.post(this.apiUrl,registrationForm,{headers});
      
    }
    getAllCompanies(): Observable<any> {
      return this.http.get('https://localhost:7157/GetAllCompany');
    }
    
  }
  // export class Registerservice {
  //   private apiUrl='https://localhost:7157/SaveUser';
 
  // constructor(private http:HttpClient) {
    
  // }
  // register(registrationForm: FormGroup<any>){
  //     const headers=new HttpHeaders().set('content-Type','application/json;charset=UTF-8');
  //     return this.http.post(this.apiUrl,registrationForm,{headers});
  //   }
  // }

