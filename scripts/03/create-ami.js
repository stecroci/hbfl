// Imports
// TODO: Import the ec2 client
const{
  EC2Client,
  CreateImageCommand,
} = require('@aws-sdk/client-ec2')

function sendCommand (command) {
  const client = new EC2Client({ region: 'us-east-2' })
  return client.send(command)
}

createImage('i-0cc136570f90dbee3', 'hamsterImage')
  .then(() => console.log('Complete'))

async function createImage (seedInstanceId, imageName) {
  // TODO: Implement AMI creation
  const params = {
    InstanceId: seedInstanceId,
    Name: imageName
  }
  const command = new CreateImageCommand(params)
  return sendCommand(command)
}
