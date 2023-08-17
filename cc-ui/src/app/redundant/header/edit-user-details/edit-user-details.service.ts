import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from './edit-user-details.component';
import { ApiService } from 'src/app/api.service';
@Injectable({
  providedIn: 'root'
})
export class EditUserDetailsService {
  
  constructor(private http : HttpClient,private apiService: ApiService){}
  updateUser(id: number, user: User): Observable<User> {
    const fullUrl = this.apiService.getFullUrl( `UpdateUserAsync/${id}`);
    return this.http.put<User>(fullUrl, user);
  }
}
