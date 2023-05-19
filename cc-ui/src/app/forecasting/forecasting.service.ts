
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, throwError } from 'rxjs';


export interface Forecasting {
  id: number;
  container_type: string;
}

export interface Port {
  id: number;
  name: string;
}
@Injectable({

    providedIn: 'root'
  })
  export class ForecastingService {
    
    private IdUrl='https://localhost:7157/GetInventoryById';
    private CIdUrl='https://localhost:7157/GetInventoryByIdCID';
    
    constructor(private http:HttpClient) {

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
  