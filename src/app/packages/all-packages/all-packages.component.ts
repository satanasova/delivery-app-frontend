import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';
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

  constructor(private packagesService: PackagesService, private router: Router, public userService: UserService) {
  }

  async ngOnInit() {
    // return;
    this.cols = [
      // {
      //   field: '_id',
      //   header: '#'
      // },
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
      // {
      //   field: 'description',
      //   header: 'Description',
      //   displayFn: (desc?: any): string => desc ? desc : '-'
      // },
      {
        field: 'originOffice', 
        header: 'Origin Office',
        classes: 'text-link',
        displayFn: (office: any): string => office.name,
        onClick: (office: any, pkg: any): boolean => {
          this.router.navigate(['offices', office._id]);
          return true;
        },
        filterConfig: {
          displayFn: (office: any): string => office.name,
          filterType: 'select',
          uniqueFn: (office: any) => office._id
        }
      },
      {
        field: 'destinationOffice', 
        header: 'Destination Office',
        classes: 'text-link',
        displayFn: (office: any): string => {
          return office.name;
        },
        onClick: (office: any, pkg: any): boolean => {
          this.router.navigate(['offices', office._id]);
          return true;
        },
        filterConfig: {
          displayFn: (office: any): string => office.name,
          filterType: 'select',
          uniqueFn: (office: any) => office._id
        }
      },
      {
        field: 'recipient', 
        header: 'Recipient',
        classes: 'text-link',
        displayFn: (client: any): string => client ? client.name : '-',
        onClick: (client: any, pkg: any): boolean => {
          if (client) {
            this.router.navigate(['clients', client._id]);
          }
          return true;
        },
        filterConfig: {
          displayFn: (client: any): string => client ? client.name : '-',
          filterType: 'select',
          uniqueFn: (client: any) => client && client._id
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

  onCreatePackage() {
    this.packagesService.openCreatePackageModal();
  }
}
