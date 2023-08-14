import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { ApiService } from '../api.service';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private countUrl = 'AdsCount';
  private apiUrl = 'GetCompanyById';
   private UIdUrl = 'GetUserById';
  private userUrl = 'GetAllUser';
   private deleteUrl = 'DeleteUser'; 
   private usercountUrl = 'GetAllUserCount'; 
   
  constructor(private http: HttpClient,private apiService: ApiService) { }

  getUserDetails(user_id: number): Observable<any> {
    const url = this.apiService.getFullUrl(`GetUserDetails?userId=${user_id}`);
    return this.http.get(url);
  }
  GetAllCompany(): Observable<any> {
    const url = this.apiService.getFullUrl(`GetAllCompany`);
    return this.http.get(url);
  }
  getAdsCount(companyId: number): Observable<any> {
    const url = this.apiService.getFullUrl(`${this.countUrl}?company_id=${companyId}`);
    return this.http.get(url);
  }
  getCompanyById(company_id: number): Observable<any> {
    const url = this.apiService.getFullUrl(`${this.apiUrl}?companyId=${company_id}`);
    return this.http.get(url);
  }
  getallUser(companyid:number): Observable<any> {
    const url = this.apiService.getFullUrl(`${this.userUrl}/${companyid}`);
    return this.http.get(url);
  }
deleteUserById(id: number): Observable<any> {
  const url = this.apiService.getFullUrl(`${this.deleteUrl}/${id}`);
  return this.http.get(url);
}
  getUserById(id: number): Observable<any> {
    const url = this.apiService.getFullUrl(`${this.UIdUrl}/${id}`);
    return this.http.get(url);
  }
  getallUserCount(companyid:number):Observable<any> {
    const url = this.apiService.getFullUrl(`${this.usercountUrl}/${companyid}`);
    return this.http.get(url);
  }
}