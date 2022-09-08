const { default: Amplify } = require('@aws-amplify/core')
const deviceAPI = require('./src/deviceAPI')
const { createConfig } = require('./src/amplify/configGenerator')

const DEFAULT_OPTS = {
  ENV: 'dev',
  AWS_REGION: 'eu-central-1',
}

/**
 * @desc sets the environement and region for the API
 * @memberof synapse
 * @function configure
 * @param {Object} [customOptions]
 * @param {string} [customOptions.ENV = 'dev']
 * @param {string} [customOptions.AWS_REGION = 'eu-central-1']
 * @returns {Object} the generated configuration for the given options
 */

const configure = customOptions => {
  const connectionOpts = {
    ...DEFAULT_OPTS,
    ...customOptions,
  }
  const config = createConfig(connectionOpts)
  Amplify.configure(config)

  return config
}

/**
 * @namespace synapse
 */

module.exports = {
  deviceAPI,
  configure,
}
