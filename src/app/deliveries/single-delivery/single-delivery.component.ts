import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Office } from 'src/app/offices/models';
import { Package } from 'src/app/packages/models';
import { Truck } from 'src/app/trucks/models';
import { CustomAccordionComponent } from 'src/app/utils/custom-accordion/custom-accordion.component';
import { ItemConfig } from 'src/app/utils/display-item-card/models';
import { DeliveriesService } from '../deliveries.service';
import { Delivery } from '../models';

@Component({
  selector: 'app-single-delivery',
  templateUrl: './single-delivery.component.html',
  styleUrls: ['./single-delivery.component.scss']
})
export class SingleDeliveryComponent implements OnInit {
  delivery?: Delivery;
  itemConfig: ItemConfig[] = [];

  constructor(private route: ActivatedRoute, private deliveriesService: DeliveriesService, private router: Router, private titleCasePipe: TitleCasePipe) {
    this.route.params.subscribe(async ({ deliveryId }) => {
      if (deliveryId) {
        this.delivery = await this.deliveriesService.getDelivery(deliveryId);
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
        key: 'status',
        header: 'Status',
        displayFn: (status: string) => this.titleCasePipe.transform(status)
      },
      {
        key: 'departureDate',
        header: 'Departured at',
        displayFn: (dateStr?: any): string => {
          if (!dateStr) {
            return '-'
          }

          const date = new Date(dateStr);
          const dateFormat = `${date.getHours()}:${date.getMinutes()} - ${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
          return dateFormat
        },
      },
      {
        key: 'originOffice',
        header: 'From Office',
        classes: 'text-link',
        displayFn: (office: Office): string => office.name,
        onClick: (office: Office): boolean => {
          this.router.navigate(['offices', office._id])
          return true;
        }
      },
      {
        key: 'destinationOffice',
        header: 'To Office',
        classes: 'text-link',
        displayFn: (office: Office): string => office.name,
        onClick: (office: Office): boolean => {
          this.router.navigate(['offices', office._id])
          return true;
        }
      },
      {
        key: 'truck',
        header: 'Truck',
        classes: 'text-link',
        displayFn: (truck: Truck): string => truck.registrationNumber,
        onClick: (truck: Truck): boolean => {
          this.router.navigate(['trucks', truck._id])
          return true;
        }
      },
      {
        key: 'packages',
        header: 'Packages',
        customDisplayCmp: CustomAccordionComponent,
        cmpProperties: (packages: Package[], office: Office): any => {
          return {
            header: `${packages.length || 0} Package${packages.length !== 1 ? 's' : ''}`,
            items: packages,
            class: 'value-list'
          }
        },
        cmpHandlers: (packages: Package[], office: Office) => {
          return {
            itemClicked: (pkgId: any) => {
              this.router.navigate(['packages', pkgId])
            }
          }
        }
      },
    ]
  }

}
