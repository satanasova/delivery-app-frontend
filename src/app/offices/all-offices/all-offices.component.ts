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
    this.seedOfficeOwners()
    console.log(this.offices);
    this.cities = this.offices.map((office) => office.name)
      .filter((cityName, idx, cityNames) => cityNames.indexOf(cityName) === idx);

      [{_id: ''},
      {egn: ''},
      {type: '', model: '', frame:{ _id: '' }}]

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
          uniqueFilterFn: (owner: any) => owner._id,
          displayFn: (owner: any): string => `${owner.firstName}`
        }
      },
      {
        field: 'address', 
        header: 'Address', 
        filterConfig: {
          filterType: 'date'
        }
      },
      {
        field: 'phone', 
        header: 'Phone', 
        filterConfig: {
          filterType: 'text'
        }
      },
      {
        field: 'packages',
        header: 'Packages',
        displayFn: (pkgs: any[], office): string => `${pkgs.length} Package${pkgs.length != 1 ? 's' : ''}`,
        filterConfig: {
          filterType: 'range',
          rangeValues: [-20,50],
          // getRangeValues: () => {} 
        }
      }
    ]
  }

  getDisplayText(propConfig: ColumnConfig<Office>, office: any) {
    const customDisplayFn = propConfig && propConfig.displayFn;
    // const customFilterDisplayFn = propConfig && propConfig.filterConfig && propConfig.filterConfig.displayFn;

    if (customDisplayFn) {
      return customDisplayFn(office[propConfig.field], office)
    } else {
      return office[propConfig.field];
    }
  }

  getOptionText(colConfig: ColumnConfig<Office>, option: any) {
    const customOptionDisplayFn = colConfig && colConfig.filterConfig && colConfig.filterConfig.displayFn;
    console.log(option);

    if (customOptionDisplayFn) {
      // return customOptionDisplayFn(option[colConfig.field])
      return customOptionDisplayFn(option);
    } else {
      return option
    }
  }

  getOptions(colConfig: ColumnConfig<Office>): any[] {
    let allPropValues = this.offices.map(office => (office as any)[colConfig.field])
    let allOptions = allPropValues.reduce((prev: any[], curr: any, i) => {
      let isOfficeAdded = prev.some((addedOffice) => addedOffice === curr);
      if(!isOfficeAdded) {
        prev.push(curr)
      }

      return prev;
    }, []);

    console.log('alloptions', allOptions);

    return allOptions;
  }

  getRangeValues(propConfig: ColumnConfig<Office>): number[] {
    return (propConfig.filterConfig && propConfig.filterConfig.rangeValues) || [0, 100]
  }

  getRangeModel(propConfig: ColumnConfig<Office>): number[] {
    if (!this.rangeModels[propConfig.field]) {
      this.rangeModels[propConfig.field] = [...this.getRangeValues(propConfig)];
    }

    return this.rangeModels[propConfig.field]
  }

  filterSelect(event: any) {
    console.log('select values', event);
  }

  seedOfficeOwners() {
    this.offices.map(office => {
      const newOwner = {_id: office.name, firstName: 'Mr. '+ office.name, lastName: 'Jr.'}
      office.owner = newOwner;
      return office;
    })
  }


}

type ColumnConfig<T> = {
  field: string;
  header: string;
  displayFn?: (propData: any, rowData: T) => string;
  filterConfig?: FilterConfig
}


type FilterConfig = {
  filterType?: string;
  rangeValues?: number[];
  selectOptions?: any[];
  displayFn?: (option: any) => string | HTMLElement[];
  uniqueFilterFn?: (option: any) => any
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