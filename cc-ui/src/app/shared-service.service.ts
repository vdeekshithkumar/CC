import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private registeredEmailSource = new BehaviorSubject<string>(''); // Provide a default value here
  private dataSubject = new Subject<{ port_code: any; container_type: any ; container_size:any}>();
  registeredEmail$ = this.registeredEmailSource.asObservable();
 

  setRegisteredEmail(email: string) {
    this.registeredEmailSource.next(email);
    console.log("the email in shared service is"+email)
  }
  setData(port_code: any, container_type: any,container_size:any) {
    this.dataSubject.next({ port_code, container_type,container_size });
    console.log("Data emitted from service");
  }
  getData() {
    return this.dataSubject.asObservable();
  }
}
