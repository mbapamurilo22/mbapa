import { Component, OnInit } from '@angular/core';
import { Client } from '../../../model/Client';
import { ClientsService } from '../../../services/clients.service'; 

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})

export class ClientListComponent implements OnInit {
  list: Array<Client> = [];

  constructor(private apiService: ClientsService) {
    this.listClients();
  }

  ngOnInit() {}

  listClients() {
    this.apiService.getClients().subscribe((data) => {
      this.list = data;
    });
  }

  removeClient(client) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deleteClient(client._id).subscribe((data) => {
        this.list = data;
      });
    }
  }
}
