import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import awsConfig from '../config/aws.js'

const dynamoDBClient = new DynamoDBClient(awsConfig);

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Max-Age': 2592000,
};

const handler = (req, res) => {
  const send = async () => {
    const allRecords = [];
    let exclusiveStartKey = undefined;

    do {
      try {
        const scanCommand = new ScanCommand({
          TableName: "sqs-transactions",
          ExclusiveStartKey: exclusiveStartKey,
          Limit: 100,
        });

        const { Items, LastEvaluatedKey } = await dynamoDBClient.send(scanCommand);

        Items.map((item) => allRecords.push({
          idempotencyId: item.idempotencyId.S,
          amount: parseFloat(item.amount.N).toFixed(2),
          type: item.type.S
        }));

        exclusiveStartKey = LastEvaluatedKey;
      } catch (error) {
        console.error("Erro ao escanear os registros:", error);
        throw error;
      }
    } while (exclusiveStartKey);

    res.writeHead(200, headers).end(JSON.stringify(allRecords));
  }

  send();
}

export default handler;