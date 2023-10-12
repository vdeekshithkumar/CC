import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrierServiceService {
  private carUrl='GetAllServicesByCompanyId';
  private sernameUrl='GetPortSequencesByServiceName';
  private deficitServices = 'GetInternalServiceforDeficitPort';
  private surplusServices = 'GetInternalServiceforSurplusPort';
  private seq_nourl = 'GetSeqNo';
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

  getServicesforDeficit(companyId: number, portCode: string): Observable<Response> {
    const url = this.apiService.getFullUrl(`${this.deficitServices}?companyId=${companyId}&portCode=${portCode}`);
    
    return this.http.get<Response>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  
private handleError(error: any): Observable<never> {
  // Implement your error handling logic here (e.g., logging, showing user-friendly messages).
  console.error('An error occurred:', error);
  throw error;
}
getServicesforSurplus(companyId: number, portCode: string): Observable<Response> {
  const url = this.apiService.getFullUrl(`${this.surplusServices}?companyId=${companyId}&portCode=${portCode}`);
  
  return this.http.get<Response>(url)
    .pipe(
      catchError(this.handleerror)
    );
}

private handleerror(error: any): Observable<never> {
// Implement your error handling logic here (e.g., logging, showing user-friendly messages).
console.error('An error occurred:', error);
throw error;
}
getPortSeqNo(portCode:string)
{
  const url = this.apiService.getFullUrl(`${this.seq_nourl}?portCode=${portCode}`);
    return this.http.get(url);
}
}
