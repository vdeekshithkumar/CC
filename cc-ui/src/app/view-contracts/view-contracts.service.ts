import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContractDto } from '../DTO/ContractDto';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ViewContractsService {

 
  constructor(private http: HttpClient,private apiService: ApiService) { }
  getAllPorts(): Observable<any> {

    const url = this.apiService.getFullUrl(`GetAllPorts`);
    return this.http.get(url);
  } 

  getAllContracts(companyId: number): Observable<any> {
    const url = this.apiService.getFullUrl(`GetAllContracts?companyId=${companyId}`);
    return this.http.get<ContractDto[]>(url);
  }
  getAllTitles(companyId: number): Observable<any> {
    const endpoint = `GetAllTitles?companyID=${companyId}`; // Endpoint without base URL
    const fullUrl = this.apiService.getFullUrl(endpoint);
    return this.http.get(fullUrl, { responseType: 'json' });
  }

  getContractByIdCID(companyId:number):Observable<any>{
    debugger
    const endpoint = `GetAllContractsByCompanyID?companyID=${companyId}`; // Endpoint without base URL
    const fullUrl = this.apiService.getFullUrl(endpoint);
    return this.http.get(fullUrl, { responseType: 'json' });
   
  }
  //void is returned
  DeleteContract(contractId: number): Observable<any> {
    const url = this.apiService.getFullUrl (`DeleteContract?contractID=${contractId}`);
    return this.http.delete<any>(url);
  }
 
  async ViewContract(contractID: number, userID: number, companyID: number): Promise<Blob> {
    const endpoint = `DownloadContracts?userId=${userID}&companyId=${companyID}&contractID=${contractID}`; // Endpoint without base URL
    const fullUrl = this.apiService.getFullUrl(endpoint);
    const response = await this.http.get(fullUrl, { responseType: 'blob' }).toPromise();
    return response as Blob;
  }
}
