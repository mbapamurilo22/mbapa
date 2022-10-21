import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient, 
} from '@angular/common/http';
import { ApiService } from './api.service';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ApiService { 

  constructor(private http: HttpClient) {
    super();
    this.baseUri += "/products"
  }

  // Create
  createProduct(data: Product): Observable<Product> {
    let url = `${this.baseUri}/create`;
    return this.http.post<Product>(url, data).pipe(catchError(this.errorMgmt));
  }

  // Get all products
  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`${this.baseUri}`);
  }

  // Get product
  getProduct(id): Observable<Product> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get<Product>(url, { headers: this.headers }).pipe(       
      catchError(this.errorMgmt)
    );
  }

  // Update product
  updateProduct(data: Product): Observable<Product> {
    let url = `${this.baseUri}/update/${data._id}`;
    return this.http
      .put<Product>(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete product
  deleteProduct(id): Observable<Array<Product>> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http
      .delete<Array<Product>>(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

}
