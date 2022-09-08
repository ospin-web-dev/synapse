const validateAuthorization = require('./validateAuthorization')
const AuthorizedDeviceAPI = require('../AuthorizedDeviceAPI')

/**
 * @namespace synapse.deviceAPI.authentication
 */

module.exports = {
  setCredentials: AuthorizedDeviceAPI.setCredentials,
  validateAuthorization,
}
