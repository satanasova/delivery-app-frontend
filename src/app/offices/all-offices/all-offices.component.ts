import { Component, OnInit } from '@angular/core';
import { Office } from '../models';
import { OfficesService } from '../offices.service';
import { ColumnConfig } from 'src/app/utils/smart-table/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-offices',
  templateUrl: './all-offices.component.html',
  styleUrls: ['./all-offices.component.scss']
})
export class AllOfficesComponent implements OnInit {
  offices: Array<Office> = [];
  cols: ColumnConfig<Office>[] = [];
  

  constructor(private officesService: OfficesService, private router: Router) { }
  
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
      // {
      //   field: 'owner',
      //   header: 'Owner',
      //   displayFn: (owner: any): string => `${owner.firstName} ${owner.lastName}`,
      //   filterConfig: {
      //     filterType: 'select',
      //     uniqueFn: (owner: any) => owner._id,
      //     displayFn: (owner: any): string | HTMLElement[] => {
      //       // return owner.firstName;
      //       const elements: HTMLElement[] = [];
      //       let ownerImg = document.createElement('img');
      //       let ownerName = document.createElement('span');
      //       ownerImg.setAttribute('src', 'https://picsum.photos/30')
      //       ownerName.innerText = owner.firstName

      //       elements.push(ownerImg, ownerName);
      //       return elements;

      //       return '<img src=".."><span>Name</span>'
      //     }
      //   }
      // },
      // {
      //   field: 'phone', 
      //   header: 'Phone', 
      //   filterConfig: {
      //     filterFn: (propValue: string, filter: string) => {
      //       if (!filter) {
      //         return true;
      //       }

      //       return propValue.replace('+359', '0').indexOf(filter.replace('+359', '0')) >= 0;
      //     }
      //   }
      // },
      {
        field: 'packages',
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
      // {
      //   field: 'employeesNumber',
      //   header: '# Employees',
      //   filterConfig: {
      //     filterType: 'range',
      //     rangeValues: ['min', 'max']
      //   }
      // },
      // {
      //   field: 'date',
      //   header: 'Last Pkg Date',
      //   displayFn: (date: Date) => `${('0'+ date.getDate()).slice(-2)}/${date.getMonth()+1}/${date.getFullYear()}`,
      //   filterConfig: {
      //     filterType: 'date'
      //   }
      // },
      // {
      //   field: 'availability',
      //   header: 'Is working',
      //   displayFn: (isWorking: boolean): string | HTMLElement[] => {
      //     const elements: HTMLElement[] = [];
      //     const iconEl = document.createElement('i');
      //     // iconEl.classList.add(...(isWorking ? ['pi', 'pi-check'] : ['pi', 'pi-times']));
      //     let classesToAdd = isWorking ? ['pi', 'pi-check'] : ['pi', 'pi-times'];
      //     iconEl.classList.add(...classesToAdd);
      //     // iconEl.setAttribute('icon', `${isWorking ? 'checkmark-circle-2-outline' : 'close-circle-outline'}`)
      //     elements.push(iconEl);
      //     return elements
      //   },

      //   filterConfig: {
      //     filterType: 'boolean'
      //   }
      // }
    ]
    this.offices = await this.officesService.getAllOffices();
    // this.seedOfficeOwners();
    // this.seedLastPkgDate();
    // this.seedAvailability();
    // this.seedNumberOfEmployees();

  }

  officeClicked(officeData: Office) {
    this.router.navigate(['offices', officeData._id ])
  }

  // seedOfficeOwners() {
  //   this.offices.map(office => {
  //     const newOwner = {_id: office.name, firstName: 'Mr. '+ office.name, lastName: 'Jr.'}
  //     office.owner = newOwner;
  //     return office;
  //   })
  // }

  // seedLastPkgDate() {
  //   this.offices.map(office => {
  //     const curDate = new Date()
  //     const threeDays = 3 * 24 * 60 * 60 * 1000
  //     office.date = new Date((+curDate - threeDays) + Math.round(Math.random() * 2 * threeDays));
  //     return office
  //   })
  // }

  // seedNumberOfEmployees() {
  //   this.offices.map(office => {
  //     office.employeesNumber = Math.round(Math.random() * 100);
  //     return office;
  //   })
  // }

  // seedAvailability() {
  //   this.offices.map(office => {
  //     office.availability = Math.random() < 0.5 ? true : false;
  //     return office
  //   })
  // }

}