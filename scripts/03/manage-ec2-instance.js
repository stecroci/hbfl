// Imports
// TODO: Import the ec2 client
const {
  EC2Client,
  DescribeInstancesCommand,
  TerminateInstancesCommand
} = require('@aws-sdk/client-ec2')

function sendCommand (command) {
  const client = new EC2Client({ region: 'us-east-2' })
  return client.send(command)
}

async function listInstances () {
  const command = new DescribeInstancesCommand({})
  const data = await sendCommand(command)
  return data.Reservations.reduce((i, r) => {
    return i.concat(r.Instances)
  }, [])
}

async function terminateInstance (instanceId) {
  // TODO: Terminate an instance with a given instanceId
  const params = {
    InstanceIds: [ instanceId ]
  }
  const command = new TerminateInstancesCommand(params)
  return sendCommand(command)
}

listInstances().then(console.log)
//terminateInstance('i-07d043c2c8b28e1bb').then(console.log)
