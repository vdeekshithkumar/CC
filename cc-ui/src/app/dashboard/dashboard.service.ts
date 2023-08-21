import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  private getalldataurl = 'GetAllData'

  constructor(private http: HttpClient,private apiService: ApiService) { }

  getAllData(companyId: number): Observable<any> {
    const url = this.apiService.getFullUrl(`${this.getalldataurl}?companyId=${companyId}`);
    return this.http.get(url);
  }
}
