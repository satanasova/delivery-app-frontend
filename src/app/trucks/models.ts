export type Truck = {
  _id: string;
  regPlate: string;
  size: TruckSize;
  packages: any[];  //TODO: should be Package[]
}

export enum TruckSize {
  small = 'SMALL',
  medium = 'MEDIUM',
  large = 'LARGE'
}