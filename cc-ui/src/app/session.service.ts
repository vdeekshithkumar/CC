// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })
// export class SessionService {

//   private currentUserSubject = new BehaviorSubject<any>(null);

//   constructor() { }

//   public setCurrentUser(user: any): void {
//     this.currentUserSubject.next(user);
//   }
//   public getCurrentUser(): Observable<any> {
//     return this.currentUserSubject.asObservable();
//   }
//   clearSession() {
//     sessionStorage.clear();
//   }
  
  
// }

import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class SessionService {
  
  private readonly USER_SESSION_KEY = 'userSession';
  private TOKEN_KEY = 'my_app_token';
   

  // constructor(private router: Router) { 
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationEnd && event.url.includes('sign-in')) {
  //       this.clearSession();
  //       alert("Login Please  (Session Cleared)")
  //     }
  //   });
  // }
  constructor(private router: Router) { 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url.includes('sign-in')) {
        const registered = this.router.parseUrl(event.url).queryParams['registered'];
        const login = this.router.parseUrl(event.url).queryParams['login'];
        if (!registered && !login) {
          this.clearSession();
          alert("Login Please (Session Cleared)")
        }
      }
    });
  }



public getUserId(): Observable<any> {
  const user = JSON.parse(localStorage.getItem(this.USER_SESSION_KEY) || '{}');
  return of(user.user_id);
}

public getCompanyId(): Observable<any> {
  const user = JSON.parse(localStorage.getItem(this.USER_SESSION_KEY) || '{}');
  return of(user.company_id);
}

// public getInventoryId(): Observable<any> {
//   const user = JSON.parse(localStorage.getItem(this.USER_SESSION_KEY) || '{}');
//   return of(user.);
// }



  setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  // Retrieve the token from session storage
  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  // Remove the token from session storage
  removeToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  public setCurrentUser(user: any): void {
    localStorage.setItem(this.USER_SESSION_KEY, JSON.stringify(user));
  }

  public getCurrentUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem(this.USER_SESSION_KEY) || '{}');
    return of(user);
  }
  public isAuthenticated(): boolean {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    // return currentUser && currentUser.token;
    return currentUser; //use the above return statement once user has having token generation implemented
  }
  public clearSession(): void {
    localStorage.removeItem(this.USER_SESSION_KEY);
  }
}
