import { Product } from '../../models/product.model';
import { ProductBaseRepository } from "../product.base.repository";
import { injectable } from "inversify";


@injectable()
export class ProductMockRepository extends ProductBaseRepository {

  getAll(): Promise<Product[]> {
    let products: Product[]  = [];
    return Promise.resolve(products);
  }  
}
