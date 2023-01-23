const {
  DynamoDBClient
} = require('@aws-sdk/client-dynamodb')
const {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  ScanCommand
} = require('@aws-sdk/lib-dynamodb')

async function sendCommand (command) {
  const client = new DynamoDBClient({ region: 'us-east-2' })
  const docClient = DynamoDBDocumentClient.from(client)
  return docClient.send(command)
}

async function getAll (tableName) {
  const params = {
    TableName: tableName
  }
  const command = new ScanCommand(params)
  const response = await sendCommand(command)
  return response.Items
}

async function get (tableName, id) {
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'id = :hkey',
    ExpressionAttributeValues: {
      ':hkey': +id
    }
  }
  const command = new QueryCommand(params)
  const respone = await sendCommand(command)
  return respone.Items[0]
}

async function put (tableName, item) {
  const params = {
    TableName: tableName,
    Item: item
  }
  const command = new PutCommand(params)
  return sendCommand(command)
}

module.exports = {
  get,
  getAll,
  put
}
