const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const DeviceAPI = require('./DeviceAPI')

class AuthorizedDeviceAPI extends DeviceAPI {

  static get HASHLENGTH() {
    return 44
  }

  static _createHashFromCertificateFile(pathToCertificate) {
    const certificate = fs.readFileSync(path.resolve(pathToCertificate), { encoding: 'utf-8' }).trim()
    const hash = crypto.createHash('sha256').update(certificate).digest('base64')
    return hash
  }

  static _assertCertificate(pathToCert) {

    if (!pathToCert) {
      throw Error('No Certificate specified')
    }
    if (!fs.existsSync(path.resolve(pathToCert))) {
      throw Error(`No Certificate could be found at ${pathToCert}`)
    }
  }

  static setCredentials({ deviceId, pathToCert }) {
    AuthorizedDeviceAPI._assertCertificate(pathToCert)

    super.setIdentity(deviceId)
    const Authorization = AuthorizedDeviceAPI._createHashFromCertificateFile(pathToCert)
    if (Authorization.length !== AuthorizedDeviceAPI.HASHLENGTH) {
      throw Error('Invalid Hash Length')
    }
    AuthorizedDeviceAPI.Authorization = Authorization
  }

  static get authorizationHeaders() {
    return {
      headers: {
        Authorization: AuthorizedDeviceAPI.Authorization,
      },
    }
  }

  static async get(resourcePath, opts) {
    return super.get(
      resourcePath,
      { ...AuthorizedDeviceAPI.authorizationHeaders, ...opts },
    )
  }

  static async post(resourcePath, body, opts) {
    return super.post(
      resourcePath,
      body,
      { ...AuthorizedDeviceAPI.authorizationHeaders, ...opts },
    )
  }

  static async put(resourcePath, body, opts) {
    return super.put(
      resourcePath,
      body,
      { ...AuthorizedDeviceAPI.authorizationHeaders, ...opts },
    )
  }

  static async patch(resourcePath, body, opts) {
    return super.patch(
      resourcePath,
      body,
      { ...AuthorizedDeviceAPI.authorizationHeaders, ...opts },
    )
  }

  static async del(resourcePath, body, opts) {
    return super.del(
      resourcePath,
      body,
      { ...AuthorizedDeviceAPI.authorizationHeaders, ...opts },
    )
  }

}

module.exports = AuthorizedDeviceAPI
