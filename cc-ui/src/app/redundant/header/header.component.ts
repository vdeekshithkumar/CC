import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/session.service';
import { EditUserDetailsComponent } from './edit-user-details/edit-user-details.component';
import { MessagingService } from 'src/app/messaging/messaging.service';
import { ProfileService } from 'src/app/profile/profile.service';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  companyId: any;
  companyName: string = this.sessionService.syncCompanyName;
  first_name?: string;
  showDiv: boolean = false;
  isCardVisible: boolean = false;
  searchTerm = '';
  totalMessageCount: any;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    public dialog: MatDialog,
    private messageService: MessagingService,
    private profileService: ProfileService,
    public themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.sessionService.getCurrentUser().subscribe((user: any) => {
      if (user) {
        this.first_name = user.first_name;
      }
    });

    this.sessionService.getCompanyName().subscribe(name => {
      this.companyName = name;
    });

    this.sessionService.getCompanyId().subscribe(
      (companyId: number) => {
        this.companyId = companyId;
        if (this.companyId && this.companyName === 'CFlow Stream') {
          this.fetchCompanyName();
        }
      },
      (error: any) => console.error('Error retrieving company ID:', error)
    );
  }

  fetchCompanyName() {
    this.profileService.getCompanyById(this.companyId).subscribe(
      (response: any) => {
        if (response && response.name) {
          this.sessionService.setCompanyName(response.name);
        }
      },
      (error: any) => console.error('Error fetching company name:', error)
    );
  }

  toggleDropdown() {
    this.showDiv = !this.showDiv;
  }

  logout(): void {
    this.sessionService.clearSession();
    this.router.navigate(['/sign-in']);
  }

  onBellIconClick() {
    this.isCardVisible = !this.isCardVisible;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
