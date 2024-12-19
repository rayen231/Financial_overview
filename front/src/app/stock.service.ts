import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private apiUrl = 'http://127.0.0.1:8000/stocks'; // FastAPI backend endpoint

  constructor(private http: HttpClient) {
    console.log('StockService instantiated');
  }

  // Get all stocks
  getStocks(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.stocks) // Extract the "stocks" array from the response
    );
  }

  // Get stock by symbol
  getStock(symbol: string): Observable<Stock> {
    return this.http.get<Stock>(`${this.apiUrl}/${symbol}`);
  }

  // Method to fetch stock details by symbol
  getStockDetails(symbol: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/details/${symbol}`);
  }
}
