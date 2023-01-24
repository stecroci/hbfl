// Imports
const { PutBucketWebsiteCommand } = require('@aws-sdk/client-s3')
const { sendS3Command: sendCommand } = require('./helpers')

const bucketName = 'hamster-bucket-sc2023'

async function execute () {
  try {
    const response = await configureS3Site(bucketName)
    console.log(response)
  } catch (err) {
    console.error('Error configuring S3 static site:', err)
  }
}

async function configureS3Site (bucketName) {
  // Use PutBucketWebsiteCommand to create static site
  const params = {
    Bucket: bucketName,
    WebsiteConfiguration: {
      IndexDocument: {
        Suffix: 'index.html'
      }
    }
  }
  const command = new PutBucketWebsiteCommand(params)
  return sendCommand(command)
}

execute()
