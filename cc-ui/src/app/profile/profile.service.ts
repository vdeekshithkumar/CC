import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private countUrl = 'https://container-conundrum-api.azurewebsites.net/AdsCount';
  private apiUrl = 'https://container-conundrum-api.azurewebsites.net/GetCompanyById';
   private UIdUrl = 'https://container-conundrum-api.azurewebsites.net/GetUserById';
  private userUrl = 'https://container-conundrum-api.azurewebsites.net/GetAllUser';
   private deleteUrl = 'https://container-conundrum-api.azurewebsites.net/DeleteUser'; 
   private usercountUrl = 'https://container-conundrum-api.azurewebsites.net/GetAllUserCount'; 
  constructor(private http: HttpClient) { }
  getUserDetails(user_id: number): Observable<any> {
    return this.http.get(`https://container-conundrum-api.azurewebsites.net/GetUserDetails?userId=${user_id}`);
  }

  GetAllCompany(): Observable<any> {

    return this.http.get('https://container-conundrum-api.azurewebsites.net/GetAllCompany')
  }
  getAdsCount(companyId: number): Observable<any> {
    return this.http.get(`${this.countUrl}?company_id=${companyId}`);
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