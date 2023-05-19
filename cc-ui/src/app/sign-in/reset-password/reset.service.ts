import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmationResponse, PassWriteRes } from './ConfirmationResponse';

@Injectable({
  providedIn: 'root'
})
export class ResetService {
  baseUrl="https://localhost:7157"
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
