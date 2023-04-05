import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AddEmployeeServiceService {
  private apiUrl = 'https://localhost:7157/SaveUser'
  private baseUrl = 'https://localhost:7157/AddPermission'

  constructor(private http:HttpClient) { }

  addEmployee(addEmployeeForm: FormGroup<any>){
    const headers=new HttpHeaders().set('content-Type','application/json');
    return this.http.post(this.apiUrl,addEmployeeForm,{headers});


    
  }

  addPermission(addPermissionForm: FormGroup<any>){
    const headers=new HttpHeaders().set('content-Type','application/json');
    return this.http.post(this.baseUrl,addPermissionForm,{headers});
}
}