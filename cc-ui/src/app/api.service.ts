import { Injectable } from '@angular/core';

const BASE_URL = 'https://localhost:7157/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() { }

  getFullUrl(endpoint: string): string {
    return `${BASE_URL}${endpoint}`;
  }
}
