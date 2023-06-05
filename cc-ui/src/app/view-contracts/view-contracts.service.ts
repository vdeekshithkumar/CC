import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewContractsService {
  baseUrl = 'https://localhost:7157'
  private IdUrl='https://localhost:7157/GetInventoryById';
    private CIdUrl='https://localhost:7157/GetInventoryByIdCID';
 
  constructor(private http: HttpClient) { }
  getAllPorts(): Observable<any> {
    return this.http.get('https://localhost:7157/GetAllPorts');
  }
  
  
  getContracts(title:string,companyId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetAllContractsByTitle?title=${title}&companyId=${companyId}`, { responseType: 'json' });
  }
  getAllTitles(companyId:number):Observable<any>{
    debugger
    return this.http.get(`${this.baseUrl}/GetAllTitles?companyID=${companyId}`,{responseType:'json'})
  }
  getContractByIdCID(companyId:number):Observable<any>{
    debugger
    return this.http.get(`${this.baseUrl}/GetAllContractsByCompanyID?companyID=${companyId}`,{responseType:'json'})
  }
  //void is returned
  DeleteContract(contractId: number): Observable<any> {
    const url = `${this.baseUrl}/DeleteContract?contractID=${contractId}`;
    return this.http.delete<any>(url);
  }
  
  ViewContract(contractID: number, userID: number, companyID: number): Observable<Blob> {
    debugger
    const url = `${this.baseUrl}/DownloadContracts?userId=${userID}&companyId=${companyID}&contractID=${contractID}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  // getContractByIdCID(companyId:number): Observable<any> {
  //   return this.http.get(`${this.CIdUrl}/${companyId}`, { responseType: 'json' });
  // }
}
