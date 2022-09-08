const serializeAxiosResponse = require('../../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../../utils/defaultReqOpts')
const AuthorizedDeviceAPI = require('../../../AuthorizedDeviceAPI')
const { createDataUriFromFile } = require('../../../../utils/imageUtils')

/**
 * @desc uploads a process image
 * @memberof synapse.deviceAPI.functionality.image
 * @function createFromFile
 * @async
 * @param processId the process Id
 * @param functionalityId the process Id
 * @param body Object containing the image and metadata
 * @param body.pathToImage the absolute path to the image
 * @param body.imageCreatedAt the unix timestamp of the image creation
 * @example {
 * processId: 9588c1cc-9c39-4ddb-bb7d-bd3a2e9b26cf,
 * functionalityId:df78c050-4dc6-47d4-910e-812c175e05d9,
 * params: { pathToImage: './image.jpeg',imageCreatedAt: 13463458943  }
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (processId, functionalityId, body) => {
    const requestBody = {
      ...body,
      imageDataUri: createDataUriFromFile(body.pathToImage),
    }
    delete requestBody.pathToImage
    return AuthorizedDeviceAPI.post(
      `processes/${processId}/functionalities/${functionalityId}/images`,
      requestBody,
      DEFAULT_REQ_OPTS,
    )
  },
)
