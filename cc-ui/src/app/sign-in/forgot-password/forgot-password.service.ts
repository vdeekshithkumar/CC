import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPassService {
    otp:any
    private email!: string


  constructor(private http:HttpClient,private apiService: ApiService) { }

  getOTP(email: string): Observable<any> {
    const endpoint = `OTPVerification/${email}`; // Endpoint without base URL
    const fullUrl = this.apiService.getFullUrl(endpoint);
    return this.http.get(fullUrl);
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
