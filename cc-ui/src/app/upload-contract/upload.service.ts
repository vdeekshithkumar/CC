
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';


@Injectable({
  providedIn: 'root'
})
export class UploadService {
 
  constructor(private http: HttpClient,private apiService: ApiService) { }

  uploadFile(files: File[], userId: number, companyId: number, contentDesc:string, title:string) {
    const endpoint = `upload`;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }
    formData.append('userId', userId.toString());
    formData.append('content', contentDesc);
    formData.append('title', title);
    formData.append('companyId', companyId.toString());
    const fullUrl = this.apiService.getFullUrl(endpoint);
    return this.http.post(fullUrl, formData);
  }
  

  downloadFile(fileName: string) {
    const endpoint = `download/${fileName}`; // Endpoint without base URL
    const fullUrl = this.apiService.getFullUrl(endpoint);
    window.open(fullUrl);
  }


}
