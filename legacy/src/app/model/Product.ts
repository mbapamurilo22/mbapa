export class Product {
  _id: string; 
  name: string;
  price: number;
}

export class SalesProduct extends Product {
  quantity: number;
}