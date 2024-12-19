import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; // Import Location for navigation
import { CommonModule } from '@angular/common';  // Import CommonModule
import { StockDetailsService } from '../stock-detail-s.service';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart, ChartData, ChartOptions, CategoryScale, LinearScale, PointElement, LineElement, LineController, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

@Component({
  selector: 'app-stock-details',
  standalone: true,
  imports: [CommonModule],  // Add CommonModule to imports array
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit, AfterViewInit {
  stockSymbol: string = '';
  stockDetails: any = null;
  errorMessage: string = '';
  priceHistoryChartData: ChartData<'line'> | null = null; // Initialized as null
  priceHistoryChartLabels: string[] = [];
  chart: any;
  loading: boolean = true; // Add loading variable

  constructor(
    private route: ActivatedRoute,
    private stockDetailsService: StockDetailsService,
    private location: Location // Inject Location
    
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.stockSymbol = params['symbol'];
      this.loadStockDetails();
    });
    if (this.stockDetails?.stock_news) {
      this.updateVisibleNews();
    }
    this.nextNews();
  }

  ngAfterViewInit(): void {
    // Ensure chart creation only when data is available
    if (this.priceHistoryChartData) {
      this.createChart();
    }
  }
  ngAfterViewChecked(): void {
    if (this.priceHistoryChartData && !this.chart) {
      this.createChart();
    }
  }

  loadStockDetails(): void {
    this.loading = true; // Set loading to true when service starts
    this.stockDetailsService.getStockDetails(this.stockSymbol).subscribe({
      next: (data) => {
        this.stockDetails = data;
        this.preparePriceHistoryChart();
        this.loading = false; // Set loading to false when service ends
      },
      error: (error) => {
        this.errorMessage = `Error fetching details: ${error.message}`;
        this.loading = false; // Set loading to false when service ends
      }
    });
  }

  preparePriceHistoryChart(): void {
    if (this.stockDetails && this.stockDetails.price_history) {
      const prices = this.stockDetails.price_history.map((item: any) => item.close);
      const dates = this.stockDetails.price_history.map((item: any) => new Date(item.date).toLocaleDateString());

      this.priceHistoryChartData = {
        labels: dates,
        datasets: [{
          label: 'Close Price',
          data: prices,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.4
        }]
      };
      this.priceHistoryChartLabels = dates;

      // Delay chart creation until after data is set
      this.createChart();
    }
  }

  createChart(): void {
    if (this.priceHistoryChartData) {
      const ctx = document.getElementById('priceHistoryChart') as HTMLCanvasElement;
      if (ctx) {
      console.log("Chart data", this.priceHistoryChartData);
      console.log("Creating chart...");
        this.chart = new Chart(ctx, {
          type: 'line',
          data: this.priceHistoryChartData,
          options: this.chartOptions()
        });
      }
    }
  }

  chartOptions(): ChartOptions {
    return {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Stock Price History'
        },
        tooltip: {
          mode: 'nearest',
          intersect: false,
        },
        zoom: {
          pan: {
            enabled: true,
            mode: 'xy',  // Pan both x and y axes
          },
          zoom: {
            wheel: {
              enabled: true,
              speed: 0.1,  // Speed of zooming
            },
            pinch: {
              enabled: true
            },
            mode: 'xy',  // Zoom on both x and y axes
          }
        }
      },
      scales: {
        x: {
          ticks: {
            maxRotation: 45,
            minRotation: 45
          }
        },
        y: {
          beginAtZero: false,
          ticks: {
            stepSize: 10
          }
        }
      }
    };
  }
  // Declare visibleNews array and carousel-related methods for the task
visibleNews: any[] = [];

updateVisibleNews() {
  // Display the first 3 news items
  this.visibleNews = this.stockDetails.stock_news.slice(0, 3);
}

previousNews() {
  // Shift the first news item to the end of the array
  if (!this.stockDetails?.stock_news) return;
  const news = this.stockDetails.stock_news;
  const firstNews = news.shift();
  if (firstNews) news.push(firstNews);
  this.updateVisibleNews();
}

nextNews() {
  // Move the last news item to the beginning of the array
  if (!this.stockDetails?.stock_news) return;
  const news = this.stockDetails.stock_news;
  const lastNews = news.pop();
  if (lastNews) news.unshift(lastNews);
  this.updateVisibleNews();
}

toggleHover(event: MouseEvent, isHovered: boolean) {
  // Handle hover effect for the news cards
  const target = event.currentTarget as HTMLElement;
  if (isHovered) {
    target.classList.add('hover');
  } else {
    target.classList.remove('hover');
  }
}
openNews(url: string): void {
  if (url) {
    window.open(url, '_blank');
  }
}
refreshPrice(): void {
  // Logic to refresh stock price
  console.log('Refreshing stock price');
  // Call the API to get the new price
}
goBack(): void {
  this.location.back(); // Navigate to the previous page
}

}
