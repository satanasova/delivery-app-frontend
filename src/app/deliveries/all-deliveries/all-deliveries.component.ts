import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnConfig } from 'src/app/utils/smart-table/models';
import { DeliveriesService } from '../deliveries.service';
import { Delivery } from '../models';

@Component({
  selector: 'app-all-deliveries',
  templateUrl: './all-deliveries.component.html',
  styleUrls: ['./all-deliveries.component.scss']
})
export class AllDeliveriesComponent implements OnInit {
  deliveries: Delivery[] = [];
  cols: ColumnConfig<Delivery>[] = [];

  constructor(private deliveriesService: DeliveriesService, private router: Router) { }

  async ngOnInit() {
    this.cols = [
      {
        field: '_id',
        header: 'ID'
      },
      // {
      //   field: 'originOffice', 
      //   header: 'Origin Office',
      //   classes: 'text-link',
      //   displayFn: (office: any): string => office.name,
      //   onClick: (office: any, pkg: any): boolean => {
      //     this.router.navigate(['offices', office._id]);
      //     return true;
      //   },
      //   filterConfig: {
      //     displayFn: (office: any): string => office.name,
      //     filterType: 'select',
      //     uniqueFn: (office: any) => office._id
      //   }
      // },
      // {
      //   field: 'destinationOffice', 
      //   header: 'Destination Office',
      //   classes: 'text-link',
      //   displayFn: (office: any): string => {
      //     return office.name;
      //   },
      //   onClick: (office: any, pkg: any): boolean => {
      //     this.router.navigate(['offices', office._id]);
      //     return true;
      //   },
      //   filterConfig: {
      //     displayFn: (office: any): string => office.name,
      //     filterType: 'select',
      //     uniqueFn: (office: any) => office._id
      //   }
      // },
    ]

    this.deliveries = await this.deliveriesService.getAllDeliveries();
    console.log(this.deliveries);
  }

  deliveryClicked(delivery: Delivery) {
    this.router.navigate(['deliveries', delivery._id ])
  }
}
