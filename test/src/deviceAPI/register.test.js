const AuthenticatedDeviceAPI = require('deviceAPI/AuthorizedDeviceAPI')
const synapse = require('../../../index')
const setUpAuthenticatedDeviceAPI = require('../../testHelpers/setUpAuthenticatedDeviceAPI')
const testHTTPEndpoint = require('../../testHelpers/testHTTPEndpoint')

describe('register', () => {
  const params = {
    fctGraph: {
      name: 'graph',
    },
    supportedVirtualFunctionalities: [ 'fct1', 'fct2']
    ,
  }

  const { deviceId } = setUpAuthenticatedDeviceAPI()

  testHTTPEndpoint({
    name: 'registration',
    handler: synapse.deviceAPI.register,
    httpVerb: 'post',
    serviceName: 'device-api',
    expectedURLSegment: `devices/${deviceId}/registrations`,
    params: [params],
    expectedPayload: { body: params, ...AuthenticatedDeviceAPI.authorizationHeaders },
  })
})
