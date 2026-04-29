import { Component, Injectable, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';
import { Chart, ChartData, ChartOptions, ChartType } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ProfileService } from '../profile/profile.service';
import { MyAdService } from '../my-advertisement/my-ad.service';
import { NegotiationsService } from '../negotiations/negotiations.service';
import { DashboardServiceService } from './dashboard.service';
import { ThemeService } from '../theme.service';

// Register the plugin to ensure it works
Chart.register(ChartDataLabels);

@Injectable({
  providedIn: 'root'
})
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    standalone: false
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
      data: [7, 5, 1, 4, 2],
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
      data: [6, 4, 1],
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
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          padding: 20,
          font: {
            size: 11
          }
        }
      },
      datalabels: {
        display: true,
        color: '#ffffff',
        font: {
          weight: 'bold',
          size: 12
        },
        formatter: (value) => {
          return value > 0 ? value : '';
        }
      }
    }
  };

  // CARD 2: Space (Bar Chart)
  public lineChartData: ChartData<'bar', number[], string> = {
    labels: ['BUY', 'SELL', 'LEASE' ,'RENT'],
    datasets: [{
      data: [4, 3, 6, 2],
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
    layout: {
      padding: { top: 20 }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 14, weight: 500 }, color: '#374151' }
      },
      y: {
        display: false,
        grace: '10%'
      }
    },
    plugins: {
      legend: { display: false },
      datalabels: {
        display: true,
        anchor: 'end',
        align: 'end',
        color: '#374151',
        font: {
          weight: 'bold',
          size: 12
        }
      }
    }
  };

  // CARD 3: My Advertisements stats (used for display + insight)
  public adStats = { active: 7, pending: 4, drafts: 1 };

  // CARD 4: Inventory Balance
  public surplusDeficitData = { surplus: 21, deficit: 5, max: 25 };

  public get netBalance(): number {
    return this.surplusDeficitData.surplus - this.surplusDeficitData.deficit;
  }

  // ── AI Insight Getters ────────────────────────────────────────────────────

  get containerInsight(): string {
    const data = this.PieChartData.datasets[0].data as number[];
    const labels = this.PieChartData.labels as string[];
    const total = data.reduce((a, b) => a + b, 0);
    const maxIdx = data.indexOf(Math.max(...data));
    const pct = Math.round((data[maxIdx] / total) * 100);
    return pct > 35
      ? `${labels[maxIdx]} leads at ${pct}% — high concentration. Consider diversifying container types.`
      : `${labels[maxIdx]} leads at ${pct}%. Distribution is balanced across all types.`;
  }

  get spaceInsight(): string {
    const data = this.lineChartData.datasets[0].data as number[];
    const labels = this.lineChartData.labels as string[];
    const maxIdx = data.indexOf(Math.max(...data));
    const minIdx = data.indexOf(Math.min(...data));
    return `${labels[maxIdx]} space leads at ${data[maxIdx]} units. ${labels[minIdx]} is lowest at ${data[minIdx]} — potential underutilized revenue.`;
  }

  get adsInsight(): string {
    const { active, pending, drafts } = this.adStats;
    const total = active + pending + drafts;
    const pendingPct = Math.round((pending / total) * 100);
    if (pendingPct >= 30) {
      return `${pendingPct}% of ads are pending — above the healthy 20% mark. Review and activate to maximise exposure.`;
    }
    return `${active} active ads running. ${drafts > 0 ? `${drafts} draft${drafts > 1 ? 's' : ''} ready to publish.` : 'No drafts pending.'}`;
  }

  get inventoryInsight(): string {
    const { surplus, deficit } = this.surplusDeficitData;
    const net = surplus - deficit;
    if (deficit === 0) return `No deficit detected. Surplus of ${surplus} units is fully healthy.`;
    const ratio = Math.round((deficit / surplus) * 100);
    return ratio >= 25
      ? `Deficit is ${ratio}% of surplus — risk of per diem charges. Consider repositioning idle units.`
      : `Net balance of +${net} is healthy. Monitor ${deficit} deficit unit${deficit > 1 ? 's' : ''} to avoid idle charges.`;
  }

  get negotiationsInsight(): string {
    const data = this.negotiationchartData.datasets[0].data as number[];
    const accepted = data[0];
    const pending = data[1];
    const total = accepted + pending;
    if (total === 0) return 'No active negotiations. Post new ads to start trading.';
    const pendingPct = Math.round((pending / total) * 100);
    return pendingPct >= 50
      ? `${pending} of ${total} negotiations still pending. Follow up — average close time is 4 days.`
      : `${accepted} of ${total} negotiations accepted — ${Math.round((accepted / total) * 100)}% close rate this period.`;
  }

  constructor(
    private sessionService: SessionService,
    private profileService: ProfileService,
    private dashboardService: DashboardServiceService,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.sessionService.getCurrentUser().subscribe((user: any) => {
      if (user) {
        this.first_name = user.first_name;
        this.last_name = user.last_name;
      }
    });
    this.sessionService.getCompanyId().subscribe((id: number) => this.company_id = id);

    // Subscribe to theme changes to update chart colors
    this.themeService.isDarkTheme$.subscribe(isDark => {
      this.updateChartTheme(isDark);
    });
  }

  updateChartTheme(isDark: boolean) {
    const textColor = isDark ? '#9CA3AF' : '#374151';

    // Update Line/Bar Chart Options
    this.lineChartOptions = {
      ...this.lineChartOptions,
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { size: 14, weight: 500 }, color: textColor }
        },
        y: { display: false, grace: '10%' }
      }
    };
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }
}
