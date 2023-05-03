import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyAdService {

  baseUrl = 'https://localhost:7157'
  private apiUrl = 'https://localhost:7157/UserPermissions';
  constructor(private http: HttpClient) { }

  getPermissions(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?user_id=${userId}`);
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

 }
