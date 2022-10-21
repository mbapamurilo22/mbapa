import { Component, OnInit } from '@angular/core';
import { Product } from '../../../model/Product';
import { ProductsService } from '../../../services/products.service'; 

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})

export class ProductListComponent implements OnInit {
  list: Array<Product> = [];

  constructor(private apiService: ProductsService) {
    this.listProducts();
  }

  ngOnInit() {}

  listProducts() {
    this.apiService.getProducts().subscribe((data) => {
      this.list = data;
    });
  }

  removeProduct(product) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deleteProduct(product._id).subscribe((data) => {
        this.list = data;
      });
    }
  }
}
