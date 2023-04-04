
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';


export interface Ports {
  ports_id: number;
  ports_name: string;
}
@Injectable({
    providedIn: 'root'
  })
  export class UploadInventoryservice {
    private apiUrl='https://localhost:7157/UploadInventory';
  ports: any;
 
  constructor(private http:HttpClient) {
    
  }
    uploadInventory(UploadInventoryForm: FormGroup<any>){
      const headers=new HttpHeaders().set('Content-Type','application/json');
      return this.http.post(this.apiUrl,UploadInventoryForm,{headers});
    }
    getAllPorts(): Observable<any> {
      return this.http.get('https://localhost:7157/GetAllPorts');
    }
  }
