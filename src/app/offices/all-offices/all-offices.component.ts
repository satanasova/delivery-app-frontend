import { Component, OnInit } from '@angular/core';
import { Office } from '../models';
import { OfficesService } from '../offices.service';
import { ColumnConfig } from 'src/app/utils/smart-table/models';
import { Router } from '@angular/router';
import { PackagesService } from 'src/app/packages/packages.service';
import { PackageStatus } from 'src/app/packages/models';

@Component({
  selector: 'app-all-offices',
  templateUrl: './all-offices.component.html',
  styleUrls: ['./all-offices.component.scss']
})
export class AllOfficesComponent implements OnInit {
  offices: Array<Office> = [];
  cols: ColumnConfig<Office>[] = [];
  

  constructor(private officesService: OfficesService, private router: Router, private pkgService: PackagesService) { }
  
  async ngOnInit() {
    this.cols = [
      {
        field: '_id', 
        header: '#', 
      },
      {
        field: 'name',
        header: 'Name'
      },
      {
        field: 'address',
        header: 'Address',
      },
      {
        field: 'realPackages',
        header: 'Packages',
        displayFn: (pkgs: any[]): string => `${pkgs.length} Package${pkgs.length != 1 ? 's' : ''}`,
        getValue: (pkgs: any[]) => pkgs.length,
        filterConfig: {
          filterType: 'range',
          rangeValues: ['min', 'max'],
          filterFn: (propValue: any[], filter: number[]) => {
            if (!filter) {
              return true;
            }

            return filter[0] <= propValue.length && propValue.length <= filter[1];
          }
        }
      },
      {
        field: 'realPackages',
        header: 'Received Packages',
        displayFn: (pkgs: any[]): string => { 
          const receivedPkgs = pkgs.filter(pkg => pkg.status === PackageStatus.RECEIVED)
          return `${receivedPkgs.length} Package${receivedPkgs.length != 1 ? 's' : ''}`
        },
        getValue: (pkgs: any[]) => { 
          const receivedPkgs = pkgs.filter(pkg => pkg.status === PackageStatus.RECEIVED)
          return receivedPkgs.length
        },
        filterConfig: {
          filterType: 'range',
          rangeValues: ['min', 'max'],
          filterFn: (propValue: any[], filter: number[]) => {
            if (!filter) {
              return true;
            }

            return filter[0] <= propValue.length && propValue.length <= filter[1];
          }
        }
      },
      {
        field: 'realPackages',
        header: 'Delivered Packages',
        displayFn: (pkgs: any[]): string => { 
          const deliveredPackages = pkgs.filter(pkg => pkg.status === PackageStatus.DELIVERED)
          return `${deliveredPackages.length} Package${deliveredPackages.length != 1 ? 's' : ''}`
        },
        getValue: (pkgs: any[]) => { 
          const deliveredPackages = pkgs.filter(pkg => pkg.status === PackageStatus.DELIVERED)
          return deliveredPackages.length
        },
        filterConfig: {
          filterType: 'range',
          rangeValues: ['min', 'max'],
          filterFn: (propValue: any[], filter: number[]) => {
            if (!filter) {
              return true;
            }

            return filter[0] <= propValue.length && propValue.length <= filter[1];
          }
        }
      },


    ]

    this.offices = await this.officesService.getAllOffices();
    this.offices.forEach(async (office: Office) => {
      office.realPackages = await this.pkgService.getPackagesInOffice(office._id)
    })
 

  }

  officeClicked(officeData: Office) {
    this.router.navigate(['offices', officeData._id ])
  }
}