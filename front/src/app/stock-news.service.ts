// stock-news.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockNewsService {
  private apiUrl = 'http://127.0.0.1:8000/general-stock-news';  // API URL

  constructor(private http: HttpClient) {}

  getStocknews(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);  // Fetches the news data
  }
}
