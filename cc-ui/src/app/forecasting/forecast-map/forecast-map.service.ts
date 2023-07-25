import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PortData } from './PortData';

@Injectable({
    providedIn: 'root'
    
  })
  
  export class ForecastMapService{
    private apiUrl = 'https://container-conundrum-api.azurewebsites.net/GetInventoryForMap';
    private apiUrlSurplus = 'https://container-conundrum-api.azurewebsites.net/GetSurplus';

    private IdUrl='https://container-conundrum-api.azurewebsites.net/GetInventoryById';
    private CIdUrl='https://container-conundrum-api.azurewebsites.net/GetInventoryByIdCID';
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
    return this.http.get('https://container-conundrum-api.azurewebsites.net/GetAllPorts');
  }
  
  getAllInventory(): Observable<any> {
    return this.http.get('https://container-conundrum-api.azurewebsites.net/GetAllInventory');  
  }
  getInventoryById(id: number): Observable<any> {
    return this.http.get(`${this.IdUrl}/${id}`, { responseType: 'json' });
  }
  getInventoryByIdCID(companyId:number): Observable<any> {
    return this.http.get(`${this.CIdUrl}/${companyId}`, { responseType: 'json' });
  }
  }