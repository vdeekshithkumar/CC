import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrierServiceService {
  private carUrl='GetAllServicesByCompanyId';
  private sernameUrl='GetPortSequencesByServiceName';
  constructor(private http: HttpClient,private apiService: ApiService) { }
  
  getCarrierServicesbyCId(companyId: number): Observable<any> {
    debugger
    const url = this.apiService.getFullUrl(`${this.carUrl}?companyid=${companyId}`);
    return this.http.get(url);
  }

  getCarrierServicesbySName(servicename: string): Observable<any> {
    debugger
    const url = this.apiService.getFullUrl(`${this.sernameUrl}?serviceName=${servicename}`);
    return this.http.get(url);
  }
}
