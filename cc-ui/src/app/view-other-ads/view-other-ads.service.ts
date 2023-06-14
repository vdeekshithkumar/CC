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

 

@Injectable({
  providedIn: 'root'
})
export class ViewOtherAdsService {
  private advUrl = 'https://localhost:7157/GetAllAdvertisement';
  private  coUrl= 'https://localhost:7157/GetOtherCompany';
  private  nUrl= 'https://localhost:7157/GetAllNegotiation';
  private  startNUrl= 'https://localhost:7157/StartNegotiation';
 
  constructor(private http:HttpClient) { }

 

  getallnegotiation(companyId: string): Observable<any> {
    return this.http.get(`${this.nUrl}?companyID=${companyId}`, { responseType: 'json' });
  }

  getAdvertisement(company_id: number): Observable<Advertisement[]> {
    const url = `${this.advUrl}?companyId=${company_id}`;
    return this.http.get<Advertisement[]>(url);
  }
  getotherCompany(companyId: string): Observable<any> {
    return this.http.get(`${this.coUrl}?companyID=${companyId}`, { responseType: 'json' });
  }

 
  getAllContainers(): Observable<any> {
    return this.http.get('https://localhost:7157/GetAllContainers');
  }

  StartNegotiation(ad_id: number,company_id: number, user_id: number): Observable<any> {
    const url = `${this.startNUrl}?ad_id=${ad_id}&company_id=${company_id}&user_id=${user_id}`;
    return this.http.post(url,null);
  }
}