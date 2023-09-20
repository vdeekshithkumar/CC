import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';


@Injectable({
  providedIn: 'root'
})
export class EditProfileService {
 

  private apiUrl='UpdateCompany';
  private countUrl='GetCompanyById';
  constructor(private http:HttpClient,private apiService: ApiService) { }
 
  edit(editprofileForm: FormGroup<any>): Observable<any> {
    const url = this.apiService.getFullUrl(this.apiUrl);
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');
    return this.http.post(url, editprofileForm, { headers });
  }
 
  GetAllCompany(): Observable<any> {
    const url = this.apiService.getFullUrl(`GetAllCompany`);
    return this.http.get(url);

  }
 
  getCompanyById(company_id:number):Observable<any>{

    const url = this.apiService.getFullUrl(`${this.countUrl}?companyId':company_id}`);
    return this.http.get(url);

  }

 updatecompany(id: number, editprofileForm: FormGroup<any>): Observable<any> {
  const fullUrl = this.apiService.getFullUrl(`${this.apiUrl}/${id}`);
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.http.put(fullUrl, editprofileForm, { headers });
}
}


