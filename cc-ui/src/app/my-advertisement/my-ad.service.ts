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
  port_of_ad:string;
}

@Injectable({
  providedIn: 'root'
})
export class MyAdService {
  private advUrl = 'GetAllAdvertisement';
  private deleteUrl = 'DeleteAd';
  private myadurl = 'GetMyAd';
  private negotiationcountUrl = 'GetNegotiationCount'; 
  private apiUrl = 'UserPermissions';
  private countUrl = 'AdsCount';
  private Url = 'GetCompanyById';
  private userUrl = 'GetAllUser';
  private adsUrl = 'GetAllAds';
  private myadsurl ='GetMyAds';
  private advertisementcount = 'MyadvertisementCount';
  constructor(private http: HttpClient,private apiService: ApiService) { }

  
  getPermissions(userId: number): Observable<any> {
    const url = this.apiService.getFullUrl(`${this.apiUrl}?user_id=${userId}`);
    return this.http.get(url);
  }
  getAdsCount(companyId: number): Observable<any> {
    const url = this.apiService.getFullUrl(`${this.countUrl}?company_id=${companyId}`);
    return this.http.get(url);
  }
  getContainercount(ad_type:string,companyId: number,): Observable<any> {
    const url = this.apiService.getFullUrl(`${this.advertisementcount}?ad_type=${ad_type}&companyId=${companyId}`);
    return this.http.get(url);
  }
  getSpaceAds(ad_type:string): Observable<any> {
    const url = this.apiService.getFullUrl(`${this.myadsurl}?ad_type=${ad_type}`);
    return this.http.get(url);
  }
  getContainerAds(ad_type:string): Observable<any> {
    const url = this.apiService.getFullUrl(`${this.myadsurl}?ad_type=${ad_type}`);
    return this.http.get(url);
  }
  updateAd(
    id: number, file: File, from_date: Date, expiry_date: number, type_of_ad: string,
    container_type_id: number, price: number, quantity: number, port_id: number,
    userId: number, companyId: number, contents: string, port_of_departure: string,
    port_of_arrival: string, free_days: number, per_diem: number, pickup_charges: number,
    operation: string
  ): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('from_date', (from_date || 0).toString());
    formData.append('expiry_date', (expiry_date || 0).toString());
    formData.append('type_of_ad', (type_of_ad || 'NA'));
    formData.append('container_type_id', container_type_id.toString());
    formData.append('price', (price || 0).toString());
    formData.append('quantity', (quantity || 0).toString());
    formData.append('port_id', port_id.toString());
    formData.append('posted_by', userId.toString());
    formData.append('company_id', companyId.toString());
    formData.append('contents', (contents || 'NA'));
    formData.append('port_of_departure', (port_of_departure || 'NA'));
    formData.append('port_of_arrival', (port_of_arrival || 'NA'));
    formData.append('free_days', (free_days || 0).toString());
    formData.append('per_diem', (per_diem || 0).toString());
    formData.append('pickup_charges', (pickup_charges || 0).toString());
    formData.append('operation', operation);

    const endpoint = `Edit/${id}`; // Endpoint without base URL
    const fullUrl = this.apiService.getFullUrl(endpoint);

    return this.http.put(fullUrl, formData);
  }

updateAdStatus(adId: number) {
  const url = this.apiService.getFullUrl(`Approve?adId=${adId}`);
  return this.http.put(url, null);
}
getCompanyById(company_id: number): Observable<any> {
  const endpoint = `GetCompanyById?companyId=${company_id}`; // Endpoint without base URL
  const fullUrl = this.apiService.getFullUrl(endpoint);
  return this.http.get(fullUrl);
}

getallUser(companyid:number): Observable<any> {
  const url = this.apiService.getFullUrl(`${this.userUrl}/${companyid}`);
  return this.http.get(url,{responseType:'json'});
}

getAdsById(company_id: number, operation: string,ad_type:string): Observable<Advertisement[]> {
  const url = this.apiService.getFullUrl(`${this.adsUrl}?companyId=${company_id}&operation=${operation}&ad_type=${ad_type}`);
  return this.http.get<Advertisement[]>(url);
}
deleteAd(AdId: number): Observable<any> {
  const url = this.apiService.getFullUrl(`${this.deleteUrl}?AdID=${AdId}`);
  return this.http.delete(url);
}
getNegotiationCount(adid:number):Observable<any> {
  const url = this.apiService.getFullUrl(`${this.negotiationcountUrl}/${adid}`);
  return this.http.get(url,{responseType:'json'});
}
getAdvertisement(ad_type:string,companyId:number): Observable<Advertisement[]> {
  const url = this.apiService.getFullUrl(`${this.advUrl}?ad_type=${ad_type}&companyId=${companyId}`);
  return this.http.get<Advertisement[]>(url);
}
getMyAd(ad_type:string,companyId:number): Observable<Advertisement[]> {
  const url = this.apiService.getFullUrl(`${this.myadurl}?ad_type=${ad_type}&companyId=${companyId}`);
  return this.http.get<Advertisement[]>(url);
}
}