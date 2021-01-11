import { Transaction } from '../models/transaction.model';
import { injectable } from 'inversify';

@injectable()
export abstract class TransactionBaseRepository{
  
  abstract async getAll(productId: string): Promise<Transaction[]>;
}