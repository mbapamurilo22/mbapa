import { ActivatedRoute } from '@angular/router';
import { SalesService } from '../../../services/sales.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Sale } from '../../../model/Sale';
import { firstValueFrom, take } from 'rxjs';
import { ClientsService } from '../../../services/clients.service';
import { ProductsService } from '../../../services/products.service';
import { Product, SalesProduct } from '../../../model/Product';
import { Client } from '../../../model/Client';

@Component({
  selector: 'app-sale-upsert',
  templateUrl: './sales-upsert.component.html',
  styleUrls: ['./sales-upsert.component.css'],
})
export class SaleUpsertComponent implements OnInit {
  formGroup: FormGroup;

  loadedSale: Sale;

  productsOptions:Array<Product> = [];

  clientsOptions:Array<Client> = [];

  @ViewChild('addProductSelector')
  addProductSelector: ElementRef;

  constructor(
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: SalesService,
    private clientsService: ClientsService,
    private productsService: ProductsService
  ) {
  }

  async ngOnInit() {
    const id = this.actRoute.snapshot.paramMap.get('id');

    if (id) {
      this.loadedSale = await firstValueFrom(this.apiService.getSale(id));
    }

    this.loadClientsOptions();

    this.loadProductsOptions();
    
    this.initializeForm();
  }

  private loadClientsOptions() {
    this.clientsService.getClients().pipe(take(1)).subscribe(clients => (this.clientsOptions = clients));
  }

  private loadProductsOptions() {
    this.productsService.getProducts().pipe(take(1)).subscribe(products => (this.productsOptions = products));
  }  

  initializeForm() {
    this.formGroup = this.formBuilder.group({
      _id: [this.loadedSale?._id],
      clientId: [this.loadedSale?.clientId],
      clientName: [this.loadedSale?.clientName],
      products: this.formBuilder.array([])
    });

    this.loadedSale?.products?.forEach(product => {
      this.addProductFormGroup(product);
    });
  }

  addProductFormGroup(product: SalesProduct) {
    const _product = this.formBuilder.group({
        _id: [product._id],
        name: [product.name],
        price: [product.price, [Validators.required]],
        quantity: [1, [Validators.required]],
    });

    this.products.push(_product);
  }

  addProduct(productId: string) {
    const newProduct = this.productsOptions.find(item => item._id === productId);

    this.addProductFormGroup(newProduct as SalesProduct);
 
    this.addProductSelector.nativeElement.value = '';
  }

  get products() {
    return this.formGroup.controls["products"] as FormArray;
  }

  // Getter to access form control
  get myForm() {
    return this.formGroup.controls;
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      return;
    }

    const clientAssociated = this.clientsOptions.find(item => item._id === this.formGroup.value.clientId);
    
    if (!clientAssociated) {
      alert('You must select a client');
      return;
    }

    this.formGroup.value.clientName = clientAssociated.name;

    if (this.loadedSale?._id) {
      this.apiService.updateSale(this.formGroup.value).subscribe({
        complete: () => {
          alert('Sale successfully updated!');
        },
        error: (e) => {
          console.log(e);
        },
      });

      return;
    }

    this.apiService.createSale(this.formGroup.value).subscribe({
      complete: () => {
        alert('Sale successfully created!');
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  removeProduct(index: number) {
    this.products.removeAt(index);
  }
}
