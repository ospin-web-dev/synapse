const serializeAxiosResponse = require('../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')
const AuthorizedDeviceAPI = require('./AuthorizedDeviceAPI')

/**
 * @desc registers the device as connected to the cloud when the device boots up
 * @memberof synapse.deviceAPI
 * @function register
 * @async
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(requestBody => (
  AuthorizedDeviceAPI.post(
    'registrations',
    requestBody,
    DEFAULT_REQ_OPTS,
  )
))
