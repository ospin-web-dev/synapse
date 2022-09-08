const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')
const AuthorizedDeviceAPI = require('../AuthorizedDeviceAPI')

/**
 * @desc updates a device's functionality graph
 * @memberof synapse.deviceAPI.configuration
 * @function update
 * @async
 * @param {Object} params
 * @param {Object} params.fctGraph
 * @param {string} params.firmwareVersion
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(requestBody => (
  AuthorizedDeviceAPI.post(
    'configuration',
    requestBody,
    DEFAULT_REQ_OPTS,
  )
))
