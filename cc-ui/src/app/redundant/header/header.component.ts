import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SessionService } from 'src/app/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 
  searchTerm = '';
  filterAds = false;
  filterNegotiation = false;
  selectedFilters: string[] = [];

  showPopup = false;

  showFilterOptions: boolean = false;

  constructor(private router:Router,private sessionService:SessionService) {

  }
  logout(): void {

      // clear session data and redirect to login page
    
      this.sessionService.clearSession();
    
      this.router.navigate(['/sign-in'])
    
    
    
    }
    stopPropagation(event: Event) {
      event.stopPropagation();
    }
    
  applyFilters(): void {
    this.selectedFilters = [];
    if (this.filterAds) {
      this.selectedFilters.push('Ads');
    }
    if (this.filterNegotiation) {
      this.selectedFilters.push('Negotiation');
    }
    // perform search with filters
    console.log('Search term:', this.searchTerm);
    console.log('Selected filters:', this.selectedFilters);
  }
  
  clearFilters(): void {
    this.filterAds = false;
    this.filterNegotiation = false;
    this.selectedFilters = [];
  }

  OnClick(){
  this.router.navigate(['/dashboard']);
  }

}
