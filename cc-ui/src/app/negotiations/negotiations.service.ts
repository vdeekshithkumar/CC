
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

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
  private  coUrl= 'GetOtherCompany';
  private  nUrl= 'GetAllNegotiation';
  private userUrl = 'GetAllCompanyUser';
  private apiUrl = 'UserPermissions';
  private NegotiationUrl = 'GetMyNegotiations';
  private advUrl = 'GetAllAdvertisementbytype';
  private countUrl = 'GetMyNegotiationsCount';
  private cid='GetCompanyById?companyId'
  private negcountUrl = 'GetMyNegotiationsCount'
  selectedConversation:any;
  constructor(private http: HttpClient,private apiService: ApiService) { }

  getallnegotiation(companyId: string): Observable<any> {
    const url = this.apiService.getFullUrl(`${this.nUrl}?companyID=${companyId}`);
    return this.http.get(url, { responseType: 'json' });
  }
  getPermissions(userId: number): Observable<any> {
    const url = this.apiService.getFullUrl(`${this.apiUrl}?user_id=${userId}`);
    return this.http.get(url);
  }
 getallUser(companyid:number): Observable<any> {
  const url = this.apiService.getFullUrl(`${this.userUrl}/${companyid}`);
    return this.http.get(url,{responseType:'json'});
  }
  getAdvertisementbytype(ad_type:string,company_id: number): Observable<Advertisement[]> {
    const url = this.apiService.getFullUrl(`${this.advUrl}?ad_type=${ad_type}&companyId=${company_id}`);
    return this.http.get<Advertisement[]>(url);
  }
  getNegotiationsByCId(company_id: number): Observable<any> {
    debugger
    const url = this.apiService.getFullUrl(`${this.NegotiationUrl}?company_id=${company_id}`);
    return this.http.get(url);
  }
  getcompanybycid(companyId: string): Observable<any> {
    const url = this.apiService.getFullUrl(`${this.cid}?companyID=${companyId}`);
    return this.http.get(url, { responseType: 'json' });
  }
  
  getNegotiationsByCount(company_id: number): Observable<any> {
    const url = this.apiService.getFullUrl(`${this.countUrl}?company_id=${company_id}`);
    return this.http.get(url);
  }
getotherCompany(companyId: string): Observable<any> {
  const url = this.apiService.getFullUrl(`${this.coUrl}?companyID=${companyId}`);
  return this.http.get(url, { responseType: 'json' }); 
}

getnegotiationcount(companyId: string): Observable<any> {
  const url = this.apiService.getFullUrl(`${this.negcountUrl}?companyID=${companyId}`);
  return this.http.get(url, { responseType: 'json' });
}
}
