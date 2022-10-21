import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient, 
} from '@angular/common/http';
import { ApiService } from './api.service';
import { Client } from '../model/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientsService extends ApiService { 

  constructor(private http: HttpClient) {
    super();
    this.baseUri += "/clients"
  }

  // Create
  createClient(data: Client): Observable<Client> {
    let url = `${this.baseUri}/create`;
    return this.http.post<Client>(url, data).pipe(catchError(this.errorMgmt));
  }

  // Get all clients
  getClients(): Observable<Array<Client>> {
    return this.http.get<Array<Client>>(`${this.baseUri}`);
  }

  // Get client
  getClient(id): Observable<Client> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get<Client>(url, { headers: this.headers }).pipe(       
      catchError(this.errorMgmt)
    );
  }

  // Update client
  updateClient(data: Client): Observable<Client> {
    let url = `${this.baseUri}/update/${data._id}`;
    return this.http
      .put<Client>(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete client
  deleteClient(id): Observable<Array<Client>> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http
      .delete<Array<Client>>(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

}
