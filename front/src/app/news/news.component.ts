import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { StockNewsService } from '../stock-news.service';  // Correct path to your service

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],  // Import CommonModule here
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  stockNews: any[] = [];
  loading: boolean = true; // Add loading state

  constructor(private stockNewsService: StockNewsService) {}

  ngOnInit(): void {
    this.fetchStockNews();
  }

  fetchStockNews(): void {
    this.stockNewsService.getStocknews().subscribe(
      (news: any[]) => {
        this.stockNews = news;
        this.loading = false; // Set loading to false once data is fetched
      },
      (error: any) => {
        console.error('Error fetching stock news:', error);
        this.loading = false; // Set loading to false in case of error as well
      }
    );
  }
}
