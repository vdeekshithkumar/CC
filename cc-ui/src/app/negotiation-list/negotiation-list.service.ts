




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
export class NegotiationListService {
  private deleteUrl = 'https://localhost:7157/DeleteNegotiation';
  baseUrl = 'https://localhost:7157';
  private apiUrl = 'https://localhost:7157/UserPermissions';
  private NegotiationUrl = 'https://localhost:7157/GetAllNegotiations';
  constructor(private http: HttpClient) { }

  getPermissions(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?user_id=${userId}`);
  }
 

 
getNegotiationsById(ad_id: number): Observable<any> {
  return this.http.get(`${this.NegotiationUrl}?ad_id=${ad_id}`);
}

deleteNegotiation(negotiation_id: number): Observable<any> {

  return this.http.delete(`${this.deleteUrl}?negotiation_id=${negotiation_id}`);
}

}