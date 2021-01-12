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
      .get(this.path, this.getAll.bind(this))
      .post(this.path, this.create.bind(this));
    }

    private async getAll(request: Request, response: Response) {
        let userId: string = request.query.userId +"";
        let productId: string = request.query.productId + "";
        const data = await this.service.getAll(userId , productId);
        response.send(data);
    }

    private async create(request: Request, response: Response) {
        const dto = request.body;
        const d = await this.service.create(dto.type, dto.userId);
        response.send({});
    }

}
