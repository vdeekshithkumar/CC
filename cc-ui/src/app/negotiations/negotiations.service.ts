
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


@Injectable({
  providedIn: 'root'
})
export class NegotiationsService {
  private  coUrl= 'https://localhost:7157/GetOtherCompany';
  private  nUrl= 'https://localhost:7157/GetAllNegotiation';
  private userUrl = 'https://localhost:7157/GetAllCompanyUser';
  private apiUrl = 'https://localhost:7157/UserPermissions';
  private NegotiationUrl = 'https://localhost:7157/GetMyNegotiations';
  private advUrl = 'https://localhost:7157/GetAllAdvertisementbytype';

  constructor(private http: HttpClient) { }

  getPermissions(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?user_id=${userId}`);
  }
 getallUser(companyid:number): Observable<any> {
    return this.http.get(`${this.userUrl}/${companyid}`,{responseType:'json'});
  }
  getAdvertisementbytype(ad_type:string,company_id: number): Observable<Advertisement[]> {
    const url = `${this.advUrl}?ad_type=${ad_type}&companyId=${company_id}`;
    return this.http.get<Advertisement[]>(url);
  }
  getNegotiationsByCId(company_id: number): Observable<any> {
    debugger
    return this.http.get(`${this.NegotiationUrl}?company_id=${company_id}`);
  }
  

getotherCompany(companyId: string): Observable<any> {
  return this.http.get(`${this.coUrl}?companyID=${companyId}`, { responseType: 'json' });
}

getallnegotiation(companyId: string): Observable<any> {
  return this.http.get(`${this.nUrl}?companyID=${companyId}`, { responseType: 'json' });
}

}
