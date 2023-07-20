import { Component, Injectable, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Chart, ChartData, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { Advertisement, MyAdService } from '../my-advertisement/my-ad.service';
import { FormGroup } from '@angular/forms';
import { ProfileService } from '../profile/profile.service';
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';
import { UploadInventoryservice } from '../upload-inventory/upload-inventory.service';
import { NegotiationsService } from '../negotiations/negotiations.service';


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
  lineChartLabels: any;
    // Optional: Add the following properties if needed (remove these if not required)
    public horizontalBarChartType: ChartType = 'bar';
    public horizontalBarChartLegend = true;
    public horizontalBarChartPlugins = [];
  
  originalspaceAds: number[] = [];
  originalcontainerAds: number[] = [];
  chartLegend = true;
  lineChartLegend = true;
  currentUser: any;
  companyId: any;
  adsCount: number[] = [];
  negotiationCount:number[] = [];
  profileForm!: FormGroup;
  public showDiv = false;
  inventory_list_by_companyId: any[] =[];
  chartData: ChartData<any, number[], string> = {
    labels: ['Active', 'Pending', 'Drafts'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#65B3FC', '#0068CB', '#668FEA'],
        hoverBackgroundColor: ['#65B3FC', '#0068CB', '#668FEA'],
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
            backgroundColor: 'transparent',
          }),
        },
        displayColors: false,
        bodyAlign: 'left',
        bodyFont: {
          weight: 'bold',
        },
      },
      datalabels: {
        formatter: (value: any, ctx: Context) => {
          const totalCount = ctx.chart.data.datasets.reduce(
            (acc: number, dataset: ChartDataset<any>) => {
              const datasetValues = dataset.data || [];
              const datasetSum = datasetValues.reduce((sum: number, val: number | null) => sum + (val || 0), 0);
              return acc + datasetSum;
            },
            0
          );
          const percentage = ((value * 100) / totalCount).toFixed(0) + '%';
  
          // Check if value is zero and return an empty string
          if (value === 0) {
            return '';
          }
  
          return percentage; // Display count as percentage
        },
        color: '#000',
        anchor: 'end',
        align: 'start',
        offset: 6,
        clamp: true,
        font: {
          weight: 'bold',
        },
      },
    },
  };
  lineChartData: ChartData<any, number[], string> = {
    labels: ['BUY', 'SELL','LEASE', 'SWAP'],
    datasets: [
      {
        label: 'Space',
        data: [],
        backgroundColor: ['#B8E5D8', '#2F82A4', '#4CAABC','#0097BC'],
        borderColor: ['#B8E5D8', '#2F82A4', '#4CAABC','#0097BC'],
        borderWidth: 1
      }
    ]
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
          stepSize: 2,
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
      datalabels: {
        display: false, 
      },
      legend: {
        display: false,
      },
    },
  };
  
  PieChartData: ChartData<any, number[], string> = {
    labels: ['BUY', 'SELL','LEASE', 'SWAP'],
    datasets: [
      {
        label: 'Space',
        data: [],
        backgroundColor: ['#AAD5F7', '#1D69A5', '#2997EC','#69B6F1'],
        borderColor: ['#AAD5F7', '#1D69A5', '#2997EC','#69B6F1'],
        borderWidth: 1
      }
    ]
  };
  PieChartOptions: ChartOptions = {
    responsive: false,
    plugins: {
      datalabels: {
        formatter: (value: any, ctx: Context) => {
          const label = ctx.chart.data.labels?.[ctx.dataIndex] ?? '';
          const count = ctx.chart.data.datasets?.[0].data?.[ctx.dataIndex] ?? 0;
          return count > 0 ? `${label}` : ''; // Display label only if count is greater than zero
        },
        color: '#000',
        anchor: 'end',
        align: 'start',
        offset: 6,
        clamp: true,
        font: {
          family: 'Poppins',
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || '';
            return `${label}: ${value}`; // Display label and its count
          },
          title: () => '',
          labelColor: () => ({
            borderColor: 'transparent',
            backgroundColor: 'transparent',
          }),
        },
        displayColors: false,
        bodyAlign: 'left',
       
      },
    },
  };
  horizontalBarGraphData: ChartData<any, number[], string> = {
    labels: ['Deficit', 'Surplus'],
    datasets: [
      {
        label: 'Horizontal Bar Chart',
        data: [0, 0], // Set initial data values to 0
        backgroundColor: ['#A7B8C5', '#DCDDC5'],
        hoverBackgroundColor: ['#A7B8C5', '#DCDDC5'],
      },
    ],
  };
  
  horizontalBarChartOptions: ChartOptions = {
    responsive: false,
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        reverse: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
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
      datalabels: {
        // Display value on top of the bar
        display: true,
        formatter: (value: any) => {
          return value > 0 ? value.toString() : ''; // Display value only if greater than 0
        },
        color: '#000',
        anchor: 'end',
        align: 'start',
        clamp: true,
        font: {
          weight: 'bold',
        },
      },
    },
  };
  negotiationchartData: ChartData<any, number[], string> = {
    labels: ['Accepted', 'Pending', 'Rejected'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#65B3FC', '#0068CB', '#668FEA'],
        hoverBackgroundColor: ['#65B3FC', '#0068CB', '#668FEA'],
      }
    ]
  };
  negotiationchartOptions: ChartOptions = {
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
            backgroundColor: 'transparent',
          }),
        },
        displayColors: false,
        bodyAlign: 'left',
        bodyFont: {
          weight: 'bold',
        },
      },
      datalabels: {
        formatter: (value: any, ctx: Context) => {
          const totalCount = ctx.chart.data.datasets.reduce(
            (acc: number, dataset: ChartDataset<any>) => {
              const datasetValues = dataset.data || [];
              const datasetSum = datasetValues.reduce((sum: number, val: number | null) => sum + (val || 0), 0);
              return acc + datasetSum;
            },
            0
          );
          const percentage = ((value * 100) / totalCount).toFixed(0) + '%';
  
          // Check if value is zero and return an empty string
          if (value === 0) {
            return '';
          }
  
          return percentage; // Display count as percentage
        },
        color: '#000',
        anchor: 'end',
        align: 'start',
        offset: 6,
        clamp: true,
        font: {
          weight: 'bold',
        },
      },
    },
  };
  constructor(
    private sessionService: SessionService,
    private router: Router,
    private adService: MyAdService,
    private profileService: ProfileService,
    private inventoryService:UploadInventoryservice,
    private negotiationService:NegotiationsService
  ) {}

  ngOnInit(): void {
    Chart.register(ChartDataLabels);

    const horizontalBarChartCanvas = document.getElementById('horizontalBarChart') as HTMLCanvasElement;

    // Create the horizontal bar chart with plugins
    const horizontalBarChart = new Chart(horizontalBarChartCanvas, {
      type: 'bar',
      data: this.horizontalBarGraphData,
      options: this.horizontalBarChartOptions,
      plugins: [ChartDataLabels], // Add the datalabels plugin
    });
  
    this.sessionService.getCompanyId().subscribe(
      (companyId: number) => {
        this.companyId = companyId;
        console.log('company ID is:', companyId);
      },
      (error: any) => {
        console.error('Error retrieving company ID:', error);
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
   // Inside the subscription where you calculate the surplusSum and deficitSum
   this.inventoryService.getInventoryByIdCID(this.companyId).subscribe(
    (data: any[]) => {
      this.inventory_list_by_companyId = data;
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

      // Update the data and labels for the chart
      this.horizontalBarGraphData.datasets[0].data = [deficitSum, surplusSum];
      console.log(this.horizontalBarGraphData);

      // Update the chart to reflect the changes
      horizontalBarChart.update();
    },
    (error: any) => {
      console.log("Inventory loading error: " + error);
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

    this.adService.getSpaceAds('space',this.companyId).subscribe(
      (adsblscount: number[]) => {
        debugger
        this.originalspaceAds = adsblscount;
        console.log('count is are space', this.originalspaceAds);
        this.lineChartData.datasets[0].data = this.originalspaceAds;
        console.log(this.lineChartData);
      },
      (error: any) => {
        console.log(error);
        alert('error');
      }
    );
    this.adService.getContainerAds('container',this.companyId).subscribe(
      (adsblscount: number[]) => {
        debugger
        this.originalcontainerAds = adsblscount;
        console.log('count is are container', this.originalcontainerAds);
        this.PieChartData.datasets[0].data = this.originalcontainerAds;
        console.log(this.PieChartData);
      },
      (error: any) => {
        console.log(error);
        alert('error');
      }
    );
    this.negotiationService.getNegotiationsByCount(this.companyId).subscribe(
      (count: number[]) => {
        debugger
        this.negotiationCount = count;
        this.negotiationchartData.datasets[0].data = this.negotiationCount;
        console.log('negotiation count:', this.negotiationCount);
        console.log(' negotiation Chart data:', this.negotiationchartData);
      },
      (error: any) => {
        console.log(error);
        alert('Error occurred');
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