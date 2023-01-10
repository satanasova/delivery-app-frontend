export type ItemConfig = {
  key: string;
  header: string;
  classes?: string;
  displayFn?: (data: any) => string | HTMLElement[];
  customDisplayCmp?: any;
  cmpProperties?: (propData: any, data: any) => any;
  cmpHandlers?: (propData: any, data: any) => any;
  onClick?: (data: any) => boolean;
}