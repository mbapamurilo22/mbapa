import { SalesProduct } from "./Product";

export class Sale {
  _id: string;
  clientId: string;
  clientName: string;
  products: Array<SalesProduct>;
}
