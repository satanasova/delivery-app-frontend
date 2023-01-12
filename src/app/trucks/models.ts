import { Package } from "../packages/models";

export type Truck = {
  _id: string;
  registrationNumber: string;
  size: TruckSize;
  packages: Package[];  //TODO: should be Package[]
}

export enum TruckSize {
  small = 'SMALL',
  medium = 'MEDIUM',
  large = 'LARGE'
}