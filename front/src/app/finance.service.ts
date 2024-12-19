import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private apiUrl = 'http://127.0.0.1:8000'; // Update with your FastAPI base URL

  constructor(private http: HttpClient) {}

  /**
   * Login user by checking credentials.
   * @param name - The username.
   * @param password - The password.
   * @returns Observable containing the user details if successful.
   */
  login(name: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { name, password });
  }

  /**
   * Get user info by ID.
   * @param id - The user ID.
   * @returns Observable containing user information.
   */
  getUserInfoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-info/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get wallet info by wallet ID.
   * @param walletId - The wallet ID.
   * @returns Observable containing wallet information.
   */
  getWalletInfo(walletId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/walet-info/${walletId}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handles HTTP errors.
   * @param error - The HTTP error response.
   * @returns Throws an error.
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
