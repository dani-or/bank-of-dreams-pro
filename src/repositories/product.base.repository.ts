import { Transaction } from '../models/transaction.model';
import { injectable } from 'inversify';

@injectable()
export abstract class ProductBaseRepository{
  
  abstract getAll(): Promise<Transaction[]>;
}
