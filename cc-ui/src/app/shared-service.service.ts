import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private registeredEmailSource = new BehaviorSubject<string>('');
  private PortSelected = new BehaviorSubject<string>('');
  private selectedContainerType = new BehaviorSubject<string>('');
  private selectedContainerSize = new BehaviorSubject<string>('');
  private portlatitude = new BehaviorSubject<number>(0);
  private portlongitude = new BehaviorSubject<number>(0);
  private deficitServicesData: any[] = [];
  registeredEmail$ = this.registeredEmailSource.asObservable();
  
  selected_port =this.PortSelected.asObservable();
  selectedContainerType$ = this.selectedContainerType.asObservable();
  selectedContainerSize$ = this.selectedContainerSize.asObservable();
  PortLatitude$ = this.portlatitude.asObservable();
  PortLongitude$ = this.portlongitude.asObservable();

  setRegisteredEmail(email: string) {
    this.registeredEmailSource.next(email);
    console.log("the email in shared service is"+email)
  }
 setData(port_code: string, container_type: string,container_size:any) {
    this.PortSelected.next(port_code);
    this.selectedContainerType.next(container_type);
    this.selectedContainerSize.next(container_size);
    console.log("the port_code in shared service is " + port_code);
  }
setlatitudelongitude(latitude:any,longitude:any)
{
this.portlatitude.next(latitude);
this.portlongitude.next(longitude);
}
setDeficitServices(data: any[]) {
  this.deficitServicesData = data;
}

getDeficitServices() {
  return this.deficitServicesData;
}
}
