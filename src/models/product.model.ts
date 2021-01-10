import { BaseModel } from './base.model';
export class Product extends BaseModel {
    name: string;
    openDate: Date | string;
    status: number;    
    constructor(init?: Partial<Product>) {
      super(init);
      Object.assign(this, init);
    }
  }