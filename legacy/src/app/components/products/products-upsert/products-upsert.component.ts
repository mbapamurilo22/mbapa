import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../../model/Product';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-products-upsert',
  templateUrl: './products-upsert.component.html',
  styleUrls: ['./products-upsert.component.css'],
})
export class ProductUpsertComponent implements OnInit { 

  formGroup: FormGroup;

  loadedProduct: Product;

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ProductsService
  ) {
  }

  async ngOnInit() {
    const id = this.actRoute.snapshot.paramMap.get('id');

    if (id) {
      this.loadedProduct = await firstValueFrom(this.apiService.getProduct(id));
    }

    this.initializeForm();
  }

  initializeForm() {
    this.formGroup = this.fb.group({ 
      _id: [this.loadedProduct?._id], 
      name: [this.loadedProduct?.name, [Validators.required]], 
      ncm: [this.loadedProduct?.ncm, [Validators.required]], 
      price: [this.loadedProduct?.price, [Validators.required]],
    });
  }

  // Getter to access form control
  get myForm() {
    return this.formGroup.controls;
  }

  onSubmit() { 
    if (!this.formGroup.valid) {
      return;
    }

    if (this.loadedProduct?._id) {
      this.apiService.updateProduct(this.formGroup.value).subscribe({
        complete: () => {
          alert('Product successfully updated!');
        },
        error: (e) => {
          console.log(e);
        },
      });

      return;
    }

    this.apiService.createProduct(this.formGroup.value).subscribe({
      complete: () => {
        alert('Product successfully created!');
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
