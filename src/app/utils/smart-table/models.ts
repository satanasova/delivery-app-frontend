export type ColumnConfig<T> = {
  /** The name of the field and the property in data array values */
  field: string;
  /** Column name */
  header: string;
  /** Optional: custom function to be called when displaying the property */
  displayFn?: (propData: any, rowData: T) => string | HTMLElement[];
  /** Optional: custom function to be called when trying to get the value of the property */
  getValue?: (propData: any) => number,
  /** Optional: config for filtering of the property */
  filterConfig?: FilterConfig
}


export type FilterConfig = {
  filterType?: string;
  rangeValues?: (string|number)[];
  selectOptions?: any[];
  displayFn?: (option: any) => string | HTMLElement[];
  uniqueFn?: (option: any) => any;
  filterFn?: (propValue: any, filter?: any) => boolean
}