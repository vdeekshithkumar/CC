import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators"; 
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
//   private apiUrl='https://localhost:7157/GetCompany';
  constructor(private http:HttpClient) { }
//   edit(editprofileForm: FormGroup<any>)
//   {
//     const headers=new HttpHeaders().set('contentType','application/json; charset=UTF-8');
//     return this.http.post(this.apiUrl,editprofileForm,{headers});
    
//   }
  GetAllCompany():Observable<any>{
    // const headers=new HttpHeaders().set('contentType','application/json; charset=UTF-8');
    // return this.http.get(this.apiUrl);
    // return this.http.get(this.apiUrl)  
    //  .map((response: Response) => response.json())  
    // .catch(this.errorHandler);  
    return this.http.get('https://localhost:7157/GetAllCompany')
    // .pipe(map(res => res.json()));
  }
  getCompanyById(company_id:number):Observable<any>{
    
    // return this.http.get('https://localhost:7157/GetCompanyById',{params:{'company_id':company_id}})
    return this.http.get('https://localhost:7157/GetCompanyById${company_id}')
 }
getallUser():Observable<any>{
    return this.http.get('https://localhost:7157/GetAllUser')
}
}
