const { default: Amplify } = require('@aws-amplify/core')
const configGenerator = require('../src/amplify/configGenerator')

const injectMerkelIntoArgObjectAndReturn = args => ({
  ...args,
  merkel: 'you bet',
})
jest.spyOn(configGenerator, 'createConfig')
  .mockImplementation(injectMerkelIntoArgObjectAndReturn)

const synapse = require('../index')

describe('synapse', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const MODULE_STRUCTURE = {
    configure: 'function',
    deviceAPI: {
      authentication: {
        validateAuthorization: 'function',
        setCredentials: 'function',
      },
      process: {
        get: 'function',
        functionality: {
          image: {
            createFromFile: 'function',
            createFromURI: 'function',
          },
        },
        stream: {
          image: {
            createFromFile: 'function',
            createFromURI: 'function',
          },
        },
      },
      configuration: {
        update: 'function',
      },
      functionality: {
        updateMany: 'function',
      },
      register: 'function',
    },
  }

  function testFunctionPresentInModule(functionName, module) {
    it(`exposes ${functionName}`, () => {
      expect(typeof module[functionName]).toBe('function')
    })
  }

  function testStringPresentInModule(stringExportName, module) {
    it(`exposes ${stringExportName}`, () => {
      expect(typeof module[stringExportName]).toBe('string')
    })
  }

  function assertValueFunctionOrObject(value) {
    // this check provides some safety on the MODULE_STRUCTURE above so it is not extended
    // with something unexpected unintentionally
    if (value !== 'function' && value !== 'string' && typeof value !== 'object') {
      throw new Error(`${value} must be string 'function', 'string' or an object`)
    }
  }

  function testExportAgainstsynapse(exportName, exportValue, path) {
    assertValueFunctionOrObject(exportValue)

    switch (exportValue) {
      case 'function': {
        testFunctionPresentInModule(exportName, eval(path.join('.'))) // eslint-disable-line
        break
      }
      case 'string': {
        testStringPresentInModule(exportName, eval(path.join('.'))) // eslint-disable-line
        break
      }
      default: {
        testModuleStructure(exportValue, [ ...path, exportName ]) // eslint-disable-line
      }

    }
  }

  function testModuleContainsExpectedNumberOfExports(expectedModule, synapseModule) {
    const expectedNumberExports = Object.keys(expectedModule).length
    const numberExportsPresent = Object.keys(synapseModule).length

    it(`exports ${expectedNumberExports} functions/values + modules`, () => {
      expect(numberExportsPresent).toBe(expectedNumberExports)
    })
  }

  function assertIsModule(synapseModule, path) {
    if (typeof synapseModule !== 'object') {
      throw new Error(`synapseModule at: ${path.join('.')} is not an object`)
    }
  }

  function testModuleStructure(expectedModule, path) {
    describe(`${path.join('.')}`, () => {
      const synapseModule = eval(path.join('.')) // eslint-disable-line
      assertIsModule(synapseModule, path)
      testModuleContainsExpectedNumberOfExports(expectedModule, synapseModule)

      Object.entries(expectedModule).forEach(([ exportName, exportValue ]) => {
        testExportAgainstsynapse(exportName, exportValue, path)
      })
    })
  }

  testModuleStructure(MODULE_STRUCTURE, [ 'synapse' ])

  describe('connect', () => {
    it('calls createConfig with the expected default connection options if none are provided', () => {
      synapse.configure()

      expect(configGenerator.createConfig).toHaveBeenCalledWith({
        ENV: 'dev',
        AWS_REGION: 'eu-central-1',
      })
    })

    it('calls Amplify.configure with configGenerator.createConfig\'s returned value', () => {
      // see imports for the spy on configGenerator,
      // which needed to be spied on before the synapse was imported
      jest.spyOn(Amplify, 'configure').mockImplementation()

      const connectionOpts = {
        ENV: 'test',
        AWS_REGION: 'its-all-merkels-realm-now',
      }
      synapse.configure(connectionOpts)

      expect(Amplify.configure).toHaveBeenCalledWith(
        injectMerkelIntoArgObjectAndReturn(connectionOpts),
      )
    })
  })
})
