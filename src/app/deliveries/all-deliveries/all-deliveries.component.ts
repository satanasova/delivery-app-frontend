import { Component, OnInit } from '@angular/core';
import { DeliveriesService } from '../deliveries.service';
import { Delivery } from '../models';

@Component({
  selector: 'app-all-deliveries',
  templateUrl: './all-deliveries.component.html',
  styleUrls: ['./all-deliveries.component.scss']
})
export class AllDeliveriesComponent implements OnInit {
  deliveries: Delivery[] = [];

  constructor(private deliveriesService: DeliveriesService) { }

  async ngOnInit() {
    this.deliveries = await this.deliveriesService.getAllDeliveries();
    console.log(this.deliveries);
  }

}
