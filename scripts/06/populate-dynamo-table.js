// Imports
const {
  BatchWriteCommand
} = require('@aws-sdk/lib-dynamodb')
const {
  getHamsterData,
  getRaceData,
  sendDynamoItemCommand
} = require('./helpers')

async function execute () {
  try {
    const hamstersData = await getHamsterData()
    await populateTable('hamsters', hamstersData)

    const raceData = await getRaceData()
    const response = await populateTable('races', raceData)

    console.log(response)
  } catch (err) {
    console.error('Could not populate table:', err)
  }
}

async function populateTable (tableName, data) {
  const param = {
    RequestItems: {
      [tableName]: data.map(i => {
        return {
          PutRequest: {
            Item: i
          }
        }
      })
    }
  }
  const command = new BatchWriteCommand(param)
  return sendDynamoItemCommand(command)
}

execute()