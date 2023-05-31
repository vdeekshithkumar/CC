




import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Negotiation{
  negotiation_id: number;
  user_id:number;
  ad_id:number;
  price:number;
  negotiation_type:string;
  container_type:string;
  quantity: number;
  status: string;
  company_id:number;
  contract_id:any;
  date_created:Date;
  expiry_date:Date;
  updated_by:number;
}


@Injectable({
  providedIn: 'root'
})
export class NegotiationsService {
  private  coUrl= 'https://localhost:7157/GetOtherCompany';
  private userUrl = 'https://localhost:7157/GetAllOtherUser';
  private apiUrl = 'https://localhost:7157/UserPermissions';
  private NegotiationUrl = 'https://localhost:7157/GetMyNegotiations';
  constructor(private http: HttpClient) { }

  getPermissions(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?user_id=${userId}`);
  }
 

  getNegotiationsByCId(company_id: number): Observable<any> {
    debugger
    return this.http.get(`${this.NegotiationUrl}?company_id=${company_id}`);
  }
  

getotherCompany(companyId: string): Observable<any> {
  return this.http.get(`${this.coUrl}?companyID=${companyId}`, { responseType: 'json' });
}


}