import { BaseModel } from './base.model';
export class Transaction extends BaseModel {
    transactionDate: Date | string;
    description: string;
    amount: number;
    iva:number;
    reference:number;
    constructor(init?: Partial<Transaction>) {
      super(init);
      Object.assign(this, init);
    }
  }