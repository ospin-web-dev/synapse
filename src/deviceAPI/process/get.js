const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')
const AuthorizedDeviceAPI = require('../AuthorizedDeviceAPI')
/**
 * @desc returns a process
 * @function get
 * @memberof synapse.deviceAPI.process
 * @async
 * @param {string} processId Id of the process to be fetched
 * @returns {Promise<ApiResponse>}
 */
module.exports = serializeAxiosResponse(
  processId => AuthorizedDeviceAPI.get(`processes/${processId}`, { ...DEFAULT_REQ_OPTS }),
)
