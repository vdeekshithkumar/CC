import { Component, Injectable, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';
import { Chart, ChartData, ChartOptions, ChartType } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ProfileService } from '../profile/profile.service';
import { MyAdService } from '../my-advertisement/my-ad.service';
import { NegotiationsService } from '../negotiations/negotiations.service';
import { DashboardServiceService } from './dashboard.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  first_name?: string;
  last_name?: string;
  public company_id?: number;

  // Dashboard specifications constants
  public readonly DONUT_INNER_RADIUS = '60%';
  public readonly CHART_COLORS = {
    BLUE_DARK: '#1E40AF',
    BLUE_MEDIUM: '#3B82F6',
    BLUE_LIGHT: '#60A5FA',
    BLUE_VLIGHT: '#93C5FD',
    BLUE_LIGHTEST: '#BFDBFE',
    TEAL_GRADIENT: ['#5EEAD4', '#99F6E4'],
    CYAN_GRADIENT: ['#22D3EE', '#67E8F9']
  };

  // CARD 1: Containers
  public PieChartData: ChartData<'doughnut', number[], string> = {
    labels: ['SELL', 'BUY', 'SWAP', 'LEASE', 'ONEWAY'],
    datasets: [{
      data: [7, 5, 1, 0, 0],
      backgroundColor: [
        this.CHART_COLORS.BLUE_DARK,
        this.CHART_COLORS.BLUE_MEDIUM,
        this.CHART_COLORS.BLUE_LIGHT,
        this.CHART_COLORS.BLUE_VLIGHT,
        this.CHART_COLORS.BLUE_LIGHTEST
      ],
      hoverBackgroundColor: [
        this.CHART_COLORS.BLUE_DARK,
        this.CHART_COLORS.BLUE_MEDIUM,
        this.CHART_COLORS.BLUE_LIGHT,
        this.CHART_COLORS.BLUE_VLIGHT,
        this.CHART_COLORS.BLUE_LIGHTEST
      ],
      borderWidth: 0
    }]
  };

  // CARD 3: My Advertisements
  public chartData: ChartData<'doughnut', number[], string> = {
    labels: ['Active', 'Pending', 'Drafts'],
    datasets: [{
      data: [7, 4, 1],
      backgroundColor: [
        this.CHART_COLORS.BLUE_MEDIUM,
        this.CHART_COLORS.BLUE_DARK,
        this.CHART_COLORS.BLUE_LIGHT
      ],
      borderWidth: 0
    }]
  };

  // CARD 5: Open Negotiations
  public negotiationchartData: ChartData<'doughnut', number[], string> = {
    labels: ['Accepted', 'Pending'],
    datasets: [{
      data: [3, 3],
      backgroundColor: [
        '#10B981', // Accepted - Teal
        '#6366F1'  // Pending - Purple
      ],
      hoverBackgroundColor: [
        '#14B8A6',
        '#8B5CF6'
      ],
      borderWidth: 0,
      borderRadius: 10
    }]
  };

  public get negotiationTotal(): number {
    return this.negotiationchartData.datasets[0].data.reduce((a, b) => a + b, 0);
  }

  // Common Donut Options
  public donutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: { display: false },
      datalabels: { display: false }
    }
  };

  // CARD 2: Space (Bar Chart)
  public lineChartData: ChartData<'bar', number[], string> = {
    labels: ['BUY', 'SELL', 'LEASE'],
    datasets: [{
      data: [1, 1, 1],
      backgroundColor: (ctx) => {
        const canvas = ctx.chart.ctx;
        const gradient = canvas.createLinearGradient(0, 0, 0, 200);
        if (ctx.dataIndex === 0) { // BUY (Teal)
          gradient.addColorStop(0, '#5EEAD4');
          gradient.addColorStop(1, '#99F6E4');
        } else if (ctx.dataIndex === 1) { // SELL (Blue)
          gradient.addColorStop(0, '#60A5FA');
          gradient.addColorStop(1, '#93C5FD');
        } else { // LEASE (Cyan)
          gradient.addColorStop(0, '#22D3EE');
          gradient.addColorStop(1, '#67E8F9');
        }
        return gradient;
      },
      borderRadius: { topLeft: 8, topRight: 8 },
      barThickness: 40
    }]
  };

  public lineChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 14, weight: '500' }, color: '#374151' }
      },
      y: { display: false, max: 2 }
    },
    plugins: {
      legend: { display: false },
      datalabels: { display: false }
    }
  };

  // CARD 4: Inventory Balance
  public surplusDeficitData = { surplus: 21, deficit: 5, max: 25 };

  public get netBalance(): number {
    return this.surplusDeficitData.surplus - this.surplusDeficitData.deficit;
  }

  constructor(
    private sessionService: SessionService,
    private profileService: ProfileService,
    private dashboardService: DashboardServiceService
  ) { }

  ngOnInit(): void {
    this.sessionService.getCurrentUser().subscribe((user: any) => {
      if (user) {
        this.first_name = user.first_name;
        this.last_name = user.last_name;
      }
    });
    this.sessionService.getCompanyId().subscribe((id: number) => this.company_id = id);
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }
}
