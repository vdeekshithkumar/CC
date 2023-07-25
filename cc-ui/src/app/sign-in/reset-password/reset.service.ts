import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmationResponse, PassWriteRes } from './ConfirmationResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetService {
  [x: string]: any;
  baseUrl="https://container-conundrum-api.azurewebsites.net";
 
  private showemailinput = false;
  private userID?:number
  private companyID?:number

  constructor(private http:HttpClient) { }

  public setShowEmailInput(value: boolean): void {
    this.showemailinput = value;
  }
  public getShowEmailInput(): boolean {
    return this.showemailinput;
  }

  public setUid(uid:number): void {
    this.userID = uid;
  }
  public getUid() {
    return this.userID;
  }

  public setCid(cid:number): void {
    this.companyID = cid;
  }
  public getCid() {
    return this.companyID;
  }

  resetPassword(userId: number, password: string): Observable<any> {
    const url = `${this.baseUrl}/reset-password`;
    const body = { userId, password };
    return this.http.post<any>(url, body);
  }
  

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
