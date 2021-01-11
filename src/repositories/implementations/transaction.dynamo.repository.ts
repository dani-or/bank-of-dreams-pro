import { Transaction } from '../../models/transaction.model';
import { TransactionBaseRepository } from "../transaction.base.repository";
import { injectable } from "inversify";
import {DynamoDbConnector} from "../../helpers/dynamodb.connector";

@injectable()
export class TransactionDynamoRepository extends TransactionBaseRepository {

  private dynamo: DynamoDbConnector = new DynamoDbConnector();

  async getAll(productId: string): Promise<Transaction[]> {
    let params = {
      TableName: "bod-transaction",
      KeyConditionExpression: '#type = :productId',
      IndexName: 'userproductid-index',
      ExpressionAttributeValues: {
          ':productId' : productId
          },
      ExpressionAttributeNames: {'#type' : 'userproductid', }
    };
    let data = await this.dynamo.query(params,false);
    let trans: Transaction[]  = [];
    if(!!data && !!data.Items){
      data.Items.forEach(element => {
        let  t :Transaction = new Transaction({
          transactionDate: element.transactionDate,
          description: element.description,
          amount: element.amount,
          iva:element.iva,
          reference:element.reference
        });
        trans.push(t);
      });
    }
    return Promise.resolve(trans);
  }
}