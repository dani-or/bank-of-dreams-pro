import { Product } from '../../models/product.model';
import { ProductBaseRepository } from "../product.base.repository";
import { injectable, inject } from "inversify";
import {DynamoDbConnector} from "../../helpers/dynamodb.connector";
import {ProductStatus} from "../../enums/productStatus.enum";
import {ProductType} from "../../enums/productType.enum";


@injectable()
export class ProductDynamoRepository extends ProductBaseRepository {
  
  
  private dynamo: DynamoDbConnector = new DynamoDbConnector();
  
  async getAll(userId:string , productId:string): Promise<Product[]> {
    let params = {
      TableName: "bod-user-product",
      KeyConditionExpression: '#type = :userId AND #currentAttempt = :productId',
      IndexName: 'userId-productId-index',
      ExpressionAttributeValues: {
          ':userId' : userId,
          ':productId' : productId
          },
      ExpressionAttributeNames: {'#type' : 'userId', '#currentAttempt': 'productId'}
    };
    
    let r = await this.dynamo.query(params, false);
    let products: Product[]  = [];
    if(!!r && !!r.Items){
      r.Items.forEach(element => {        
        let  p:Product = new Product({
          balance: element.balance || 0,
          openDate: element.openDate,
          status: ProductStatus[element.status],
          type: ProductType[element.type],
        });
        products.push(p);
      });
    }    
    return Promise.resolve(products);
  }

}
