import { Client } from "../clients/models";
import { Office } from "../offices/models";

export type Package = {
  _id: string;
  size: PackageSize;
  status: string;
  description?: string;
  originOffice: Office;
  destinationOffice: Office;
  deliveredOn: Date | null;
  isPaid: boolean;
  isFragile: boolean;
  price: number;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  recipient?: Client;
}

export enum PackageSize {
  S = 'small',
  M = 'medium',
  L = 'large'
}