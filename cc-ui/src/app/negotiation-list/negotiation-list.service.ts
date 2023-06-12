




import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Advertisement {
  ad_id: number;
  date_created: Date;
  from_date: Date;
  expiry_date: Date;
  type_of_ad: string;
  container_type_id: number;
  price: number;
  status: string;
  quantity: number;
  port_id: number;
  company_id: number;
  posted_by: number;
  contents: string;
  file: string;
  port_of_departure: string;
  port_of_arrival: string;
  free_days: number;
  per_diem: number;
  pickup_charges: number;
}
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
  private  coUrl= 'https://localhost:7157/GetOtherCompany';
  private deleteUrl = 'https://localhost:7157/DeleteNegotiation';
  private acceptUrl = 'https://localhost:7157/AcceptNegotiation';
  baseUrl = 'https://localhost:7157';
  private apiUrl = 'https://localhost:7157/UserPermissions';
  private userUrl = 'https://localhost:7157/GetAllOtherUser';
  private NegotiationUrl = 'https://localhost:7157/GetAllNegotiations';
  private adsUrl = 'https://localhost:7157/GetAllAds';
  constructor(private http: HttpClient) { }

  getPermissions(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?user_id=${userId}`);
  }
  getAdvertisement(company_id: number,operation:string): Observable<Advertisement[]> {
    const url = `${this.adsUrl}?companyId=${company_id}&operation=${operation}`;
    return this.http.get<Advertisement[]>(url);
  }

  getallUser(companyid:number): Observable<any> {
    return this.http.get(`${this.userUrl}/${companyid}`,{responseType:'json'});
  }

 
  
getNegotiationsById(ad_id: number): Observable<any> {
  return this.http.get(`${this.NegotiationUrl}?ad_id=${ad_id}`);
}
getotherCompany(companyId: string): Observable<any> {
  return this.http.get(`${this.coUrl}?companyID=${companyId}`, { responseType: 'json' });
}
deleteNegotiation(negotiation_id: number): Observable<any> {

  return this.http.delete(`${this.deleteUrl}?negotiation_id=${negotiation_id}`);
}
AcceptNegotiation(negotiation_id: number): Observable<any> {
  return this.http.put(`${this.acceptUrl}?negotiation_id=${negotiation_id}`,null);
}

}