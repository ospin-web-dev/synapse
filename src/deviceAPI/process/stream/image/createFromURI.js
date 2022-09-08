const serializeAxiosResponse = require('../../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../../utils/defaultReqOpts')
const AuthorizedDeviceAPI = require('../../../AuthorizedDeviceAPI')

/**
 * @desc uploads a process image based on a given dataUri, for file based uploads
 * see createFromFile
 * @function createFromURI
 * @memberof synapse.deviceAPI.stream.image
 * @async
 * @param processId the process Id
 * @param streamId the process Id
 * @param body Object containing the image and metadata
 * @param body.imageDataUri the image encoded as dataUri in base64 format
 * @param body.imageCreatedAt the unix timestamp of the image creation
 * @example
 * processId: 9588c1cc-9c39-4ddb-bb7d-bd3a2e9b26cf,
 * streamId:55476189,
 * params: { imageDataUri: 'data:image/png;base64,iVBORw0KGgoAAA',imageCreatedAt: 13463458943  }
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (processId, streamId, body) => AuthorizedDeviceAPI.post(
    `processes/${processId}/streams/${streamId}/images`,
    body, DEFAULT_REQ_OPTS,
  ),
)
