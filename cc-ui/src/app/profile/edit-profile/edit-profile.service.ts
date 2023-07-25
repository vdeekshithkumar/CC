import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EditProfileService {
 
  private apiUrl='https://container-conundrum-api.azurewebsites.net/UpdateCompany';
  constructor(private http:HttpClient) { }
  edit(editprofileForm: FormGroup<any>)
  {
    const headers=new HttpHeaders().set('contentType','application/json; charset=UTF-8');
    return this.http.post(this.apiUrl,editprofileForm,{headers});
  }
  GetAllCompany():Observable<any>{
  
    return this.http.get('https://container-conundrum-api.azurewebsites.net/GetAllCompany')
    // .pipe(map(res => res.json()));
  }
  getCompanyById(company_id:number):Observable<any>{
    return this.http.get('https://container-conundrum-api.azurewebsites.net/GetCompanyById',{params:{'companyId':company_id}})
  }
 updatecompany(id:number,editprofileForm: FormGroup<any>){
  debugger;
  const headers=new HttpHeaders().set('ContentType','application/json');
 
  return this.http.put(`${this.apiUrl}/${id}`,editprofileForm,{headers});
 }
}


