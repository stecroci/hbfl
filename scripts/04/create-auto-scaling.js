// Imports
const {
  CreateAutoScalingGroupCommand,
  PutScalingPolicyCommand
} = require('@aws-sdk/client-auto-scaling')

const { sendAutoScalingCommand } = require('./helpers')

// Declare local variables
const asgName = 'hamsterASG'
const ltName = 'hamsterLT'
const policyName = 'hamsterPolicy'
const tgArn = 'arn:aws:elasticloadbalancing:us-east-2:352685631396:targetgroup/hamsterTG/c79942ee20addd9e'

async function execute () {
  try {
    const response = await createAutoScalingGroup(asgName, ltName)
    await createASGPolicy(asgName, policyName)
    console.log('Created auto scaling group with:', response)
  } catch (err) {
    console.error('Failed to create auto scaling group with:', err)
  }
}

function createAutoScalingGroup (asgName, ltName) {
  const params = {
    AutoScalingGroupName: asgName,
    AvailabilityZones: [
      'us-east-2a',
      'us-east-2b'
    ],
    LaunchTemplate: {
      LaunchTemplateName: ltName
    },
    MaxSize: 2,
    MinSize: 1,
    TargetGroupARNs: [ tgArn ]
  }
  const command = new CreateAutoScalingGroupCommand(params)
  return sendAutoScalingCommand(command)
}


function createASGPolicy (asgName, policyName) {
  const params = {
    AdjustmentType: 'ChangeInCapacity',
    AutoScalingGroupName: asgName,
    PolicyName: policyName,
    PolicyType: 'TargetTrackingScaling',
    TargetTrackingConfiguration: {
      TargetValue: 5,
      PredefinedMetricSpecification: {
        PredefinedMetricType: 'ASGAverageCPUUtilization'
      }
    }
  }
  const command = new PutScalingPolicyCommand(params)
  return sendAutoScalingCommand(command)
}

execute()