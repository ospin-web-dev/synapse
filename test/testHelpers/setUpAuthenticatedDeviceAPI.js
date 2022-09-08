const faker = require('faker')

const synapse = require('../..')

function setUpAuthenticatedDeviceAPI({
  deviceId = faker.datatype.uuid(),
  pathToCert = 'test/seedData/fakeDevice_cert.crt',
} = {}) {
  synapse.deviceAPI.authentication.setCredentials({ deviceId, pathToCert })
  return { deviceId, pathToCert }
}

module.exports = setUpAuthenticatedDeviceAPI
