const faker = require('faker')
const crypto = require('crypto')
const { default: API } = require('@aws-amplify/api-rest')

const AuthorizedDeviceAPI = require('../../../src/deviceAPI/AuthorizedDeviceAPI')
const DeviceAPI = require('../../../src/deviceAPI/DeviceAPI')
const { DEFAULT_REQ_OPTS } = require('../../../src/utils/defaultReqOpts')

describe('the AuthorizedDeviceAPI', () => {

  const pathToCert = 'test/seedData/fakeDevice_cert.crt'
  const deviceId = faker.datatype.uuid()
  const fakeResource = faker.random.word()
  const Authorization = AuthorizedDeviceAPI._createHashFromCertificateFile(pathToCert)

  function setUpAuthorizedDeviceApi(opts = {}) {
    const credentials = { pathToCert, deviceId, ...opts }
    AuthorizedDeviceAPI.setCredentials(credentials)
    return deviceId
  }

  afterEach(() => { jest.restoreAllMocks() })

  afterAll(() => { jest.restoreAllMocks() })

  it('should inherit from the DeviceAPI', () => {
    expect(AuthorizedDeviceAPI.DEVICE_API_PREFIX).toBe(DeviceAPI.DEVICE_API_PREFIX)
  })

  describe('setCredentials', () => {
    describe('when attempted with insufficient parameters', () => {
      describe('without a path to the certifcate', () => {
        it('should fail and display the approriate error message', () => {
          expect(() => {
            setUpAuthorizedDeviceApi({ pathToCert: undefined })

          }).toThrow('No Certificate specified')
        })
      })

      describe('without a device id', () => {
        it('should fail and display the approriate error message', () => {
          expect(() => {
            setUpAuthorizedDeviceApi({ deviceId: undefined })
          }).toThrow('No Device ID specified')
        })
      })

      describe('with an invalid device Id', () => {
        it('should fail and display the approriate error message', () => {
          const notADeviceId = 'CUBE4THECUBENING'
          expect(() => {
            setUpAuthorizedDeviceApi({ deviceId: notADeviceId })
          }).toThrow(`${notADeviceId} is not a valid UUIDv4`)
        })
      })

      describe('with an inaccesible file', () => {
        it('should fail and display the approriate error message', () => {
          const fakePathToCert = '/rööt/cert.crt'
          expect(() => {
            setUpAuthorizedDeviceApi({ pathToCert: fakePathToCert,
            })
          }).toThrow(`No Certificate could be found at ${fakePathToCert}`)
        })
      })

      describe('with a incompatible hashing algorithm', () => {

        it('should throw an error', () => {
          jest.spyOn(crypto, 'createHash')
            .mockImplementationOnce(() => crypto.createHash('md5'))

          expect(() => { setUpAuthorizedDeviceApi() }).toThrow('Invalid Hash Length')
        })
      })

    })

    describe('with valid credentials', () => {
      it('should set the device id', () => {
        setUpAuthorizedDeviceApi()

        expect(AuthorizedDeviceAPI.deviceId).toBe(deviceId)
      })

      it('should set the Authorization', () => {
        setUpAuthorizedDeviceApi()

        expect(AuthorizedDeviceAPI.Authorization).toBe(Authorization)
      })
    })

  })

  describe('authorizationHeaders', () => {
    it('sould return an object with {headers: Authorization} format', () => {
      setUpAuthorizedDeviceApi()

      const requestObject = AuthorizedDeviceAPI.authorizationHeaders
      expect(requestObject).toStrictEqual({
        headers: {
          Authorization,
        },
      })
    })
  })

  describe('its HTTP methods', () => {

    beforeEach(() => {
      setUpAuthorizedDeviceApi()
    })

    describe('get', () => {

      it('should call on the parent method with the Authorization header', async () => {
        const APISpy = jest.spyOn(DeviceAPI, 'get').mockImplementation()

        await AuthorizedDeviceAPI.get(fakeResource)

        expect(APISpy).toHaveBeenCalledWith(
          fakeResource,
          { headers: {
            Authorization,
          } },
        )
      })

      it('should call the API.get method with passed trough opts', async () => {
        const APISpy = jest.spyOn(API, 'get').mockImplementation()

        await AuthorizedDeviceAPI.get(fakeResource)

        expect(APISpy).toHaveBeenCalledWith(
          DeviceAPI.DEVICE_API_PREFIX,
          `devices/${deviceId}/${fakeResource}`,
          { headers: {
            Authorization,
          },
          ...DEFAULT_REQ_OPTS },
        )
      })
    })

    describe.each(['post', 'put', 'patch', 'put', 'del'])(
      'the %p method',
      method => {

        const fakeBody = {
          message: faker.random.words(10),
        }

        it('should call on the parent method', async () => {
          const APISpy = jest.spyOn(DeviceAPI, method).mockImplementation()

          await AuthorizedDeviceAPI[method](fakeResource, fakeBody)

          expect(APISpy).toHaveBeenCalledWith(
            fakeResource,
            fakeBody,
            { headers: { Authorization },
            },
          )
        })

        it(`should call the API ${method} method with passed trough opts`, async () => {
          const APISpy = jest.spyOn(API, method).mockImplementation()

          await AuthorizedDeviceAPI[method](fakeResource, fakeBody)

          expect(APISpy).toHaveBeenCalledWith(
            DeviceAPI.DEVICE_API_PREFIX,
            `devices/${deviceId}/${fakeResource}`,
            { headers: { Authorization },
              body: fakeBody,
              ...DEFAULT_REQ_OPTS,
            },
          )
        })
      },
    )
  })
})
