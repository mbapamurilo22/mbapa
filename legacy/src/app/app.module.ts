import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 

import { ClientsModule } from './components/clients/clients.module';
import { ProductsModule } from './components/products/products.module';
import { SalesModule } from './components/sales/sales.module';

@NgModule({
  declarations: [
    AppComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    
    ClientsModule,
    ProductsModule,
    SalesModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
