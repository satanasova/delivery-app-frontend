import { Package } from "../packages/models";

export type Office = {
  _id: string;
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  // packages: Package[]; 
  owner: any;
  date: Date;
  availability: boolean;
  employeesNumber: number;
}

