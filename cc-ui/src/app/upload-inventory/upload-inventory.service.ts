
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiService } from '../api.service';


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

    private apiUrl='UploadInventory';
    private baseUrl='DeleteInventory';
    private IdUrl='GetInventoryById';
    private CIdUrl='GetInventoryByIdCID';
    private editUrl='EditInventory';
    private addexcel='AddExcel';
    constructor(private http:HttpClient,private apiService: ApiService) {

  }
    uploadInventory(UploadInventoryForm: FormGroup<any>){
      const url = this.apiService.getFullUrl(`${this.apiUrl}`);
      const headers=new HttpHeaders().set('content-Type','application/json');
      return this.http.post(url,UploadInventoryForm,{headers}); 
    }
   
    editInventory(id: number, UploadInventoryForm: FormGroup<any>) {
      const url = this.apiService.getFullUrl(`${this.editUrl}/${id}`);
      const headers = new HttpHeaders().set('content-Type', 'application/json');
      return this.http.put(url,UploadInventoryForm,{ headers });
    }
    
    getAllPorts(): Observable<any> {

      const url = this.apiService.getFullUrl(`GetAllPorts`);
      return this.http.get(url);
    }
    
    getAllInventory(): Observable<any> {
      const url = this.apiService.getFullUrl(`GetAllInventory`);
      return this.http.get(url);  

    }
    getInventoryById(id: number): Observable<any> {
      const url = this.apiService.getFullUrl(`${this.IdUrl}/${id}`);
      return this.http.get(url, { responseType: 'json' });
    }
    getInventoryByIdCID(companyId:number): Observable<any> {
      const url = this.apiService.getFullUrl(`${this.CIdUrl}/${companyId}`);
      return this.http.get(url, { responseType: 'json' });
    }


    deleteInventory(id: number): Observable<any> {
      const url = this.apiService.getFullUrl(`${this.baseUrl}/${id}`);
      return this.http.delete(url, { responseType: 'text' });
    }

    sendExcelData(excelData: any,user_id:number,company_id:number): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
        const payload = {
        excelData: excelData,
        user_id: user_id,
        company_id:company_id
      };
      
      const url = this.apiService.getFullUrl(`${this.addexcel}`);
      return this.http.post(url, payload, httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    }
    private handleError(error: any) {
      console.error('An error occurred ,', error);
      return throwError(error);
    }
  }
  