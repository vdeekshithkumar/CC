import { Injectable } from '@angular/core';

const BASE_URL = 'https://container-conundrum-api.azurewebsites.net';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() { }

  getFullUrl(endpoint: string): string {
    return `${BASE_URL}${endpoint}`;
  }
}
