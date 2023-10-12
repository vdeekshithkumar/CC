import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
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
    portCode: string;
    containerType: string;
    containerSize: number;
    latitude:number;
    longitude:number;
  }>({
    portCode: '',
    containerType: '',
    containerSize: 0,
    latitude:0,
    longitude:0
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
setisvaluesfordeficit(valuesforis:{
  portCode: string;
    containerType: string;
    containerSize: number;
    latitude:number;
    longitude:number;
}){
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
