import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from './edit-user-details.component';
@Injectable({
  providedIn: 'root'
})
export class EditUserDetailsService {
  
  private apiUrl= 'https://localhost:7157'
  constructor(private http : HttpClient){}
    updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/UpdateUserAsync/${id}`, user);
  }
}
