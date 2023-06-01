import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PortData } from './PortData';

@Injectable({
    providedIn: 'root'
    
  })
  
  export class ForecastMapService{
    private apiUrl = 'https://localhost:7157/GetInventoryForMap';
    private apiUrlSurplus = 'https://localhost:7157/GetSurplus';

    private IdUrl='https://localhost:7157/GetInventoryById';
    private CIdUrl='https://localhost:7157/GetInventoryByIdCID';
  constructor(private http: HttpClient) {}

  getPortData(companyID:number): Observable<PortData[]> {
    return this.http.get<PortData[]>(`${this.apiUrl}/${companyID}`);
  }
  getSurplus(companyID:number): Observable<PortData[]> {
    return this.http.get<PortData[]>(`${this.apiUrlSurplus}/${companyID}`);
  }
  getDeficit(companyID:number): Observable<PortData[]> {
    return this.http.get<PortData[]>(`${this.apiUrl}/${companyID}`);
  }
  
  getAllPorts(): Observable<any> {
    return this.http.get('https://localhost:7157/GetAllPorts');
  }
  
  getAllInventory(): Observable<any> {
    return this.http.get('https://localhost:7157/GetAllInventory');  
  }
  getInventoryById(id: number): Observable<any> {
    return this.http.get(`${this.IdUrl}/${id}`, { responseType: 'json' });
  }
  getInventoryByIdCID(companyId:number): Observable<any> {
    return this.http.get(`${this.CIdUrl}/${companyId}`, { responseType: 'json' });
  }
  }