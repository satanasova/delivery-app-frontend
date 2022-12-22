import { Component, Input, OnInit } from '@angular/core';
import { FilterService } from 'primeng/api';
import { ColumnConfig } from './models';

@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss']
})
export class SmartTableComponent<T> implements OnInit {
  @Input() data: T[] = [];
  @Input() tableConfig: ColumnConfig<T>[] = [];
  rangeModels: any = {};

  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
    this.registerCustomFilterFns();
  }

  getDisplayText(propConfig: ColumnConfig<T>, singleData: any) {
    const customDisplayFn = propConfig && propConfig.displayFn;
    // const customFilterDisplayFn = propConfig && propConfig.filterConfig && propConfig.filterConfig.displayFn;

    if (customDisplayFn) {
      const resultToPrint: string | HTMLElement[] = customDisplayFn(singleData[propConfig.field], singleData);
      
      if(typeof resultToPrint === 'string') {
        return `<span>${resultToPrint}</span>`
      } else {
        return resultToPrint.map(r => r.outerHTML).join('');
      }
    } else {
      return singleData[propConfig.field];
    }
  }

  getOptionText(colConfig: ColumnConfig<T>, option: any) {
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

  getOptions(colConfig: ColumnConfig<T>): any[] {
    const customUniqueFn = colConfig && colConfig.filterConfig && colConfig.filterConfig.uniqueFn;

    let allPropValues = this.data.map(singleData => (singleData as any)[colConfig.field]);
    
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

    return allOptions;
  }

  getRangeValues(propConfig: ColumnConfig<T>) {
    let rangeValues = propConfig.filterConfig?.rangeValues || [0, 100];
    const hasMinMax = rangeValues.some(rangeValue => typeof rangeValue === 'string');

    if (hasMinMax) {
      const customGetValueFn = propConfig.getValue;
      const fieldValues = this.data.map(singleData => {
        if (customGetValueFn) {
          return  customGetValueFn((singleData as any)[propConfig.field])
        } else {
          return (singleData as any)[propConfig.field]
        }
      });
      const min = Math.min(...fieldValues);
      const max = Math.max(...fieldValues);
      rangeValues = rangeValues.map(rangeValue => {
        if(rangeValue === 'min') {
          return min;
        } else if (rangeValue === 'max') {
          return max;
        } else {
          return rangeValue;
        }
      })
    }
    
    return rangeValues
  }
  
  getRangeModel(propConfig: ColumnConfig<T>): number[] {
    if (!this.rangeModels[propConfig.field]) {
      this.rangeModels[propConfig.field] = [...this.getRangeValues(propConfig)];
    }

    return this.rangeModels[propConfig.field]
  }

  hasCustomFilter(colConfig: ColumnConfig<T>): boolean {
    return !!colConfig.filterConfig?.filterFn;
  }

  registerCustomFilterFns(): void {
    this.tableConfig.forEach(col => {
      if(col.filterConfig && col.filterConfig.filterFn) {
        const matchModeName = 'custom-' + col.field;
        const customFilterFn = col.filterConfig.filterFn;
        this.filterService.register(matchModeName, customFilterFn);
      }
    })
  }



}
