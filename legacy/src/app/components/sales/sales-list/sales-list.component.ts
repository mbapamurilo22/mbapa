import { Component, OnInit } from '@angular/core';
import { Sale } from '../../../model/Sale';
import { SalesService } from '../../../services/sales.service'; 

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css'],
})

export class SalesListComponent implements OnInit {
  list: Array<Sale> = [];

  constructor(private apiService: SalesService) {
    this.listSales();
  }

  ngOnInit() {}

  listSales() {
    this.apiService.getSales().subscribe((data) => {
      this.list = data;
    });
  }

  removeSale(sale) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deleteSale(sale._id).subscribe((data) => {
        this.list = data;
      });
    }
  }
}
