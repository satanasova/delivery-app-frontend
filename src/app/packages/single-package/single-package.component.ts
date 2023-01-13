import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/clients/models';
import { Office } from 'src/app/offices/models';
import { ItemConfig } from 'src/app/utils/display-item-card/models';
import { Package } from '../models';
import { PackagesService } from '../packages.service';

@Component({
  selector: 'app-single-package',
  templateUrl: './single-package.component.html',
  styleUrls: ['./single-package.component.scss']
})
export class SinglePackageComponent implements OnInit {
  package!: Package;
  itemConfig: ItemConfig[] = []

  constructor(private router: Router, private route: ActivatedRoute, private packageService: PackagesService, private titleCasePipe: TitleCasePipe) {
    this.route.params.subscribe(async ({ packageId }) => {
      if (packageId) {
        this.package = await this.packageService.getSinglePackage(packageId)
      }
    })

    this.itemConfig = [
      {
        key: '_id',
        header: 'ID',
      },

      {
        key: 'description',
        header: 'Description',
        displayFn: (desc?: any): string => desc ? desc : '-'
      },
      {
        key: 'size',
        header: 'Size',
        displayFn: (size: string) => this.titleCasePipe.transform(size)
      },
      {
        key: 'price',
        header: 'Price',
        displayFn: (price: any) => `${price} BGN`
      },
      {
        key: 'status',
        header: 'Status',
        displayFn: (status: string) => this.titleCasePipe.transform(status)
      },
      {
        key: 'createdAt',
        header: 'Created at',
        displayFn: (dateStr?: any): string => {
          if (!dateStr) {
            return '-'
          }

          const date = new Date(dateStr);
          const dateFormat = `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
          return dateFormat
        },
      },
      {
        key: 'updatedAt',
        header: 'Updated at',
        displayFn: (dateStr?: any): string => {
          if (!dateStr) {
            return '-'
          }

          const date = new Date(dateStr);
          const dateFormat = `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
          return dateFormat
        },
      },
      {
        key: 'deliveredOn',
        header: 'Delivered on',
        displayFn: (dateStr?: any): string => {
          if (!dateStr) {
            return '-'
          }

          const date = new Date(dateStr);
          const dateFormat = `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
          return dateFormat
        },
      },
      {
        key: 'isPaid',
        header: 'Paid',
        displayFn: (isPaid: any): HTMLElement[] => {
          const elementsToPrint: HTMLElement[] = [];
          const newIcon: HTMLElement = document.createElement('i');
          const classesToAdd = isPaid ? ['pi', 'pi-check'] : ['pi', 'pi-times'];
          newIcon.classList.add(...classesToAdd);
          elementsToPrint.push(newIcon);

          return elementsToPrint;
        }
      },
      {
        key: 'isFragile',
        header: 'Fragile',
        displayFn: (isFragile: any): HTMLElement[] => {
          const elementsToPrint: HTMLElement[] = [];
          const newIcon: HTMLElement = document.createElement('i');
          const classesToAdd = isFragile ? ['pi', 'pi-check'] : ['pi', 'pi-times'];
          newIcon.classList.add(...classesToAdd);
          elementsToPrint.push(newIcon);

          return elementsToPrint;
        }
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
        key: 'recipient',
        header: 'Recipient',
        classes: 'text-link',
        displayFn: (client: Client): string => client.name,
        onClick: (client: Client): boolean => {
          this.router.navigate(['clients', client._id])
          return true;
        }
      }
    ]
  }

  ngOnInit(): void {

  }

}
