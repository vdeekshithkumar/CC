
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { User } from '../redundant/header/edit-user-details/edit-user-details.component';


@Injectable({
  providedIn: 'root'
})
export class AddEmployeeServiceService {
  private apiUrl = 'https://container-conundrum-api.azurewebsites.net/SaveUser'
  private baseUrl = 'https://container-conundrum-api.azurewebsites.net/AddPermission'
  addPermissionForm: any;
  private editUrl = 'https://container-conundrum-api.azurewebsites.net/EditUserById'
  private baseEditUrl = 'https://container-conundrum-api.azurewebsites.net/EditPermission'
  private UIdUrl = 'https://container-conundrum-api.azurewebsites.net/GetUserById';
  constructor(private http:HttpClient) { }
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

    const url = `${this.baseUrl}`;

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
    const headers=new HttpHeaders().set('content-Type','application/json');
    return this.http.post(this.apiUrl,addEmployeeForm,{headers});

  }

  EditUser(id:number,addEmployeeForm:FormGroup<any>){
    debugger
    const headers = new HttpHeaders().set('content-Type', 'application/json');
  
      return this.http.put(`${this.editUrl}/${id}`,addEmployeeForm,{ headers });
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
    const url =`${this.baseEditUrl}/${user_id}`;

    return this.http.put(url, payload, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  getAllPermission(): Observable<Permissions[]> {
    return this.http.get<Permissions[]>('https://container-conundrum-api.azurewebsites.net/GetAllPermission');
  }
  getUserPermissions(user_id: number): Observable<Permissions[]> {
    return this.http.get<Permissions[]>('https://container-conundrum-api.azurewebsites.net/UserPermissions', {
      params: { user_id: user_id.toString() }
    });
  }
  
  
  
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.UIdUrl}/${id}`, { responseType: 'json' });
  }
}
