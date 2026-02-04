import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiService } from 'src/app/api.service';


export interface Advertisement {
  ad_id: number;
  date_created: Date;
  from_date: Date;
  expiry_date: Date;
  type_of_ad: string;
  container_type_id: number;
  container_type: string;
  container_size: number;
  price: number;
  status: string;
  quantity: number;
  port_id: number;
  company_id: number;
  posted_by: number;
  contents: string;
  file: string;
  port_of_ad: string;
  port_of_departure: string;
  port_of_arrival: string;
  free_days: number;
  per_diem: number;
  pickup_charges: number;
  ad_type: string;
}
export interface Port {
  id: number;
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class PostAdService {

  private BASE_URL = 'ExcelUploadAd';
  private ad_Url = 'GetAd';
  constructor(private http: HttpClient, private apiService: ApiService) { }


  uploadFile(file: File, from_date: Date, expiry_date: number, type_of_ad: string, container_type: string, size: number, price: number, quantity: number, port_id: number, userId: number, companyId: number, contents: string, port_of_departure: string, port_of_arrival: string, free_days: number, per_diem: number, pickup_charges: number, operation: string, port_of_ad: string, ad_type: string) {
    if (operation == "PostAd") {

      const formData = new FormData();
      formData.append('file', file);



      formData.append('from_date', (from_date || 0).toString());
      formData.append('expiry_date', (expiry_date || 0).toString());
      formData.append('type_of_ad', (type_of_ad || 'NA'));
      formData.append('container_type', container_type || 'NA');
      formData.append('container_size', (size || 0).toString());
      formData.append('price', (price || 0).toString());
      formData.append('quantity', (quantity || 0).toString());
      formData.append('port_id', (port_id || 0).toString());
      formData.append('posted_by', userId.toString());
      formData.append('company_id', companyId.toString());
      formData.append('contents', (contents || 'NA'));
      formData.append('port_of_departure', (port_of_departure || 'NA'));
      formData.append('port_of_arrival', (port_of_arrival || 'NA'));
      formData.append('free_days', (free_days || 0).toString());
      formData.append('per_diem', (per_diem || 0).toString());
      formData.append('pickup_charges', (pickup_charges || 0).toString());
      formData.append('operation', operation);
      formData.append('port_of_ad', (port_of_ad || 'NA'));
      formData.append('ad_type', (ad_type || 'NA'));
      const endpoint = `PostAd`; // Endpoint without base URL
      const fullUrl = this.apiService.getFullUrl(endpoint);
      return this.http.post(fullUrl, formData);


    } else {

      const formData = new FormData();
      formData.append('file', file);

      formData.append('from_date', (from_date || 0).toString());
      formData.append('expiry_date', (expiry_date || 0).toString());
      formData.append('type_of_ad', (type_of_ad || 'NA'));
      formData.append('container_type', container_type || 'NA');
      formData.append('container_size', (size || 0).toString());
      formData.append('price', (price || 0).toString());
      formData.append('quantity', (quantity || 0).toString());
      formData.append('port_id', (port_id || 0).toString());
      formData.append('posted_by', userId.toString());
      formData.append('company_id', companyId.toString());
      formData.append('contents', (contents || 'NA'));
      formData.append('port_of_departure', (port_of_departure || 'NA'));
      formData.append('port_of_arrival', (port_of_arrival || 'NA'));
      formData.append('free_days', (free_days || 0).toString());
      formData.append('per_diem', (per_diem || 0).toString());
      formData.append('pickup_charges', (pickup_charges || 0).toString());
      formData.append('operation', operation);
      formData.append('port_of_ad', port_of_ad);
      formData.append('ad_type', (ad_type || 'NA'));
      const endpoint = `PostAd`; // Endpoint without base URL
      const fullUrl = this.apiService.getFullUrl(endpoint);
      return this.http.post(fullUrl, formData);

    }
  }

  updateAd(id: number, file: File, from_date: Date, expiry_date: number, type_of_ad: string,
    container_type: string, size: number, price: number, quantity: number, port_id: number,
    userId: number, companyId: number, contents: string, port_of_departure: string,
    port_of_arrival: string, free_days: number, per_diem: number, pickup_charges: number,
    operation: string, port_of_ad: string, ad_type: string): Observable<any> {

    const formData = new FormData();
    formData.append('file', file);

    formData.append('from_date', (from_date || 0).toString());
    formData.append('expiry_date', (expiry_date || 0).toString());
    formData.append('type_of_ad', (type_of_ad || 'NA'));
    formData.append('container_type', container_type || 'NA');
    formData.append('container_size', (size || 0).toString());
    formData.append('price', (price || 0).toString());
    formData.append('quantity', (quantity || 0).toString());
    formData.append('port_id', (port_id || 0).toString());
    formData.append('posted_by', userId.toString());
    formData.append('company_id', companyId.toString());
    formData.append('contents', (contents || 'NA'));
    formData.append('port_of_departure', (port_of_departure || 'NA'));
    formData.append('port_of_arrival', (port_of_arrival || 'NA'));
    formData.append('free_days', (free_days || 0).toString());
    formData.append('per_diem', (per_diem || 0).toString());
    formData.append('pickup_charges', (pickup_charges || 0).toString());
    formData.append('operation', operation);
    formData.append('port_of_ad', port_of_ad);
    formData.append('ad_type', (ad_type || 'NA'));
    const endpoint = `Edit/${id}`; // Endpoint without base URL
    const fullUrl = this.apiService.getFullUrl(endpoint);

    return this.http.put(fullUrl, formData);
  }

  downloadFile(fileName: string) {
    const endpoint = `download/${fileName}`; // Endpoint without base URL
    const fullUrl = this.apiService.getFullUrl(endpoint);
    window.open(fullUrl);
  }

  getAllPorts(): Observable<any> {

    const url = this.apiService.getFullUrl(`GetAllPorts`);
    return this.http.get(url);
  }
  getAllCTypes(): Observable<any> {
    const url = this.apiService.getFullUrl(`GetAllCTypes`);
    return this.http.get(url);

  }

  UploadExcelData(excelImportedData: any, user_id: number, company_id: number) {

    const formData = new FormData();
    const jsonArrayString = JSON.stringify(excelImportedData);
    formData.append('excelImportedData', jsonArrayString);
    formData.append('user_id', user_id.toString());
    formData.append('company_id', company_id.toString());
    const url = this.apiService.getFullUrl(`ExcelUploadAd`);
    return this.http.post(url, formData);
  }
  getAdById(ad_id: number): Observable<Advertisement[]> {
    const url = this.apiService.getFullUrl(`${this.ad_Url}?ad_id=${ad_id}`);
    return this.http.get<Advertisement[]>(url);
  }


}