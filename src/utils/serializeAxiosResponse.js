const HTTPError = require('./HTTPError')

/**
 * @desc API response in case of a successful API call
 * @typedef ApiResponse
 * @memberOf synapse
 * @property {object} data contains the server response
 * @property {number} status contains the server status code
 */

const extractErrorMsg = error => (
  (
    error
    && error.response
    && error.response.data
    && error.response.data.message
  ) || (error && error.message) || ''
)

const extractStatusCode = error => (
  (
    error
    && error.response
    && error.response.status
  ) || null
)

module.exports = fn => (
  async (...args) => {
    try {
      const { status, data } = await fn(...args)
      return {
        status,
        data,
      }
    } catch (e) {
      throw new HTTPError({
        message: extractErrorMsg(e),
        error: e,
        status: extractStatusCode(e),
      })
    }
  }
)
