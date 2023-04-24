
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UploadService {
  baseUrl = 'https://localhost:7157'
  constructor(private http: HttpClient) { }

  uploadFile(file: File, userId: number, companyId: number, contentDesc:string, title:string) {
    debugger
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId.toString());
    formData.append('content', contentDesc);
    formData.append('title', title);
    formData.append('companyId', companyId.toString());
    
    return this.http.post(`${this.baseUrl}/upload`, formData);

  }
  downloadFile(fileName: string) {
    window.open(`${this.baseUrl}/download/${fileName}`);
  }

}
