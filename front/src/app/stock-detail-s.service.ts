// stock-detail-s.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockDetailsService {
  private apiUrl = 'http://127.0.0.1:8000/stock-news';  // Correct base URL

  constructor(private http: HttpClient) {}

  getStockDetails(symbol: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${symbol}`);  // Append the stock symbol
  }
}
