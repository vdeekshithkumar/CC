import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PortData } from './PortData';
import { ApiService } from 'src/app/api.service';

@Injectable({
    providedIn: 'root'
    
  })
  
  export class ForecastMapService{

    private apiUrl = 'GetInventoryForMap';
    private apiUrlSurplus = 'GetSurplus';
    private IdUrl='GetInventoryById';
    private CIdUrl='GetInventoryByIdCID';
    
  constructor(private http: HttpClient,private apiService: ApiService) {}


  getPortData(companyID:number): Observable<PortData[]> {
    const url = this.apiService.getFullUrl(`${this.apiUrl}/${companyID}`);
    return this.http.get<PortData[]>(url);
  }
  getSurplus(companyID:number): Observable<PortData[]> {
    const url = this.apiService.getFullUrl(`${this.apiUrlSurplus}/${companyID}`);
    return this.http.get<PortData[]>(url);
  }
  getDeficit(companyID:number): Observable<PortData[]> {
    const url = this.apiService.getFullUrl(`${this.apiUrl}/${companyID}`);
    return this.http.get<PortData[]>(url);
  }
  
  getAllPorts(): Observable<any> {

    const url = this.apiService.getFullUrl(`GetAllPorts`);
    return this.http.get(url);
  }
  
  getAllInventory(): Observable<any> {
    const url = this.apiService.getFullUrl(`GetAllInventory`);
    return this.http.get(url);  

  }
  getInventoryById(id: number): Observable<any> {
    const url = this.apiService.getFullUrl(`${this.IdUrl}/${id}`);
    return this.http.get(url, { responseType: 'json' });
  }
  getInventoryByIdCID(companyId:number): Observable<any> {
    const url = this.apiService.getFullUrl(`${this.CIdUrl}/${companyId}`);
    return this.http.get(url, { responseType: 'json' });
  }
  }