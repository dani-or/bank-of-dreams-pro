import { inject, injectable } from 'inversify';
import {ProductBaseRepository} from '../repositories/product.base.repository';
import { Product } from '../models/product.model';

@injectable()
export class ProductService {

    @inject(ProductBaseRepository) 
    public repo: ProductBaseRepository;

    public async getAll(userId:string , productId:string): Promise<Product[]> {
        const data = await this.repo.getAll(userId, productId);
        return data;
    }

    public async create(typeP:string, userId: string ): Promise<any> {
        let p: Product = new Product({
            balance: 0,
            type: typeP
        });
        let data= await this.repo.create(p, userId);
        return data;
    }
    
}