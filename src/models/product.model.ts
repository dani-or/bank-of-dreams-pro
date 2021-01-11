import { BaseModel } from './base.model';
export class Product extends BaseModel {
    balance: number;
    openDate: Date | string;
    status: string;
    type: string;   
    constructor(init?: Partial<Product>) {
      super(init);
      Object.assign(this, init);
    }
  }