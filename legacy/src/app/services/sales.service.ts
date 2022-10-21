import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient, 
} from '@angular/common/http';
import { ApiService } from './api.service';
import { Sale } from '../model/Sale';

@Injectable({
  providedIn: 'root',
})
export class SalesService extends ApiService { 

  constructor(private http: HttpClient) {
    super();
    this.baseUri += "/sales"
  }

  // Create
  createSale(data: Sale): Observable<Sale> {
    let url = `${this.baseUri}/create`;
    return this.http.post<Sale>(url, data).pipe(catchError(this.errorMgmt));
  }

  // Get all sales
  getSales(): Observable<Array<Sale>> {
    return this.http.get<Array<Sale>>(`${this.baseUri}`);
  }

  // Get sale
  getSale(id): Observable<Sale> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get<Sale>(url, { headers: this.headers }).pipe(       
      catchError(this.errorMgmt)
    );
  }

  // Update sale
  updateSale(data: Sale): Observable<Sale> {
    let url = `${this.baseUri}/update/${data._id}`;
    return this.http
      .put<Sale>(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete sale
  deleteSale(id): Observable<Array<Sale>> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http
      .delete<Array<Sale>>(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

}
