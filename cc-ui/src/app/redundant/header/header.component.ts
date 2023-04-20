import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  showPopup = false;

  constructor(private router:Router) {

  }
  logout() {
    // your logout logic here
  }
  OnClick(){
  this.router.navigate(['/dashboard']);
  }

}
