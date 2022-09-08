const faker = require('faker')
const AuthenticatedDeviceAPI = require('deviceAPI/AuthorizedDeviceAPI')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const synapse = require('../../../../../../index')
const setUpAuthenticatedDeviceAPI = require('../../../../../testHelpers/setUpAuthenticatedDeviceAPI')

describe('create Process stream Image', () => {

  afterAll(() => { jest.restoreAllMocks() })

  beforeEach(() => {
    jest.spyOn(AuthenticatedDeviceAPI, 'post').mockImplementation(args => args)
    setUpAuthenticatedDeviceAPI()
  })

  const processId = faker.datatype.uuid()
  const streamId = 46197316
  const imageCreatedAt = Date.now(faker.date.recent())
  const body = {
    imageDataUri: 'data:image/jpeg;base64,THENUMBERSWHATDOTHEYMEAN',
    imageCreatedAt,
  }

  it('calls amplifys API.post with the expected args', async () => {
    synapse.deviceAPI.process.stream.image.createFromURI(
      processId, streamId, body,
    )

    expect(AuthenticatedDeviceAPI.post).toHaveBeenCalledWith(
      `processes/${processId}/streams/${streamId}/images`,
      body, DEFAULT_REQ_OPTS,

    )
  })

  describe('on success', () => {

    beforeEach(() => {
      jest.spyOn(AuthenticatedDeviceAPI, 'post').mockImplementation(() => ({ data: 'success!', status: 200 }))
    })

    it('should respond with the data ,the status code and success=true', async () => {
      const resp = await synapse.deviceAPI.process.stream.image.createFromURI(
        processId, streamId, body,
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

    beforeEach(() => {
      jest.spyOn(AuthenticatedDeviceAPI, 'post').mockImplementation(() => { throw new Error() })
    })

    it('should throw an error', async () => {
      jest.spyOn(AuthenticatedDeviceAPI, 'post').mockImplementation(() => { throw error })

      await expect(synapse.deviceAPI.process.stream.image.createFromURI(processId, streamId, body))
        .rejects.toThrow(ERROR_TEXT)
    })
  })
})
