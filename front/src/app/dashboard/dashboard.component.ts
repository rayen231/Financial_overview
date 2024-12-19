import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { StockService } from '../stock.service';
import { Router } from '@angular/router'; // Import Router
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { ChartData, ChartOptions, Chart } from 'chart.js';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, LineController, Title, Tooltip, Legend } from 'chart.js';
import { FinanceService } from '../finance.service';
// Register the required components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  LineController,
  Title, 
  Tooltip, 
  Legend
);

interface FinancialOverview {
  totalRevenue: number;
  netProfit: number;
  expenses: number;
  savings: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  financialOverview: FinancialOverview = {
    totalRevenue: 0,
    netProfit: 0,
    expenses: 0,
    savings: 0
  };
  stocks: any[] = [];
  stockPriceChart: ChartData<'line'> = {
    labels: [],  // Stock symbols
    datasets: [
      {
        label: 'Stock Prices',
        data: [],  // Stock prices
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false
      }
    ]
  };
  loading = true; // Start with loading state as true
  firstLoad = true; // Track the first load

  @ViewChild('stockPriceChartCanvas', { static: false }) stockPriceChartCanvas: any;
  private chart: Chart | undefined;


  ngOnInit(): void {
    // Capture the user ID from the query parameters
    let userId: string | null = null;
    this.router.routerState.root.queryParams.subscribe(params => {
      userId = params['userId'];
      if (userId) {
        console.log(`User ID from query params: ${userId}`);
        // You can use the userId for further logic here
        this.getFinancialOverview(userId);
      }
    });
    this.getStocks();
    
    // Set interval to update stock prices every 30 seconds
    setInterval(() => {
      this.getStocks(); // Fetch new stock data every 30 seconds
    }, 30000);
  }

  ngAfterViewInit(): void {
    // Initialize the chart once the view has been initialized
    if (this.stockPriceChartCanvas) {
      this.initializeChart();
    }
  }

  initializeChart(): void {
    if (this.chart) {
      this.chart.destroy();  // Ensure any previous chart instance is destroyed before creating a new one
    }

    const ctx = this.stockPriceChartCanvas.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: this.stockPriceChart,
      options: this.getChartOptions()
    });
  }

  getChartOptions(): ChartOptions {
    return {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Stock Symbols'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Stock Price'
          }
        }
      }
      
    };
  }

  constructor(private stockService: StockService, private router: Router, private financeService: FinanceService) {}

  getFinancialOverview(userId: any): void {
    this.financeService.getWalletInfo(userId).subscribe({
      next: (data) => {
        this.financialOverview = {
          totalRevenue: data.revenue,
          netProfit: data.net,
          expenses: data.expenses,
          savings: data.saving
        };
      },
      error: (err) => {
        console.error('Error fetching financial overview:', err);
      }
    });
  }

  getStocks(): void {
    if (this.firstLoad) {
      this.loading = true; // Show loading spinner only on the first load
      this.firstLoad = false;
    }
    
    this.stockService.getStocks().subscribe({
      next: (data) => {
        this.stocks = data;
        this.updateStockChart();
        
        if (this.stocks.length > 0) {
          this.loading = false; // Hide loading spinner after first data fetch
        }
      },
      error: (err) => {
        console.error('Error fetching stock data:', err);
        this.loading = false; // Hide loading spinner in case of error
      }
    });
  }

  updateStockChart(): void {
    const labels = this.stocks.map(stock => stock.symbol);
    const prices = this.stocks.map(stock => stock.price);

    // Update the chart data and re-render
    this.stockPriceChart.labels = labels;
    this.stockPriceChart.datasets[0].data = prices;

    // Only update the chart if it has been initialized
    if (this.chart) {
      this.chart.update();
    }
  }

  goToStockDetails(symbol: string): void {
    // Navigate to the stock details page with the stock symbol as a route parameter
    this.router.navigate(['/stock-details', symbol]);
  }
}
