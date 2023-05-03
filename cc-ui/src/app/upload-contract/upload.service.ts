
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

  uploadFile(files: File[], userId: number, companyId: number, contentDesc:string, title:string) {
    debugger
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }
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
