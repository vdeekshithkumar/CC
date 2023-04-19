import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'https://localhost:7157/GetCompanyById';
  constructor(private http: HttpClient) { }
  getUserDetails(user_id: number): Observable<any> {
    return this.http.get(`https://localhost:7157/GetUserDetails?userId=${user_id}`);
  }

  GetAllCompany(): Observable<any> {

    return this.http.get('https://localhost:7157/GetAllCompany')
  }
  getCompanyById(company_id: number): Observable<any> {

    // return this.http.get('https://localhost:7157/GetCompanyById',{params:{'company_id':company_id}})
    // return this.http.get('https://localhost:7157/GetCompanyById${company_id}')
    console.log(`${this.apiUrl}?company_id=${company_id}`)
    return this.http.get(`${this.apiUrl}?companyId=${company_id}`);
  }
  getallUser(): Observable<any> {
    return this.http.get('https://localhost:7157/GetAllUser')
  }
}