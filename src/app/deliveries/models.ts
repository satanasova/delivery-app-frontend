import { Office } from "../offices/models";
import { Package } from "../packages/models";
import { Truck } from "../trucks/models";

export type Delivery = {
  _id: string;
  truck: string | Truck;
  originOffice: string | Office;
  destinationOffice: string | Office;
  departureDate: Date;
  packages: string[] | Package[];
  status: DeliveryStatus,
  route: any, // TO DO: Route type
  truckLoc?: any;
  distancePassed?: any;
  lastPathPointPassed: any;
}

export type Route = {
  _id: string;
  originOffice: string | Office;
  destinationOffice: string | Office;
  distance: number;
  duration: number;
  path: Path
}

export type Path = {
  points: PathPoint[];
  totalDistance: number
}

export type PathPoint = {
  points: GeoPoint;
  difference: number;
  totalDistance: number;
}

export type GeoPoint = {
  lng: number;
  lat: number;
}

export enum DeliveryStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}
