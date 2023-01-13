import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemConfig } from 'src/app/utils/display-item-card/models';
import { ClientsService } from '../clients.service';
import { Client } from '../models';

@Component({
  selector: 'app-single-client',
  templateUrl: './single-client.component.html',
  styleUrls: ['./single-client.component.scss']
})
export class SingleClientComponent implements OnInit {
  client?: Client;
  itemConfig: ItemConfig[] = [];

  constructor(private route: ActivatedRoute, private clientsService: ClientsService) {
    this.route.params.subscribe(async ({clientId}) => {
      if (clientId) {
        this.client = await this.clientsService.getClient(clientId);
      }
    })
  }

  ngOnInit(): void {
    this.itemConfig = [
      {
        key: '_id',
        header: 'ID'
      }, 
      {
        key: 'name',
        header: 'Name'
      },
      {
        key: 'phone',
        header: 'Phone'
      },
      {
        key: 'email',
        header: 'Email',
        displayFn: (email: string) => email? email : '-'
      }
    ]
  }
}
