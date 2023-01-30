import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Truck } from 'src/app/trucks/models';
import { DeliveriesService } from '../deliveries.service';
import { Delivery } from '../models';

@Component({
  selector: 'app-delivery-preview',
  templateUrl: './delivery-preview.component.html',
  styleUrls: ['./delivery-preview.component.scss']
})
export class DeliveryPreviewComponent implements OnInit, OnChanges {
  @Input() deliveryId: string = '';
  delivery?: Delivery;

  constructor(private deliveriesService: DeliveriesService, private router: Router) { }


  ngOnInit(): void {
  }

  async ngOnChanges(changes: SimpleChanges) {
    if(this.deliveryId) {
      this.delivery = await this.deliveriesService.getDelivery(this.deliveryId);
      console.log(this.delivery);
    }

    
  }

  onDeliveryClick() {
    this.router.navigate(['deliveries', this.deliveryId])
  }

  onTruckClick(truck: Truck) {
    this.router.navigate(['trucks', truck._id])
  }

  onPkgClicked(pkgId: string) {
    this.router.navigate(['packages', pkgId])

  }
}
