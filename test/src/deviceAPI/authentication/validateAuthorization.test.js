const AuthorizedDeviceAPI = require('../../../../src/deviceAPI/AuthorizedDeviceAPI')
const validateAuthorization = require('../../../../src/deviceAPI/authentication/validateAuthorization')
const setUpAuthenticatedDeviceAPI = require('../../../testHelpers/setUpAuthenticatedDeviceAPI')
const DeviceAPI = require('../../../../src/deviceAPI/DeviceAPI')

describe('validateAuthorization', () => {
  it('should call to the verify authentication endpoint', () => {
    const APISpy = jest.spyOn(DeviceAPI, 'get').mockImplementation(() => Promise.resolve({}))
    setUpAuthenticatedDeviceAPI()
    validateAuthorization()
    expect(APISpy).toHaveBeenCalledWith('validateAuthorization', AuthorizedDeviceAPI.authorizationHeaders)
  })
})
