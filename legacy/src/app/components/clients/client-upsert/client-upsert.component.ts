import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../../../services/clients.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Client } from '../../../model/Client';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-client-upsert',
  templateUrl: './client-upsert.component.html',
  styleUrls: ['./client-upsert.component.css'],
})
export class ClientUpsertComponent implements OnInit {
  submitted = false;

  clientForm: FormGroup;

  loadedClient: Client;

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ClientsService
  ) {
  }

  async ngOnInit() {
    const id = this.actRoute.snapshot.paramMap.get('id');

    if (id) {
      this.loadedClient = await firstValueFrom(this.apiService.getClient(id));
    }

    this.initializeForm();
  }

  initializeForm() {
    this.clientForm = this.fb.group({
      _id: [this.loadedClient?._id],
      name: [this.loadedClient?.name, [Validators.required]],
      email: [
        this.loadedClient?.email, [Validators.required],
      ],
      phoneNumber: [this.loadedClient?.phoneNumber, [Validators.required]],
      streetName: [this.loadedClient?.streetName, [Validators.required]],
      houseNumber: [this.loadedClient?.houseNumber, [Validators.required]],
      city: [this.loadedClient?.city, [Validators.required]],
      state: [this.loadedClient?.state, [Validators.required]],
      country: [this.loadedClient?.country, [Validators.required]],
      zipCode: [this.loadedClient?.zipCode, [Validators.required]],
    });
  }

  // Getter to access form control
  get myForm() {
    return this.clientForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.clientForm.valid) {
      return;
    }

    if (this.loadedClient?._id) {
      this.apiService.updateClient(this.clientForm.value).subscribe({
        complete: () => {
          alert('Client successfully updated!');
        },
        error: (e) => {
          console.log(e);
        },
      });

      return;
    }

    this.apiService.createClient(this.clientForm.value).subscribe({
      complete: () => {
        alert('Client successfully created!');
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
