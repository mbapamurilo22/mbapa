import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientUpsertComponent } from './components/clients/client-upsert/client-upsert.component';  
import { ClientListComponent } from './components/clients/client-list/client-list.component'; 

import { ProductUpsertComponent } from './components/products/products-upsert/products-upsert.component';
import { ProductListComponent } from './components/products/products-list/products-list.component';
 
import { SaleUpsertComponent } from './components/sales/sales-upsert/sales-upsert.component';
import { SalesListComponent } from './components/sales/sales-list/sales-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'client-list' },

  { path: 'client-upsert', component: ClientUpsertComponent }, 
  { path: 'client-upsert/:id', component: ClientUpsertComponent }, 
  { path: 'client-list', component: ClientListComponent },
  
  { path: 'product-upsert', component: ProductUpsertComponent },
  { path: 'product-upsert/:id', component: ProductUpsertComponent }, 
  { path: 'product-list', component: ProductListComponent }, 
  
  { path: 'sale-upsert', component: SaleUpsertComponent },
  { path: 'sale-upsert/:id', component: SaleUpsertComponent }, 
  { path: 'sale-list', component: SalesListComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
