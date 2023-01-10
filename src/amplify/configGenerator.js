/* ********************************************************* */
/*                          COMMON                           */
/* ********************************************************* */
const getCommonConfig = () => ({
  Analytics: { disabled: true },
})

/* ********************************************************* */
/*                          COMMON                           */
/* ********************************************************* */

const getAPIEndPointsConfig = ({ ENV, AWS_REGION }) => ({
  API: {
    endpoints: [
      {
        name: 'device-api',
        endpoint: `https://api-${ENV}.ospin-services.com/device-api/`,
        region: AWS_REGION,
      },
    ],
  },
})

/* ********************************************************* */
/*                            AUTH                           */
/* ********************************************************* */

const getAuthConfig = ({ AWS_REGION }) => ({
  Auth: {
    mandatorySignIn: false,
    region: AWS_REGION,
  },
})

/* ********************************************************* */
/*                    CONFIG GENERATION                      */
/* ********************************************************* */

const createConfig = ({ ENV, AWS_REGION }) => ({
  ...getCommonConfig({ AWS_REGION }),
  ...getAuthConfig({ AWS_REGION }),
  ...getAPIEndPointsConfig({ ENV, AWS_REGION }),
  stage: ENV,
})

module.exports = { createConfig, getAuthConfig }
