import { Component, Injectable, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ChartData, ChartOptions } from 'chart.js';
import { MyAdService } from '../my-advertisement/my-ad.service';
import { FormGroup } from '@angular/forms';
import { ProfileService } from '../profile/profile.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  fname?: string
  lname?: string
  email?: string
  phone?: string
  designation?:string
  usercount_list=null;
  public company_id?: number;
  public name?: string;
  domain_address?: string;
  licence_id?: number;
  rating?: number;
  address?: string;
  company_logo?: string
  company_location?: string
  country?: string
  chartLabels: string[] = []; 
  chartData: ChartData<any, number[], string> = {
    labels: ['Active', 'Pending', 'Drafts'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#FDC74F', '#FD5A7C', '#1DA1F4'],
        hoverBackgroundColor: ['#FDC74F', '#FD5A7C', '#1DA1F4'],
      }
    ]
  };
 chartOptions: ChartOptions = {
  responsive: false,
  plugins: {
    tooltip: {
      callbacks: {
        label: (context) => {
          const label = context.label || '';
          const value = context.raw || '';
          return `${label}:${value}`;
        },
        title: () => '',
        labelColor: () => ({
          borderColor: 'transparent',
          backgroundColor: 'transparent'
        })
      },
      displayColors: false,
      bodyAlign: 'left',
      bodyFont: {
        weight: 'bold'
      }
    }
  }
};

  
  chartLegend = true;

  // Define chartLabels property

  currentUser: any;
  companyId: any;
  adsCount: number[] = [];
  profileForm!: FormGroup;
  public showDiv = false;
  constructor(private sessionService: SessionService, private router: Router, private adService: MyAdService,private profileService: ProfileService) { }

  ngOnInit(): void {
    this.sessionService.getCompanyId().subscribe(
      (companyId: number) => {
        this.companyId = companyId;
        console.log('company ID is :', companyId);
      },
      (error: any) => {
        console.error('Error retrieving company ID:', error);
      }
    );
    this.sessionService.getCurrentUser().subscribe(user => {
      if (user.user_id == null) {
        this.router.navigate(['/sign-in']);
      } else {
        this.currentUser = user;
        console.log('From session ' + this.currentUser.email + ' id here ' + this.currentUser.user_id);
      }
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd && event.url === '/sign-in')
    ).subscribe(() => {
      this.sessionService.clearSession();
    });
    this.profileService.getUserDetails(this.currentUser.user_id).subscribe(
      data => {
        
        // Handle the data returned by the HTTP GET request
        this.fname = data.fname
        console.log(this.fname)
        this.lname = data.lname
        this.email = data.email
        this.company_id = data.company_id
        this.phone = data.phone_no
        this.designation = data.designation
        console.log(this.designation)
      },
      error => {
        // Handle any errors that occur
        console.warn("oninit error" + error);
      }
    );
    this.adService.getAdsCount(this.companyId).subscribe(
      (count: number[]) => {
        this.adsCount = count;
        this.chartData.datasets[0].data = this.adsCount;
    
        console.log('Ads count: ', this.adsCount);
        console.log('Chart data: ', this.chartData);
      },
      (error: any) => {
        console.log(error);
        alert('Error occurred');
      }
    );
    this.profileService.getCompanyById(this.companyId).subscribe(

      data => {
   
        // Handle the data returned by the HTTP GET request
   
        this.company_id=data.company_id,
   
        this.name=data.name,
   
        this.licence_id=data.licence_id,
   
        this.domain_address=data.domain_address,
   
        this.company_logo=data.company_logo,
   
        this.company_location=data.company_location,
   
        this.country=data.country,
   
        this.rating=data.rating,
   
        this.address=data.address
   
        console.log(data)
      },
   
      error => {
   
        // Handle any errors that occur
   
        console.warn("oninit error"+error);
   
      }
   );
  }

  logout(): void {
    this.sessionService.clearSession();
    this.router.navigate(['/sign-in']);
  }

  onClick(): void {
    this.router.navigate(['/dashboard']);
  }
}
