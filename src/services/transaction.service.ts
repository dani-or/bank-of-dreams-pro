import { inject, injectable } from 'inversify';
import {TransactionBaseRepository} from '../repositories/transaction.base.repository';
import { Transaction } from '../models/transaction.model';

@injectable()
export class TransactionService {

    @inject(TransactionBaseRepository) 
    public repo: TransactionBaseRepository;

    public async getAll(): Promise<Transaction[]> {
        const data = await this.repo.getAll();
        return data;
    }

}