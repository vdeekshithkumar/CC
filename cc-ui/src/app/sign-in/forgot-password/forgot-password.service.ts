import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgotPassService {
    otp:any
    private email!: string

  baseUrl="https://localhost:7157"
  constructor(private http:HttpClient) { }
  getOTP(email:string){
    const url = `${this.baseUrl}/OTPVerification/${email}`;
    return this.http.get(url);
  }

  setEmail(email: string): void {
    this.email = email;
  }

  getEmail(): string {
    return this.email;
  }

  verifyOtp(otp : string)
  {
    if (this.otp === +otp)
    {
        return true
    }
    return false
  }
}
