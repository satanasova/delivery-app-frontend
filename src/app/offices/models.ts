export type Office = {
  _id: string;
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  packages: any[] //TODO - should be Packages[]
}