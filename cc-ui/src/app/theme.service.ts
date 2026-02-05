import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private darkThemeSubject = new BehaviorSubject<boolean>(false);
    isDarkTheme$ = this.darkThemeSubject.asObservable();

    constructor() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            this.setDarkTheme(true);
        }
    }

    setDarkTheme(isDark: boolean) {
        this.darkThemeSubject.next(isDark);
        if (isDark) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    }

    toggleTheme() {
        this.setDarkTheme(!this.darkThemeSubject.value);
    }
}
