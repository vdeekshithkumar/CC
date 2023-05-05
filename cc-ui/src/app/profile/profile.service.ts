import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'https://localhost:7157/GetCompanyById';
   private UIdUrl = 'https://localhost:7157/GetUserById';
  private userUrl = 'https://localhost:7157/GetAllUser';
   private deleteUrl = 'https://localhost:7157/DeleteUser'; 
   private usercountUrl = 'https://localhost:7157/GetAllUserCount'; 
  constructor(private http: HttpClient) { }
  getUserDetails(user_id: number): Observable<any> {
    return this.http.get(`https://localhost:7157/GetUserDetails?userId=${user_id}`);
  }

  GetAllCompany(): Observable<any> {

    return this.http.get('https://localhost:7157/GetAllCompany')
  }
  getCompanyById(company_id: number): Observable<any> {
    console.log(`${this.apiUrl}?company_id=${company_id}`)
    return this.http.get(`${this.apiUrl}?companyId=${company_id}`);
  }
  getallUser(companyid:number): Observable<any> {
    return this.http.get(`${this.userUrl}/${companyid}`,{responseType:'json'});
  }
 deleteUserById(id: number): Observable<any> {
    return this.http.delete(`${this.deleteUrl}/${id}`, { responseType: 'text' });
  }
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.UIdUrl}/${id}`, { responseType: 'json' });
  }
  getallUserCount(companyid:number):Observable<any> {
    return this.http.get(`${this.usercountUrl}/${companyid}`,{responseType:'json'});
  }
}