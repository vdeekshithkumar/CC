import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
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

  private  coUrl= 'GetOtherCompany';
  private deleteUrl = 'DeleteNegotiation';
  private acceptUrl = 'AcceptNegotiation';
  private apiUrl = 'UserPermissions';
  private userUrl = 'GetAllOtherUser';
  private NegotiationUrl = 'GetAllNegotiations';
  private adsUrl = 'GetAllAds';
  constructor(private http: HttpClient,private apiService: ApiService) { }


 
  getPermissions(userId: number): Observable<any> {
    const url = this.apiService.getFullUrl(`${this.apiUrl}?user_id=${userId}`);
    return this.http.get(url);
  }

  getAdvertisement(company_id: number,operation:string,ad_type:string): Observable<Advertisement[]> {
    const url = this.apiService.getFullUrl(`${this.adsUrl}?companyId=${company_id}&operation=${operation}&ad_type=${ad_type}`);
    return this.http.get<Advertisement[]>(url);
  }

  getallUser(companyid:number): Observable<any> {
    const url = this.apiService.getFullUrl(`${this.userUrl}/${companyid}`);
    return this.http.get(url,{responseType:'json'});
  }

getNegotiationsById(ad_id: number): Observable<any> {
  const url = this.apiService.getFullUrl(`${this.NegotiationUrl}?ad_id=${ad_id}`);
  return this.http.get(url);
}
getotherCompany(companyId: string): Observable<any> {
  const url = this.apiService.getFullUrl(`${this.coUrl}?companyID=${companyId}`);
  return this.http.get(url, { responseType: 'json' });
}
deleteNegotiation(negotiation_id: number): Observable<any> {
  const url = this.apiService.getFullUrl(`${this.deleteUrl}?negotiation_id=${negotiation_id}`);
  return this.http.delete(url);
}
AcceptNegotiation(negotiation_id: number): Observable<any> {
  const url = this.apiService.getFullUrl(`${this.acceptUrl}?negotiation_id=${negotiation_id}`);
  return this.http.put(url,null);
}

}