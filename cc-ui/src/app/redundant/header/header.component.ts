import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SessionService } from 'src/app/session.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  showPopup = false;

  constructor(private router:Router,private sessionService:SessionService) {

  }
  logout(): void {

        // clear session data and redirect to login page
    
        this.sessionService.clearSession();
    
        this.router.navigate(['/sign-in'])
    
     
    
    }
  OnClick(){
  this.router.navigate(['/dashboard']);
  }

}
