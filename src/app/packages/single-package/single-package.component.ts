import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Office } from 'src/app/offices/models';
import { ColumnConfig } from 'src/app/utils/smart-table/models';
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
  // filteredItemConfig: ItemConfig[] = []

  constructor(private router: Router, private route: ActivatedRoute, private packageService: PackagesService) {
    this.route.params.subscribe(async ({packageId}) => {
      if(packageId) {
        this.package = await this.packageService.getSinglePackage(packageId)
      }
    })

    this.itemConfig = [
      {
        key: '_id',
        header: 'ID',
      },
      {
        key: 'createdAt',
        header: 'Created at',
        displayFn: (dateStr?: any): string => {
          if (!dateStr) {
            return '-'
          }

          const date =  new Date(dateStr);
          const dateFormat = `${('0'+ date.getDate()).slice(-2)}/${('0'+ (date.getMonth()+1)).slice(-2)}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
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

          const date =  new Date(dateStr);
          const dateFormat = `${('0'+ date.getDate()).slice(-2)}/${('0'+ (date.getMonth()+1)).slice(-2)}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
          return dateFormat
        },
      },
      {
        key: 'description',
        header: 'Description',
        displayFn: (desc?: any): string => desc ? desc : '-'
      },
      {
        key: 'size',
        header: 'Size',
        displayFn: (size: string) => size.charAt(0).toUpperCase() + size.slice(1)
      },
      {
        key: 'price',
        header: 'Price',
        displayFn: (price: any) => `${price} BGN`
      },
      {
        key: 'status',
        header: 'Status',
        displayFn: (size: string) => size.charAt(0).toUpperCase() + size.slice(1)
      },
      {
        key: 'deliveredOn',
        header: 'Delivered on',
        displayFn: (dateStr?: any): string => {
          if (!dateStr) {
            return '-'
          }

          const date =  new Date(dateStr);
          const dateFormat = `${('0'+ date.getDate()).slice(-2)}/${('0'+ (date.getMonth()+1)).slice(-2)}/${date.getFullYear()}`;
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
        displayFn: (office: Office): string => office.name
      },
      {
        key: 'destinationOffice',
        header: 'To Office',
        classes: 'text-link',
        displayFn: (office: Office): string => office.name
      }   
    ]
  }

  ngOnInit(): void {

  }

  displayValue(itemConfig: ItemConfig): any {
    const customDisplayFn = itemConfig.displayFn;
    if (customDisplayFn) {
      const resultToPrint = customDisplayFn((this.package as any)[itemConfig.key]);
      if(typeof resultToPrint === 'string') {
        return resultToPrint;
      } else {
        return resultToPrint.map(r => r.outerHTML).join('');
      }
    } else {
      return (this.package as any)[itemConfig.key];
    }
  }

  onOfficeClick(event: any, itemConfig: ItemConfig): any {
    const target = event.target
    const isTargetLink = target.classList.contains('text-link');
    if(isTargetLink){
      const officeClicked = (this.package as any)[itemConfig.key];
      this.router.navigate(['offices', officeClicked._id]);
    }
    
  }

}

type ItemConfig = {
  key: string;
  header: string;
  classes?: string;
  displayFn?: (data: any) => string | HTMLElement[];
}