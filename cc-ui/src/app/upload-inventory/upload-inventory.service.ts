
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';


export interface Inventory {
  id: number;
  container_type: string;
}

export interface Port {
  id: number;
  name: string;
}
@Injectable({

    providedIn: 'root'
  })
  export class UploadInventoryservice {
    private apiUrl='https://localhost:7157/UploadInventory';
    private baseUrl='https://localhost:7157/DeleteInventory';
    private IdUrl='https://localhost:7157/GetInventoryById';
     private CIdUrl='https://localhost:7157/GetInventoryByIdCID';
     private editUrl='https://localhost:7157/EditInventory';
  constructor(private http:HttpClient) {


  }
    uploadInventory(UploadInventoryForm: FormGroup<any>){
      const headers=new HttpHeaders().set('content-Type','application/json');
      return this.http.post(this.apiUrl,UploadInventoryForm,{headers}); 
    }
   
    editInventory(id: number, UploadInventoryForm: FormGroup<any>) {
      const headers = new HttpHeaders().set('content-Type', 'application/json');
  
      return this.http.put(`${this.editUrl}/${id}`,UploadInventoryForm,{ headers });
    }
    
    

    getAllPorts(): Observable<any> {
      return this.http.get('https://localhost:7157/GetAllPorts');
    }
    
    getAllInventory(): Observable<any> {
      return this.http.get('https://localhost:7157/GetAllInventory');  
    }
    getInventoryById(id: number): Observable<any> {
      return this.http.get(`${this.IdUrl}/${id}`, { responseType: 'json' });
    }

    
    getInventoryByIdCID(companyId:number): Observable<any> {
      return this.http.get(`${this.CIdUrl}/${companyId}`, { responseType: 'json' });
    }

    deleteInventory(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }

}
