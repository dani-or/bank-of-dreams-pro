import {DynamoDB} from "aws-sdk";

export class DynamoDbConnector {


    private dynamodb = new DynamoDB.DocumentClient();
    
    public query(params, notRecursive) {
        return new Promise((resolve, reject) => {
            this.makeSearch('query', params, (count, items, lastEvaluatedKey) => {
                resolve({ Count: count, Items: items, LastEvaluatedKey: lastEvaluatedKey });
            }, (error) => {
                reject(error);
            }, null, 0, [], notRecursive);
        });
    }

    private makeSearch(operation, params, onData, onError, ExclusiveStartKey, count, items, notRecursive) {
        if (!!ExclusiveStartKey) {
            params.ExclusiveStartKey = ExclusiveStartKey;
        }
        this.dynamodb[operation](params, function (err, data) {
            if (err) {
                onError(err);
            } else {
                if (!!data) {
                    var acc = data.Count || 0;
                    if (!!count) {
                        acc += count;
                    }
                    var i = data.Items || [];
                    if (!!items) {
                        i = i.concat(items);
                    }
                    if (!!data.LastEvaluatedKey) {
                        if (!!notRecursive) {
                            onData(acc, i, data.LastEvaluatedKey);
                        } else {
                            this.makeSearch(operation, params, onData, onError, data.LastEvaluatedKey, acc, i, notRecursive);
                        }
                    } else {
                        onData(acc, i);
                    }
                } else {
                    onData(count, items);
                }
            }
        });
    }
    
    public saveItem(tableName, item) {
        return new Promise((resolve, reject) => {
            var params = {
                TableName: tableName,
                Item: item
            };
            this.dynamodb.put(params, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

}