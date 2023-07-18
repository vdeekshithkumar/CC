import { Component, Injectable, OnInit } from '@angular/core';

import { SessionService } from '../session.service';

import { NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs';

import { ChartData,ChartDataset, ChartOptions, ChartType } from 'chart.js';

import { Advertisement, MyAdService } from '../my-advertisement/my-ad.service';

import { FormGroup } from '@angular/forms';

import { ProfileService } from '../profile/profile.service';

import { UploadInventoryservice } from '../upload-inventory/upload-inventory.service';




@Injectable({

  providedIn: 'root'

})

@Component({

  selector: 'app-dashboard',

  templateUrl: './dashboard.component.html',

  styleUrls: ['./dashboard.component.css']

})

export class DashboardComponent implements OnInit {

  fname?: string;

  lname?: string;

  email?: string;

  phone?: string;

  designation?: string;

  usercount_list = null;

  public company_id?: number;

  public name?: string;

  domain_address?: string;

  licence_id?: number;

  rating?: number;

  address?: string;

  company_logo?: string;

  company_location?: string;

  country?: string;

  chartLabels: string[] = [];

  inventory_list_by_companyId: any[] = [];

  lineChartLabels: any;

  originalspaceAds: number[] = [];

  originalcontainerAds: number[] = [];

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

  lineChartData: ChartData<any, number[], string> = {

    labels: ['BUY', 'SELL','LEASE', 'SWAP'],

    datasets: [

      {

        label: 'Space',

        data: [],

        backgroundColor: ['#F3973F', '#E44D02', '#6B7AB2'],

        borderColor: ['#F3973F', '#E44D02', '#6B7AB2'],

        borderWidth: 1

      }

    ]

  };

  PieChartData: ChartData<any, number[], string> = {

    labels: ['BUY', 'SELL','LEASE', 'SWAP'],

    datasets: [

      {

        label: 'Container',

        data: [],

        backgroundColor: ['#FFCC0A', '#F3796E', '#08BEC4','#28D35D'],

        borderColor: ['#FFCC0A', '#F3796E', '#08BEC4','#28D35D'],

        borderWidth: 1

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

  lineChartOptions: ChartOptions = {

    responsive: false,

    scales: {

      x: {

        display: true,

        title: {

          display: true,

        },

      },

      y: {

        display: true,

        title: {

          display: true,

        },

        ticks: {

          stepSize: 0,

          precision: 0,

        },

      },

    },

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

            backgroundColor: 'transparent',

          }),

        },

        displayColors: false,

        bodyAlign: 'left',

        bodyFont: {

          weight: 'bold',

        },

      },

      legend: {

        display: false,

      },

    },

  };

  PieChartOptions: ChartOptions = {

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

      },

    legend: {

      display: true

    }

  }

  };




  chartLegend = true;

  lineChartLegend = true;

  PieChartLegent  = true;

  currentUser: any;

  companyId: any;

  adsCount: number[] = [];

  profileForm!: FormGroup;

  public showDiv = false;

 




  constructor(

    private sessionService: SessionService,

    private router: Router,

    private adService: MyAdService,

    private profileService: ProfileService,

    private inventoryService:UploadInventoryservice

  ) {}




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

    this.inventoryService.getInventoryByIdCID(this.companyId).subscribe(

      (data: any[]) => {

        debugger

        this.inventory_list_by_companyId = data;

        console.log("Inventory list by company ID is fetched: ", this.inventory_list_by_companyId);

   

        let surplusSum = 0;

        let deficitSum = 0;

   

        for (const item of this.inventory_list_by_companyId) {

          if (item.surplus) {

            surplusSum += item.surplus;

          }

          if (item.deficit) {

            deficitSum += item.deficit;

          }

        }

   

        console.log('Surplus Sum:', surplusSum);

        console.log('Deficit Sum:', deficitSum);

      },

      (error: any) => {

        console.log("Inventory loading error: " + error);

      }

    );

   

   

   

    this.sessionService.getCurrentUser().subscribe((user) => {

      if (user.user_id == null) {

        this.router.navigate(['/sign-in']);

      } else {

        this.currentUser = user;

        console.log(

          'From session ' +

            this.currentUser.email +

            ' id here ' +

            this.currentUser.user_id

        );

      }

    });




    this.router.events

      .pipe(filter((event) => event instanceof NavigationEnd && event.url === '/sign-in'))

      .subscribe(() => {

        this.sessionService.clearSession();

      });




    this.profileService.getUserDetails(this.currentUser.user_id).subscribe(

      (data) => {

        this.fname = data.fname;

        console.log(this.fname);

        this.lname = data.lname;

        this.email = data.email;

        this.company_id = data.company_id;

        this.phone = data.phone_no;

        this.designation = data.designation;

        console.log(this.designation);

      },

      (error) => {

        console.warn('oninit error' + error);

      }

    );




    this.adService.getAdsCount(this.companyId).subscribe(

      (count: number[]) => {

        this.adsCount = count;

        this.chartData.datasets[0].data = this.adsCount;

        console.log('Ads count:', this.adsCount);

        console.log('Chart data:', this.chartData);

      },

      (error: any) => {

        console.log(error);

        alert('Error occurred');

      }

    );




    this.profileService.getCompanyById(this.companyId).subscribe(

      (data) => {

        this.company_id = data.company_id;

        this.name = data.name;

        this.licence_id = data.licence_id;

        this.domain_address = data.domain_address;

        this.company_logo = data.company_logo;

        this.company_location = data.company_location;

        this.country = data.country;

        this.rating = data.rating;

        this.address = data.address;

        console.log(data);

      },

      (error) => {

        console.warn('oninit error' + error);

      }

    );




    this.adService.getSpaceAds('space', this.companyId).subscribe(

      (adsblscount: number[]) => {

        this.originalspaceAds = adsblscount;

        console.log('Count of space ads:', this.originalspaceAds);

   

        // Calculate the maximum count from the originalspaceAds array

        const maxCount = Math.max(...this.originalspaceAds);

    console.log(maxCount);

        // Calculate the stepSize dynamically based on the maximum count

        const stepSize = Math.ceil(maxCount / 5);

   

        // Update the lineChartOptions with the dynamic stepSize

        this.lineChartOptions = {

          responsive: false,

          scales: {

            x: {

              display: true,

              title: {

                display: true,

              },

            },

            y: {

              display: true,

              title: {

                display: true,

              },

              ticks: {

                stepSize: stepSize,

                precision: 0,

              },

            },

          },

          plugins: {

            tooltip: {

              callbacks: {

                label: (context) => {

                  const label = context.label || '';

                  const value = context.raw || '';

                  return `${label}: ${value}`;

                },

                title: () => '',

                labelColor: () => ({

                  borderColor: 'transparent',

                  backgroundColor: 'transparent',

                }),

              },

              displayColors: false,

              bodyAlign: 'left',

              bodyFont: {

                weight: 'bold',

              },

            },

            legend: {

              display: false,

            },

          },

        };

   

        // Update the lineChartData with the actual count data

        this.lineChartData.datasets[0].data = this.originalspaceAds;

   

        console.log('Updated lineChartOptions:', this.lineChartOptions);

        console.log('Updated lineChartData:', this.lineChartData);

      },

      (error: any) => {

        console.log(error);

        alert('Error occurred');

      }

    );

   

    this.adService.getContainerAds('container',this.companyId).subscribe(

      (adsblscount: number[]) => {

        debugger

        this.originalcontainerAds = adsblscount;

        console.log('count is are container', this.originalcontainerAds);

        this.PieChartData.datasets[0].data = this.originalcontainerAds;

        console.log("for container",this.PieChartData);

      },

      (error: any) => {

        console.log(error);

        alert('error');

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