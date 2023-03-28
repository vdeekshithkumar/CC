import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {
  private apiUrl='https://localhost:7157/SaveCompany';
  constructor(private http:HttpClient) { }
  edit(editprofileForm: FormGroup<any>)
  {
    const headers=new HttpHeaders().set('contentType','application/json; charset=UTF-8');
    return this.http.post(this.apiUrl,editprofileForm,{headers});

  }
}