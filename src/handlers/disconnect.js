'use strict'

const AWS = require('aws-sdk')

exports.handler = async (event, _context) => {
  const connectionId = event.requestContext.connectionId

  const CONNECTION_TABLE = process.env.CONNECTION_TABLE
  const dynamoDbClient = new AWS.DynamoDB()

  const deleteParams = {
    TableName: CONNECTION_TABLE,
    Key: {
      connectionId: {
        S: connectionId
      }
    }
  }

  await dynamoDbClient
    .deleteItem(deleteParams)
    .promise()
    .then(data => {
      console.log(`Deleted connectionId: ${connectionId}`)
      console.log(data)
    })
    .catch(err => {
      console.error(`Failed to disconnect connectionId: ${connectionId}`)
      console.error(err)
      throw err
    })

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Disconnected connectionId: ${connectionId}`
    })
  }
}
