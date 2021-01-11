import { Product } from '../../models/product.model';
import { ProductBaseRepository } from "../product.base.repository";
import { injectable } from "inversify";


@injectable()
export class ProductMockRepository extends ProductBaseRepository {
 

  async getAll(userId:string , productId:string): Promise<Product[]> {
    console.log(userId, productId);
    let products: Product[]  = [];
    return Promise.resolve(products);
  }  
}
