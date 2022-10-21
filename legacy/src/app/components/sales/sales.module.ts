import { NgModule } from '@angular/core';  
import { CommonModule } from '@angular/common';  
import { SaleUpsertComponent } from './sales-upsert/sales-upsert.component';
import { SalesListComponent } from './sales-list/sales-list.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ 
    SaleUpsertComponent,
    SalesListComponent
  ],
  imports: [ 
    CommonModule,
    RouterModule, 
    ReactiveFormsModule
  ],
  providers: [], 
})
export class SalesModule {}
