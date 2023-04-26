import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyAdService {

  // private apiUrl = 'https://localhost:7157/GetCompanyById';
  // private UIdUrl = 'https://localhost:7157/GetUserById';
  // private userUrl = 'https://localhost:7157/GetAllUser';
  // private deleteUrl = 'https://localhost:7157/DeleteUser';
  private apiUrl = 'https://localhost:7157/UserPermissions';
  constructor(private http: HttpClient) { }

  getPermissions(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?user_id=${userId}`);
  }
 }
