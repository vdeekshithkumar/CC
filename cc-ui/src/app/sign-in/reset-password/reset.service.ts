import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfirmationResponse, PassWriteRes } from './ConfirmationResponse';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  [x: string]: any; 

  private showemailinput = false;
  private userID?:number
  private companyID?:number

  constructor(private http:HttpClient,private apiService: ApiService) { }

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
    const endpoint = 'reset-password'; // Endpoint without base URL
    const url = this.apiService.getFullUrl(endpoint);
    const body = { userId, password };
    return this.http.post<any>(url, body);
  }
  confirmation(email: string): Observable<ConfirmationResponse> {
    const endpoint = `GetUserByEmail/${email}`; // Endpoint without base URL
    const fullUrl = this.apiService.getFullUrl(endpoint);
    return this.http.get<ConfirmationResponse>(fullUrl);
  }
  updatePassword(user_id: number, company_id: number, password: string): Observable<PassWriteRes> {
    const endpoint = 'UpdatePassword'; // Endpoint without base URL
    const fullUrl = this.apiService.getFullUrl(endpoint);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { user_id, company_id, password };
    return this.http.put<PassWriteRes>(fullUrl, body, { headers });
  }
}
