import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  deficitportCode: any;
deficitcontainerType: any;
deficitcontainerSize: any;
deficitlatitude: any;
deficitlongitude: any;
  private valuesSource = new BehaviorSubject<{
    portcode: string;
    containertype: string;
    containersize: string;
  }>({
    portcode: '',
    containertype: '',
    containersize: '',
  });
  private valuesfordeficit = new BehaviorSubject<{
    deficitportCode: string;
    deficitcontainerType: string;
    deficitcontainerSize: number;
    deficitlatitude:number;
    deficitlongitude:number;
  }>({
    deficitportCode: '',
    deficitcontainerType: '',
    deficitcontainerSize: 0,
    deficitlatitude:0,
    deficitlongitude:0
  });
  private valuesforsurplus = new BehaviorSubject<{
    surplusportCode: string;
    surpluscontainerType: string;
    surpluscontainerSize: number;
    surpluslatitude:number;
    surpluslongitude:number;
  }>({
    surplusportCode: '',
    surpluscontainerType: '',
    surpluscontainerSize: 0,
    surpluslatitude:0,
    surpluslongitude:0
  });
 
  values$ = this.valuesSource.asObservable();
  valuesforis$ = this.valuesfordeficit.asObservable();
  valuesforsurplus$ = this.valuesforsurplus.asObservable();
  
  private registeredEmailSource = new BehaviorSubject<string>('');
 
  registeredEmail$ = this.registeredEmailSource.asObservable();

  
 

  setRegisteredEmail(email: string) {
    this.registeredEmailSource.next(email);
    console.log("the email in shared service is"+email)
  }

 

  
setValues(values: {
  portcode: string;
  containertype: string;
  containersize: string;
}) {
  this.valuesSource.next(values);
}
setisvaluesfordeficit(valuesforis: {
  deficitportCode: string;
  deficitcontainerType: string;
  deficitcontainerSize: number;
  deficitlatitude: number;
  deficitlongitude: number;
}) {
  this.valuesfordeficit.next(valuesforis);

  
}

setisvaluesforsurplus(valuesforsurplus:{
  surplusportCode: string;
    surpluscontainerType: string;
    surpluscontainerSize: number;
    surpluslatitude:number;
    surpluslongitude:number;
}){
  this.valuesforsurplus.next(valuesforsurplus);
}
}
