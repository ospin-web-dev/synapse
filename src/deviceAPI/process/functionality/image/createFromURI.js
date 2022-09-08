const serializeAxiosResponse = require('../../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../../utils/defaultReqOpts')
const AuthorizedDeviceAPI = require('../../../AuthorizedDeviceAPI')

/**
 * @desc uploads a process image based on a given dataUri, for file based uploads
 * see createFromFile
 * @function createFromURI
 * @memberof synapse.deviceAPI.functionality.image
 * @async
 * @param processId the process Id
 * @param functionalityId the process Id
 * @param body Object containing the image and metadata
 * @param body.imageDataUri the image encoded as dataUri in base64 format
 * @param body.imageCreatedAt the unix timestamp of the image creation
 * @example
 * processId: 9588c1cc-9c39-4ddb-bb7d-bd3a2e9b26cf,
 * functionalityId:df78c050-4dc6-47d4-910e-812c175e05d9,
 * params: { imageDataUri: 'data:image/png;base64,iVBORw0KGgoAAA',imageCreatedAt: 13463458943  }
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (processId, functionalityId, body) => AuthorizedDeviceAPI.post(
    `processes/${processId}/functionalities/${functionalityId}/images`,
    body, DEFAULT_REQ_OPTS,
  ),
)
