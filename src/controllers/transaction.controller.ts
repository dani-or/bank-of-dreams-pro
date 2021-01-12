import { BaseController } from './base.controller';
import { injectable, inject } from 'inversify';
import { Response } from "express";
import { Request } from "express";
import { TransactionService } from '../services/transaction.service';

@injectable()
export class TransactionController extends BaseController {
    @inject(TransactionService) 
    private readonly service: TransactionService;

    constructor() {    
        super('/transactions');
    }

    public initializeRoutes(): void {
        this.router
      .get(this.path, this.getAll.bind(this));
    }

    private async getAll(request: Request, response: Response) {
        let productId: string = request.query.productId + "";
        const data = await this.service.getAll(productId);
        response.send(data);
    }
}
