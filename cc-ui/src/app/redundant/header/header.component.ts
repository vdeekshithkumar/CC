import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/session.service';
import { EditUserDetailsComponent } from './edit-user-details/edit-user-details.component';
import { MessagingService } from 'src/app/messaging/messaging.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  totalMessageCount: any;
  isCardVisible: boolean = false;
  searchTerm = '';
  filterAds = false;
  filterNegotiation = false;
  selectedFilters: string[] = [];
  companyId: any;
  

  showPopup = false;

  showFilterOptions: boolean = false;

  constructor(private router: Router, private sessionService: SessionService, public dialog: MatDialog,private messageService:MessagingService) {

  }
  ngOnInit(): void {
    this.sessionService.getCompanyId().subscribe(
      (companyId: number) => {
        this.companyId = companyId;
        console.log('company ID is:', companyId);
      },
      (error: any) => {
        console.error('Error retrieving company ID:', error);
      }
    );
    this.messageService.getMessageCount(this.companyId).subscribe(
      (response: any) => {
      this.totalMessageCount = response.totalMessageCount;

        console.log("Total Message Count:", this.totalMessageCount);
        // Now you can use 'totalMessageCount' wherever you want to display it in your frontend.
      },
      (error: any) => {
        console.log("Error loading message count: " + error);
      }
    );
    
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

  OnClick() {
    this.router.navigate(['/dashboard']);
  }
  openDialog() {
    const dialogRef = this.dialog.open(EditUserDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  onBellIconClick(){
    
      this.isCardVisible = !this.isCardVisible;
    
  }
}
