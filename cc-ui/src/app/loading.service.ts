import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();

    private loadingTimer: any;
    private currentUrl: string = '';
    private autoHideTimer: any;

    constructor(private router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.currentUrl = event.url;
                this.show();
            } else if (
                event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError
            ) {
                this.hide();
            }
        });
    }

    show() {
        if (!this.loadingTimer) {
            this.loadingTimer = setTimeout(() => {
                this.loadingSubject.next(true);

                // Specific requirement for /my-ad route: force hide after 500ms
                if (this.currentUrl.includes('/my-ad')) {
                    if (this.autoHideTimer) clearTimeout(this.autoHideTimer);
                    this.autoHideTimer = setTimeout(() => {
                        this.hide();
                    }, 500);
                }
            }, 250);
        }
    }

    hide() {
        if (this.loadingTimer) {
            clearTimeout(this.loadingTimer);
            this.loadingTimer = null;
        }
        if (this.autoHideTimer) {
            clearTimeout(this.autoHideTimer);
            this.autoHideTimer = null;
        }
        this.loadingSubject.next(false);
    }
}
