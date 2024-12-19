import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUrl = 'http://127.0.0.1:8000/products'; // FastAPI backend endpoint
  constructor(private http: HttpClient) { 
    console.log('hmdlh instantiated');
  }
  // Get all Products
  public getProducts(): Observable<any[]> {
    return this.http.get<{ products: Product[] }>(this.apiUrl).pipe(
    map((response: { products: Product[] }) => response.products) // Extract the "products" array from the response
  );
  }
  public getProduct(productId: number): Observable<Product> {
    const url = `${this.apiUrl}/${productId}`;
    this.http.get<Product>(url).subscribe(product => {
      console.log('Fetched Product:', product);
    });
    return this.http.get<{ product: Product }>(url).pipe(
      map(response => response.product)  // Extract the nested product object
    );
}
  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
}
public deleteProduct(productId: number): Observable<void> {
  const url = `${this.apiUrl}/${productId}`;
  return this.http.delete<void>(url);
}

public editProduct(product: Product): Observable<Product> {
  const url = `${this.apiUrl}/${product.id}`;
  return this.http.put<Product>(url, product);
}
}
