import { Component, Injectable ,OnInit} from '@angular/core';
import { SessionService } from '../session.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  currentUser: any;

  constructor(private sessionService: SessionService,private router: Router) { }

  ngOnInit(): void {
    // retrieve the user session information
    this.sessionService.getCurrentUser().subscribe(user => {
      // if (user.id==null && user.token==null) {  // use this once token is used for a user
      if (user.user_id==null) {
        // if user session is null, redirect to login page
        this.router.navigate(['/sign-in']);
      }
      else{
        this.currentUser = user;
      console.log('From session '+this.currentUser.email+'  id here '+this.currentUser.user_id)

      }
      // store the user session information in a property
      
    });

    //when navigate back to sign-in session ends
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd && event.url === '/sign-in')
    ).subscribe(() => {
      this.sessionService.clearSession();
    });
  }

  logout(): void {
    // clear session data and redirect to login page
    this.sessionService.clearSession();
  
}
}
