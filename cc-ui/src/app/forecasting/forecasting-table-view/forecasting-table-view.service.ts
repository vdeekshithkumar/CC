
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiService } from 'src/app/api.service';


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
  export class ForecastingTableService {
    
    private IdUrl='GetInventoryById';
    private CIdUrl='GetInventoryByIdCID';
    
    constructor(private http:HttpClient,private apiService: ApiService) {

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
  