import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnConfig } from 'src/app/utils/smart-table/models';
import { ClientsService } from '../clients.service';
import { Client } from '../models';

@Component({
  selector: 'app-all-clients',
  templateUrl: './all-clients.component.html',
  styleUrls: ['./all-clients.component.scss']
})
export class AllClientsComponent implements OnInit {
  clients: Client[] = [];
  cols: ColumnConfig<Client>[] = [];

  constructor(private clientsService: ClientsService, private router: Router) { }

  async ngOnInit() {
    this.cols = [
      {
        field: '_id',
        header: '#'
      }, 
      {
        field: 'name',
        header: 'Name'
      },
      {
        field: 'phone',
        header: 'Phone'
      },
      {
        field: 'email',
        header: 'Email',
        displayFn: (email: string) => email? email : '-'
      }
    ]

    this.clients = await this.clientsService.getAllClients()
  }

  clientClicked(client: Client) {
    this.router.navigate(['clients', client._id]);
  }
}
