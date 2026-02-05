import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    private totalRequests = 0;

    constructor(private loadingService: LoadingService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.totalRequests++;
        this.loadingService.show();

        return next.handle(request).pipe(
            finalize(() => {
                this.totalRequests--;
                if (this.totalRequests <= 0) {
                    this.totalRequests = 0;
                    this.loadingService.hide();
                }
            })
        );
    }
}
