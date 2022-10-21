import { NgModule } from '@angular/core';  
import { CommonModule } from '@angular/common'; 
import { ProductListComponent } from './products-list/products-list.component';
import { ProductUpsertComponent } from './products-upsert/products-upsert.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ 
    ProductListComponent,  
    ProductUpsertComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [ProductsService], 
})
export class ProductsModule {}
