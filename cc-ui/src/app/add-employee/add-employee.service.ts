import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { User } from '../redundant/header/edit-user-details/edit-user-details.component';
import { ApiService } from '../api.service';


@Injectable({
  providedIn: 'root'
})
export class AddEmployeeServiceService {
  private apiUrl = 'SaveUser'
  private baseUrl = 'AddPermission'
  addPermissionForm: any;
  private editUrl = 'EditUserById'
  private baseEditUrl = 'EditPermission'
  private UIdUrl = 'GetUserById';
  constructor(private http:HttpClient,private apiService: ApiService) { }
  addPermission(ppList: any,emailValue:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

const payload = {
      ppList: ppList,
      emailValue: emailValue
    };

    const url = this.apiService.getFullUrl(`${this.baseUrl}`);

    return this.http.post(url, payload, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error);
  }
  addEmployee(addEmployeeForm: FormGroup<any>){
    const url = this.apiService.getFullUrl(`${this.apiUrl}`);
    const headers=new HttpHeaders().set('content-Type','application/json');
    return this.http.post(url,addEmployeeForm,{headers});
  }

  EditUser(id:number,addEmployeeForm:FormGroup<any>){
    debugger
    const url = this.apiService.getFullUrl(`${this.editUrl}/${id}`);
    const headers = new HttpHeaders().set('content-Type', 'application/json');
      return this.http.put(url,addEmployeeForm,{ headers });
  }
  EditPermission(ppList: any,user_id:number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
const payload = {
  ppList: ppList,
      user_id: user_id
    };
    const url =this.apiService.getFullUrl(`${this.baseEditUrl}/${user_id}`);

    return this.http.put(url, payload, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  getAllPermission(): Observable<Permissions[]> {
    const url = this.apiService.getFullUrl(`GetAllPermission`);
    return this.http.get<Permissions[]>(url);
  }

  getUserPermissions(user_id: number): Observable<Permissions[]> {
    const url = this.apiService.getFullUrl(`UserPermissions`);
    return this.http.get<Permissions[]>(url, {
      params: { user_id: user_id.toString() }
    });
  }

  getUserById(id: number): Observable<any> {
    const url = this.apiService.getFullUrl(`${this.UIdUrl}/${id}`);
    return this.http.get(url, { responseType: 'json' });
  }
}
  