
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { User } from '../redundant/header/edit-user-details/edit-user-details.component';


@Injectable({
  providedIn: 'root'
})
export class AddEmployeeServiceService {
  private apiUrl = 'https://localhost:7157/SaveUser'
  private baseUrl = 'https://localhost:7157/AddPermission'
  addPermissionForm: any;
  private editUrl = 'https://localhost:7157/EditUserById'
  private baseEditUrl = 'https://localhost:7157/EditPermission'
  private UIdUrl = 'https://localhost:7157/GetUserById';
  constructor(private http:HttpClient) { }
  addPermission(selectedPermissions: any,emailValue:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

const payload = {
      ppList: selectedPermissions,
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
    return this.http.get<Permissions[]>('https://localhost:7157/GetAllPermission');
  }
  getUserPermissions(user_id: number): Observable<Permissions[]> {
    return this.http.get<Permissions[]>('https://localhost:7157/UserPermissions', {
      params: { user_id: user_id.toString() }
    });
  }
  
  
  
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.UIdUrl}/${id}`, { responseType: 'json' });
  }
}
