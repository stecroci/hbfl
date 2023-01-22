// Imports
const {
  RunInstancesCommand,
  StopInstancesCommand
} = require('@aws-sdk/client-ec2')
const { sendCommand } = require('./helpers')

// Declare local variables
const sgName = 'hamster_sg'
const keyName = 'hamster_key'
const instanceId = 'i-0cc136570f90dbee3'

async function execute () {
  try {
    await stopInstance(instanceId)
    const data = await createInstance(sgName, keyName)
    console.log('Created instance with:', data)
  } catch (err) {
    console.error('Failed to create instance with:', err)
  }
}

async function createInstance (sgName, keyName) {
  const params = {
    ImageId: 'ami-0a606d8395a538502',
    InstanceType: 't2.micro',
    KeyName: keyName,
    MaxCount: 1,
    MinCount: 1,
    Placement: {
      AvailabilityZone: 'us-east-2c'
    },
    SecurityGroups: [ sgName ]
  }
  const command = new RunInstancesCommand(params)
  return sendCommand(command)
}

function stopInstance (instanceId) {
  const params = {
    InstanceIds: [ instanceId ]
  }
  const command = new StopInstancesCommand(params)
  return sendCommand(command)
}

execute()
