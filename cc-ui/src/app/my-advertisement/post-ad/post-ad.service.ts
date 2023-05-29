import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, throwError } from 'rxjs';


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
export interface Port {
  id: number;
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class PostAdService {
  baseUrl = 'https://localhost:7157'
  private BASE_URL = 'https://localhost:7157/ExcelUploadAd';
  private ad_Url = 'https://localhost:7157/GetAd';
  constructor(private http: HttpClient) { }

  uploadFile(file: File,from_date:Date,expiry_date:number,type_of_ad:string,container_type_id:number,price:number,quantity:number,port_id:number, userId: number, companyId: number, contents:string,port_of_departure:string,port_of_arrival:string,free_days:number,per_diem:number,pickup_charges:number,operation:string) {
  if(operation=="PostAd"){

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
    formData.append('port_of_departure',(port_of_departure || 'NA'));
    formData.append('port_of_arrival', (port_of_arrival || 'NA'));
    formData.append('free_days', (free_days || 0).toString());
    formData.append('per_diem', (per_diem || 0).toString());
    formData.append('pickup_charges', (pickup_charges || 0).toString());
    formData.append('operation', operation);
    
    return this.http.post(`${this.baseUrl}/PostAd`, formData);

  }else{
    
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
    formData.append('port_of_departure',(port_of_departure || 'NA'));
    formData.append('port_of_arrival', (port_of_arrival || 'NA'));
    formData.append('free_days', (free_days || 0).toString());
    formData.append('per_diem', (per_diem || 0).toString());
    formData.append('pickup_charges', (pickup_charges || 0).toString());
    formData.append('operation', operation);
    return this.http.post(`${this.baseUrl}/PostAd`, formData);

  }
  }

  updateAd(id: number, file: File, from_date: Date, expiry_date: number, type_of_ad: string,
    container_type_id: number, price: number, quantity: number, port_id: number,
    userId: number, companyId: number, contents: string, port_of_departure: string,
    port_of_arrival: string, free_days: number, per_diem: number, pickup_charges: number,
    operation: string): Observable<any> {

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
      formData.append('port_of_departure',(port_of_departure || 'NA'));
      formData.append('port_of_arrival', (port_of_arrival || 'NA'));
      formData.append('free_days', (free_days || 0).toString());
      formData.append('per_diem', (per_diem || 0).toString());
      formData.append('pickup_charges', (pickup_charges || 0).toString());
      formData.append('operation', operation);
const url = `${this.baseUrl}/Edit/${id}`;
return this.http.put(url, formData);
}




  downloadFile(fileName: string) {
    window.open(`${this.baseUrl}/download/${fileName}`);
  }
   

  getAllPorts(): Observable<any> {
    return this.http.get('https://localhost:7157/GetAllPorts');
  }
  getAllCTypes(): Observable<any> {
    return this.http.get('https://localhost:7157/GetAllCTypes');
  }

  UploadExcelData(excelImportedData:any,user_id:number,company_id:number) {
  
    const formData = new FormData();
    const jsonArrayString = JSON.stringify(excelImportedData);
    formData.append('excelImportedData', jsonArrayString);
    formData.append('user_id', user_id.toString());
    formData.append('company_id', company_id.toString());
    
    return this.http.post(`${this.baseUrl}/ExcelUploadAd`, formData);

  }
  getAdById(ad_id: number): Observable<Advertisement[]> {
    const url = `${this.ad_Url}?ad_id=${ad_id}`;
    return this.http.get<Advertisement[]>(url);
  }


}