
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
  })
  export class UploadInventoryservice {
    private apiUrl='https://localhost:7157/UploadInventory';
 
  constructor(private http:HttpClient) {
    
  }
    uploadInventory(UploadInventoryForm: FormGroup<any>){
      const headers=new HttpHeaders().set('Content-Type','application/json');
      return this.http.post(this.apiUrl,UploadInventoryForm,{headers});
    }
  }
