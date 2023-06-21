import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private registeredEmailSource = new BehaviorSubject<string>(''); // Provide a default value here
  registeredEmail$ = this.registeredEmailSource.asObservable();

  setRegisteredEmail(email: string) {
    this.registeredEmailSource.next(email);
    console.log("the email in shared service is"+email)
  }
}
