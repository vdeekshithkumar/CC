import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators"; 
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
    private apiUrl='https://localhost:7157/GetCompanyById';
  constructor(private http:HttpClient) { }
//  
  GetAllCompany():Observable<any>{
 
    return this.http.get('https://localhost:7157/GetAllCompany')
    // .pipe(map(res => res.json()));
  }
  getCompanyById(company_id:number):Observable<any>{
    console.log(`${this.apiUrl}?company_id=${company_id}`)
    return this.http.get(`${this.apiUrl}?companyId=${company_id}`);
 }
getallUser():Observable<any>{
    return this.http.get('https://localhost:7157/GetAllUser')
}
}
