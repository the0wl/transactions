import { randomUUID } from 'node:crypto';
import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import { buildMessageBody } from '../utils/build-transaction-message.js';

const client = new SQSClient(awsConfig);

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Max-Age': 2592000,
};

const handler = (req, res) => {
  const { amount, type } = req.body;

  const command = new SendMessageCommand({
    QueueUrl: "https://sqs.us-east-2.amazonaws.com/590184002408/teste.fifo",
    MessageAttributes: {
      idempotencyId: {
        DataType: "String",
        StringValue: randomUUID(),
      },
      amount: {
        DataType: "String",
        StringValue: amount.toString(),
      },
      type: {
        DataType: "String",
        StringValue: type, // credit /debit
      },
    },
    MessageBody: buildMessageBody(amount, type),
    MessageGroupId: "transactions"
  });

  const send = async () => {
    await client.send(command);
    res.writeHead(201, headers).end();
  }

  send();
}

export default handler;