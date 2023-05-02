import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';


export interface Port {
  id: number;
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class PostAdService {
  baseUrl = 'https://localhost:7157'
  constructor(private http: HttpClient) { }

  uploadFile(file: File,from_date:Date,expiry_date:number,type_of_ad:string,container_type_id:number,price:number,quantity:number,port_id:number, userId: number, companyId: number, contents:string,port_of_departure:string,port_of_arrival:string,free_days:number,per_diem:number,pickup_charges:number,operation:string) {
  if(operation=="PostAd"){

    const formData = new FormData();
    formData.append('file', file);

    formData.append('from_date', from_date.toString());
    formData.append('expiry_date', expiry_date.toString());
    formData.append('type_of_ad', type_of_ad);
    formData.append('container_type_id', container_type_id.toString());
    formData.append('price', price.toString());
    formData.append('quantity', quantity.toString());
    formData.append('port_id', port_id.toString());
    formData.append('posted_by', userId.toString());
    formData.append('company_id', companyId.toString());
    formData.append('contents', contents);
    formData.append('port_of_departure',port_of_departure);
    formData.append('port_of_arrival', port_of_arrival);
    formData.append('free_days', free_days.toString());
    formData.append('per_diem', per_diem.toString());
    formData.append('pickup_charges', pickup_charges.toString());
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
    formData.append('contents', contents);
    formData.append('port_of_departure',(port_of_departure || 'NA'));
    formData.append('port_of_arrival', (port_of_arrival || 'NA'));
    formData.append('free_days', (free_days || 0).toString());
    formData.append('per_diem', (per_diem || 0).toString());
    formData.append('pickup_charges', (pickup_charges || 0).toString());
    formData.append('operation', operation);
    return this.http.post(`${this.baseUrl}/PostAd`, formData);

  }
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

}
