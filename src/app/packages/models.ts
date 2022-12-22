import { Office } from "../offices/models";

export type Package = {
  _id: string;
  size: string;
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
}