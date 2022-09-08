const { default: API } = require('@aws-amplify/api-rest')
const { DEFAULT_REQ_OPTS } = require('../utils/defaultReqOpts')
const RegexUtils = require('../utils/RegexUtils')

class DeviceAPI {

  static setIdentity(deviceId) {
    if (!deviceId) {
      throw Error('No Device ID specified')
    }
    if (!deviceId.match(RegexUtils.UUIDV4)) {
      throw Error(`${deviceId} is not a valid UUIDv4`)
    }
    DeviceAPI._deviceId = deviceId
  }

  static get deviceId () {
    if (DeviceAPI._deviceId === undefined) {
      throw Error('No Device ID specified')
    }
    return DeviceAPI._deviceId
  }

  static get DEVICE_API_PREFIX() {
    return 'device-api'
  }

  static _prefixResource(path) {
    return `devices/${DeviceAPI.deviceId}/${path}`
  }

  static async get(path, opts) {
    return API.get(
      DeviceAPI.DEVICE_API_PREFIX,
      DeviceAPI._prefixResource(path),
      { ...DEFAULT_REQ_OPTS, ...opts },
    )
  }

  static async post(path, body, opts) {
    return API.post(
      DeviceAPI.DEVICE_API_PREFIX,
      DeviceAPI._prefixResource(path),
      { ...DEFAULT_REQ_OPTS, body, ...opts },
    )
  }

  static async put(path, body, opts) {
    return API.put(
      DeviceAPI.DEVICE_API_PREFIX,
      DeviceAPI._prefixResource(path),
      { ...DEFAULT_REQ_OPTS, body, ...opts },
    )
  }

  static async patch(path, body, opts) {
    return API.patch(
      DeviceAPI.DEVICE_API_PREFIX,
      DeviceAPI._prefixResource(path),
      { ...DEFAULT_REQ_OPTS, body, ...opts },
    )
  }

  static async del(path, body, opts) {
    return API.del(
      DeviceAPI.DEVICE_API_PREFIX,
      DeviceAPI._prefixResource(path),
      { ...DEFAULT_REQ_OPTS, body, ...opts },
    )
  }

}

module.exports = DeviceAPI
