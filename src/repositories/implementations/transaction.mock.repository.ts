import { Transaction } from '../../models/transaction.model';
import { TransactionBaseRepository } from "../transaction.base.repository";
import { injectable } from "inversify";


@injectable()
export class TransactionMockRepository extends TransactionBaseRepository {

  async getAll(productId: string): Promise<Transaction[]> {
    let trans: Transaction[]  = [];
    return Promise.resolve(trans);
  }  
}
