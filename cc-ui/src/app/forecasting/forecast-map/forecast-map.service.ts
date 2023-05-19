import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PortData } from './PortData';

@Injectable({
    providedIn: 'root'
    
  })
  
  export class ForecastMapService{
    private apiUrl = 'https://localhost:7157/GetInventoryForMap';

  constructor(private http: HttpClient) {}

  getPortData(companyID:number): Observable<PortData[]> {
    debugger
    return this.http.get<PortData[]>(`${this.apiUrl}/${companyID}`);
  }
  }