import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnConfig } from 'src/app/utils/smart-table/models';
import { Package } from '../models';
import { PackagesService } from '../packages.service';

@Component({
  selector: 'app-all-packages',
  templateUrl: './all-packages.component.html',
  styleUrls: ['./all-packages.component.scss']
})
export class AllPackagesComponent implements OnInit {
  packages: Package[] = [];
  cols: ColumnConfig<Package>[] = [];

  constructor(private packagesService: PackagesService, private router: Router) {
  }

  async ngOnInit() {
    this.cols = [
      {
        field: '_id',
        header: '#'
      },
      {
        field: 'size', 
        header: 'Size',
        filterConfig: {
          filterType: 'select',
          displayFn: (size: any): string => size.slice(0,1).toUpperCase()
        }
      },
      {
        field: 'status', 
        header: 'Status',
        filterConfig: {
          filterType: 'select'
        }
      },
      {
        field: 'description',
        header: 'Description',
        displayFn: (desc?: any): string => desc ? desc : '-'
      },
      {
        field: 'originOffice', 
        header: 'Origin Office',
        displayFn: (office: any): string => office.name,
        filterConfig: {
          displayFn: (office: any): string => office.name,
          filterType: 'select',
          uniqueFn: (office: any) => office._id
        }
      },      {
        field: 'destinationOffice', 
        header: 'Destination Office',
        displayFn: (office: any): HTMLElement[] => {
          const link = document.createElement('a');
          link.setAttribute('href', `../offices/${office._id}`);
          link.text = office.name;
          return [link];
        },
        filterConfig: {
          displayFn: (office: any): string => office.name,
          filterType: 'select',
          uniqueFn: (office: any) => office._id
        }
      },
      {
        field: 'deliveredOn',
        header: 'Delivered on',
        displayFn: (date?: any): string => {
          if (!date) {
            return '-'
          }

          const dateFormat = `${('0'+ date.getDate()).slice(-2)}/${('0'+ (date.getMonth()+1)).slice(-2)}/${date.getFullYear()}`;
          return dateFormat
        },
        filterConfig: {
          filterType: 'date'
        }
      },
      {
        field: 'isPaid',
        header: 'Paid',
        displayFn: (isPaid: any): HTMLElement[] => {
          const elementsToPrint: HTMLElement[] = [];
          const newIcon: HTMLElement = document.createElement('i');
          const classesToAdd = isPaid ? ['pi', 'pi-check'] : ['pi', 'pi-times'];
          newIcon.classList.add(...classesToAdd);
          elementsToPrint.push(newIcon);

          return elementsToPrint;
        },
        filterConfig: {
          filterType: 'boolean'
        }
      },      
      {
        field: 'isFragile',
        header: 'Fragile',
        displayFn: (isPaid: any): HTMLElement[] => {
          const elementsToPrint: HTMLElement[] = [];
          const newIcon: HTMLElement = document.createElement('i');
          const classesToAdd = isPaid ? ['pi', 'pi-check'] : ['pi', 'pi-times'];
          newIcon.classList.add(...classesToAdd);
          elementsToPrint.push(newIcon);

          return elementsToPrint;
        },
        filterConfig: {
          filterType: 'boolean'
        }
      },
      {
        field: 'price',
        header: 'Price',
        displayFn: (price: any): string => `${price} BGN`,
        filterConfig: {
          filterType: 'number'
        }
      }
    ]

    this.packages = await this.packagesService.getAllPackages();
    this.convertDateFromString();
  }

  packageClicked(pkgData: Package) {
    this.router.navigate(['packages', pkgData._id])
  }

  convertDateFromString(): void {
    this.packages.map((pkg: Package) => {
      if (pkg.deliveredOn) {
        pkg.deliveredOn = new Date(pkg.deliveredOn);
      }
      return pkg
    })
  }
}
