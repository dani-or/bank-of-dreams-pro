import { Transaction } from '../models/transaction.model';
import { injectable } from 'inversify';
import { Product } from 'models/product.model';

@injectable()
export abstract class ProductBaseRepository{
  
  abstract async getAll(userId:string , productId:string): Promise<Product[]>;
}
