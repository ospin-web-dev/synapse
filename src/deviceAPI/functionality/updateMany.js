const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')
const AuthorizedDeviceAPI = require('../AuthorizedDeviceAPI')

/**
 * @desc updates a device's functionalities
 * @memberof synapse.deviceAPI.functionality
 * @function updateMany
 * @async
 * @param {Object} params
 * @param {Array} params.connectedPhysicalFunctionalities
 * @param {Array} [params.supportedVirtualFunctionalities]
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(requestBody => (
  AuthorizedDeviceAPI.put(
    'functionalities',
    requestBody,
    DEFAULT_REQ_OPTS,
  )
))
