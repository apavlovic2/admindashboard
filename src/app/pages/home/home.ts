import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CardModule, ChartModule, DividerModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  transactionsChartData!: ChartData<'line'>;
  usersChartData!: ChartData<'line'>;
  paymentStatusChartData!: ChartData<'pie'>;
  chartOptions!: ChartOptions;
  paymentStatusOptions!: ChartOptions<'pie'>;

  ngOnInit(): void {
    this.initCharts();
  }

  private initCharts(): void {
  const last30Days: string[] = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
  const successfulTransactions: number[] = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 50);
  const newUsers: number[] = Array.from({ length: 30 }, () => Math.floor(Math.random() * 50) + 10);
  

  this.transactionsChartData = {
    labels: last30Days,
    datasets: [
      {
        label: 'Successful Transactions',
        data: successfulTransactions,
        fill: true,
        borderColor: '#42A5F5',
        tension: 0.4,
        backgroundColor: 'rgba(66,165,245,0.2)',
      },
    ],
  };

  this.usersChartData = {
    labels: last30Days,
    datasets: [
      {
        label: 'New Users',
        data: newUsers,
        fill: true,
        borderColor: '#66BB6A',
        tension: 0.4,
        backgroundColor: 'rgba(102,187,106,0.2)',
      },
    ],
  };

  this.paymentStatusChartData = {
    labels: ['Created', 'Successful', 'Unsuccessful'],
    datasets: [
      {
        label: 'Payment Status',
        data: [120, 300, 50],
        backgroundColor: ['#FFCE5620', '#36A2EB20', '#FF638420'],
        hoverBackgroundColor: ['#ca9d28ff', '#1478bbff', '#c12c4cff'],
        borderColor: ['#FFCE56', '#36A2EB', '#FF6384'],
      },
    ],
  };

  this.chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#ffffff' } },
    },
    scales: {
      x: {
        ticks: { color: '#ffffff' },
        grid: { color: '#ffffff' },
      },
      y: {
        ticks: { color: '#ffffff' },
        grid: { color: '#ffffff' },
      },
    },
  };

  this.paymentStatusOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#ffffff' } },
    },
  };
}
}