import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common'; // Import Location for navigation
import { Router } from '@angular/router'; // Import Router for navigation
import { StockService } from '../stock.service'; 
import { Stock } from './stock.model'; 

@Component({
  selector: 'app-stocks-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stocks-view.component.html',
  styleUrls: ['./stocks-view.component.css'],
})
export class StocksViewComponent implements OnInit {
  searchQuery: string = '';
  stock: Stock | null = null; 
  errorMessage: string = ''; 
  famousStocks: Stock[] = []; 
  Loading: boolean = true; 

  constructor(
    private stockService: StockService,
    private router: Router,
    private location: Location ,// Inject Location service,
  ) {}

  ngOnInit(): void {
    this.fetchFamousStocks(); // Load famous stocks on component initialization // Show loading spinner
  }

  searchStock(): void {
    if (this.searchQuery.trim() === '') {
      this.errorMessage = 'Please enter a stock symbol.';
      this.Loading = false; // Hide loading spinner
      return;
    }

    this.Loading = true;// Show loading spinner

    this.stockService.getStock(this.searchQuery).subscribe(
      (data: Stock) => {
        this.stock = data;
        this.errorMessage = '';
        this.Loading = false;  // Hide loading spinner
      },
      (error) => {
        this.errorMessage = 'Error fetching stock data. Please try again.';
        this.stock = null;
        this.Loading = false;// Hide loading spinner in case of error
      }
    );
  }

  fetchFamousStocks(): void {
    this.Loading = true ;// Show loading spinner

    this.stockService.getStocks().subscribe(
      (data: Stock[]) => {
        this.famousStocks = data;
        this. Loading= false; // Hide loading spinner after fetching famous stocks
      },
      (error) => {
        console.error('Error fetching famous stocks:', error);
        this.Loading = false; // Hide loading spinner in case of error
      }
    );
  }

  goToStockDetails(symbol: string): void {
    this.router.navigate(['/stock-details', symbol]); // Navigate to stock-details with the stock symbol
  }
  
  goBack(): void {
    this.location.back(); // Navigate to the previous page
  }
}