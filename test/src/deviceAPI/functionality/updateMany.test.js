const AuthenticatedDeviceAPI = require('deviceAPI/AuthorizedDeviceAPI')
const updateMany = require('../../../../src/deviceAPI/functionality/updateMany')
const setUpAuthenticatedDeviceAPI = require('../../../testHelpers/setUpAuthenticatedDeviceAPI')
const testHTTPEndpoint = require('../../../testHelpers/testHTTPEndpoint')

describe('update functionalities', () => {
  const params = {
    fctGraph: {
      name: 'graph',
    },
    supportedVirtualFunctionalities: [ 'fct1', 'fct2']
    ,
  }

  const { deviceId } = setUpAuthenticatedDeviceAPI()

  testHTTPEndpoint({
    name: 'updateMany',
    handler: updateMany,
    httpVerb: 'put',
    serviceName: 'device-api',
    expectedURLSegment: `devices/${deviceId}/functionalities`,
    params: [params],
    expectedPayload: { body: params, ...AuthenticatedDeviceAPI.authorizationHeaders },
  })
})
