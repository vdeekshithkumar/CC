import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { SessionService } from './session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // private API_URL = 'http://api.example.com'; // use when end point needs auth
  constructor(private sessionService: SessionService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.sessionService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req);
  }
}
