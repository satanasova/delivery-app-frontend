import { Component, OnInit } from '@angular/core';
import { MONTHS_IN_COLUMN } from '@nebular/theme';
import { SettingsService } from 'src/app/utils/settings/settings.service';
import { Office } from '../models';
import { OfficesService } from '../offices.service';

@Component({
  selector: 'app-all-offices',
  templateUrl: './all-offices.component.html',
  styleUrls: ['./all-offices.component.scss']
})
export class AllOfficesComponent implements OnInit {
  offices: Array<Office> = [];
  cols: ColumnConfig<Office>[] = [];
  rangeModels: any = {};
  cities: string[] = [
    // {name: 'Varna', image: 'varna.jpg'},
    // {name: 'Burgas', image: 'burgas.jpg'},
    // {name: 'Sofia', image: 'sofia.jpg'}
  ]
  // cities: string[] = ['Varna', 'Burgas', 'Sofia']

  constructor(private settingsService: SettingsService,
    private officesService: OfficesService) { }
  

  async ngOnInit() {
    this.offices = await this.officesService.getAllOffices();
    this.seedOfficeOwners();
    this.seedLastPkgDate();
    this.seedAvailability();
    this.seedNumberOfEmployees();
    console.log(this.offices);
    this.cities = this.offices.map((office) => office.name)
      .filter((cityName, idx, cityNames) => cityNames.indexOf(cityName) === idx);

    this.cols = [
      {
        field: '_id', 
        header: '#', 
      },
      {
        field: 'name',
        header: 'Name',
        filterConfig: {
          filterType: 'select',
          // selectOptions: ['Varna', 'Sofia']
        }
      },
      {
        field: 'owner',
        header: 'Owner',
        displayFn: (owner: any): string => `${owner.firstName} ${owner.lastName}`,
        filterConfig: {
          filterType: 'select',
          uniqueFn: (owner: any) => owner._id,
          displayFn: (owner: any): string | HTMLElement[] => {
            // return owner.firstName;
            const elements: HTMLElement[] = [];
            let ownerImg = document.createElement('img');
            let ownerName = document.createElement('span');
            ownerImg.setAttribute('src', 'https://picsum.photos/30')
            ownerName.innerText = owner.firstName

            elements.push(ownerImg, ownerName);
            return elements;

            return '<img src=".."><span>Name</span>'
          }
        }
      },
      // {
      //   field: 'address', 
      //   header: 'Address', 
      //   filterConfig: {
      //     filterType: 'date'
      //   }
      // },
      // {
      //   field: 'phone', 
      //   header: 'Phone', 
      //   filterConfig: {
      //     filterType: 'boolean'
      //   }
      // },
      {
        field: 'packages',
        header: 'Packages',
        displayFn: (pkgs: any[], office): string => `${pkgs.length} Package${pkgs.length != 1 ? 's' : ''}`,
        getValue: (pkgs: any[]) => pkgs.length,
        filterConfig: {
          filterType: 'range',
          rangeValues: ['min', 'max'],
          // getRangeValues: () => {} 
        }
      },
      {
        field: 'employeesNumber',
        header: '# Employees',
        filterConfig: {
          filterType: 'range',
          rangeValues: ['min', 'max']
        }
      }
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
  }

  getDisplayText(propConfig: ColumnConfig<Office>, office: any) {
    const customDisplayFn = propConfig && propConfig.displayFn;
    // const customFilterDisplayFn = propConfig && propConfig.filterConfig && propConfig.filterConfig.displayFn;

    if (customDisplayFn) {
      const resultToPrint: string | HTMLElement[] = customDisplayFn(office[propConfig.field], office);
      
      if(typeof resultToPrint === 'string') {
        return `<span>${resultToPrint}</span>`
      } else {
        return resultToPrint.map(r => r.outerHTML).join('');
      }
    } else {
      return office[propConfig.field];
    }
  }

  getOptionText(colConfig: ColumnConfig<Office>, option: any) {
    const customOptionDisplayFn = colConfig && colConfig.filterConfig && colConfig.filterConfig.displayFn;

    if (customOptionDisplayFn) {
      // return customOptionDisplayFn(option[colConfig.field])
      const resultToPrint: string | HTMLElement[] = customOptionDisplayFn(option);
      
      // document.querySelector('option#id div')?.innerHTML = resultToPrint
      if (typeof resultToPrint === 'string') {
        return `<span>${resultToPrint}</span>`
      } else {
        return resultToPrint.map(e => e.outerHTML).join('');
      }
    } else {
      return option
    }
  }

  getOptions(colConfig: ColumnConfig<Office>): any[] {
    const customUniqueFn = colConfig && colConfig.filterConfig && colConfig.filterConfig.uniqueFn;

    let allPropValues = this.offices.map(office => (office as any)[colConfig.field]);
    
    let allOptions = allPropValues.reduce((prev: any[], curr: any, i) => {
      let isOptionAdded = prev.some((addedOption) => {
        if (customUniqueFn) {
          return customUniqueFn(addedOption) === customUniqueFn(curr);
        } else {
          return addedOption === curr;
        }
      });


      if(!isOptionAdded) {
        prev.push(curr)
      }

      return prev;
    }, []);

    console.log('alloptions', allOptions);

    return allOptions;
  }

  getRangeValues(propConfig: ColumnConfig<Office>) {
    const rangeValues = propConfig.filterConfig?.rangeValues || [0, 100];
    const customGetValueFn = propConfig.getValue;
    const fieldValues = this.offices.map(office => {
      if (customGetValueFn) {
        return  customGetValueFn((office as any)[propConfig.field])
      } else {
        return (office as any)[propConfig.field]
      }
    });
    const min = Math.min(...fieldValues);
    const max = Math.max(...fieldValues);
    const result = rangeValues.map(rangeValue => {
      if(rangeValue === 'min') {
        return min;
      } else if (rangeValue === 'max') {
        return max;
      } else {
        return rangeValue;
      }
    })
    
    console.log(rangeValues);
    console.log(fieldValues);
    console.log(min,max);
    console.log(result);
    return result
  }
  
   

    

  getRangeModel(propConfig: ColumnConfig<Office>): number[] {
    if (!this.rangeModels[propConfig.field]) {
      this.rangeModels[propConfig.field] = [...this.getRangeValues(propConfig)];
    }

    return this.rangeModels[propConfig.field]
  }

  seedOfficeOwners() {
    this.offices.map(office => {
      const newOwner = {_id: office.name, firstName: 'Mr. '+ office.name, lastName: 'Jr.'}
      office.owner = newOwner;
      return office;
    })
  }

  seedLastPkgDate() {
    this.offices.map(office => {
      office.date = new Date();
      return office
    })
  }

  seedNumberOfEmployees() {
    this.offices.map(office => {
      office.employeesNumber = Math.round(Math.random() * 100);
      return office;
    })
  }

  seedAvailability() {
    this.offices.map(office => {
      office.availability = Math.random() < 0.5 ? true : false;
      return office
    })
  }


}

type ColumnConfig<T> = {
  field: string;
  header: string;
  displayFn?: (propData: any, rowData: T) => string | HTMLElement[];
  getValue?: (propData: any) => number,
  filterConfig?: FilterConfig
}


type FilterConfig = {
  filterType?: string;
  rangeValues?: (string|number)[];
  selectOptions?: any[];
  displayFn?: (option: any) => string | HTMLElement[];
  uniqueFn?: (option: any) => any
}



// constr truck = {
//   plate: '',
//   health: {
//     currentHealth: 68,
//     lastInspection: '02.11.2022'
//   }
// }

// const agent = {
//   img: '',
//   _id: '12345',
//   name: 'Pecka'
// }

// const cols = [
// {name:'', field:'', type:'', customFilter:''},
// {name:'Number Pkgs', field:'pkgs', type:'range', rangeValues: ['min', 100], customFilter:(min, man) => {return...}}
// {name:'Number Pkgs', field:'pkgs',
// filterConfig: {
//   type:
//   fn:
// },
// getValue: (pkgs) => pkgs.length,
// rangeValue: ['min', 'max'],
// displayValue: (pkgs) => `${pkgs.length} Pakcage${pkgs.length !== 1 ? 's' : ''}`
// }},
// {
// name: 'Truck Health',
// field: 'health',
// type: 'bar',
// filterConfig: {
//   type: 'range',
//   filterFn: ([min, max], truckHealth) => {return min < truckHealth.currentHealth < max}
// },
// rangeValues: ['min', 100],
// getValue: (health) => health.currentHealth,
// displayValue: (health) => `${health.currentHealth}%`

// }
// ]

// cols.forEach(col => {
// switch(col.type) {
// case 'select': createSelectHeader(col); break;
// case 'range': createRangeFilter(col); break;
// case 'bool': createBoolFilter(col); break;
// default: createTextFilter(col); break;
// }
// })