import { BaseController } from './base.controller';
import { injectable, inject } from 'inversify';
import { Response } from "express";
import { Request } from "express";
import { ProductService } from '../services/product.service';

@injectable()
export class ProductController extends BaseController {
    @inject(ProductService) 
    private readonly service: ProductService;

    constructor() {    
        super('/products');
    }

    public initializeRoutes(): void {
        this.router
      .get(this.path, this.getAll.bind(this));
    }

    private async getAll(request: Request, response: Response) {
        const data = await this.service.getAll();
        response.send(data);
    }
}
