import { BaseModel } from './base.model';
import { uuid } from "uuidv4";
export class Product extends BaseModel {
    balance: number;
    openDate: Date | string;
    status: string;
    type: string;
    id: string;
    constructor(init?: Partial<Product>) {
      super(init);
      Object.assign(this, init);
      if(!init.id){
        this.id = uuid();
      }
    }
  }