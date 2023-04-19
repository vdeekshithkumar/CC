import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmationResponse, PassWriteRes } from './ConfirmationResponse';

@Injectable({
  providedIn: 'root'
})
export class ResetService {
  baseUrl="https://localhost:7157"
  constructor(private http:HttpClient) { }
  confirmation(email:string){
    const url = `${this.baseUrl}/GetUserByEmail/${email}`;
    return this.http.get<ConfirmationResponse>(url);
  }
  updatePassword (user_id:number, company_id: number, password: string)
  {
    debugger
    const headers=new HttpHeaders().set('ContentType','application/json');

    const body = { user_id, company_id, password };
    return this.http.put<PassWriteRes>(`${this.baseUrl}/UpdatePassword`, body,{headers});
  }
}