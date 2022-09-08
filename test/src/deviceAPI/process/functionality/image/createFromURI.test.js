const faker = require('faker')
const AuthenticatedDeviceAPI = require('deviceAPI/AuthorizedDeviceAPI')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const synapse = require('../../../../../../index')
const setUpAuthenticatedDeviceAPI = require('../../../../../testHelpers/setUpAuthenticatedDeviceAPI')

describe('create Process Functionality Image', () => {

  afterAll(() => { jest.restoreAllMocks() })

  beforeEach(() => {
    jest.spyOn(AuthenticatedDeviceAPI, 'post').mockImplementation((args = {}) => args)
    setUpAuthenticatedDeviceAPI()
  })

  const processId = faker.datatype.uuid()
  const functionalityId = faker.datatype.uuid()
  const imageCreatedAt = Date.now(faker.date.recent())
  const body = {
    imageDataUri: 'data:image/jpeg;base64,THENUMBERSWHATDOTHEYMEAN',
    imageCreatedAt,
  }

  it('calls amplifys API.post with the expected args', async () => {
    synapse.deviceAPI.process.functionality.image.createFromURI(
      processId, functionalityId, body,
    )

    expect(AuthenticatedDeviceAPI.post).toHaveBeenCalledWith(
      `processes/${processId}/functionalities/${functionalityId}/images`,
      body, DEFAULT_REQ_OPTS,
    )
  })

  describe('on success', () => {

    beforeEach(() => {
      jest.spyOn(AuthenticatedDeviceAPI, 'post').mockImplementation(() => ({ data: 'success!', status: 200 }))
    })

    it('should respond with the data ,the status code and success=true', async () => {
      const resp = await synapse.deviceAPI.process.functionality.image.createFromURI(
        processId, functionalityId, body,
      )

      expect(resp).toStrictEqual(expect.objectContaining({
        data: 'success!',
        status: 200,
      }))
    })
  })

  describe('on failure', () => {
    const ERROR_TEXT = 'session error'
    const error = new Error(ERROR_TEXT)

    it('should throw an error', async () => {
      jest.spyOn(AuthenticatedDeviceAPI, 'post').mockImplementation(() => { throw error })

      await expect(synapse.deviceAPI.process.functionality.image.createFromURI(processId, functionalityId, body))
        .rejects.toThrow(ERROR_TEXT)
    })
  })
})
