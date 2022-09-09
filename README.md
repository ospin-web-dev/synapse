[![codecov](https://codecov.io/gh/ospin-web-dev/synapse/branch/main/graph/badge.svg?token=5E41F0X7TY)](https://codecov.io/gh/ospin-web-dev/synapse)

Documentation can be found [here](https://ospin-web-dev.github.io/synapse/)

## Table of Contents

- [Use Overview](#Overview)
  - [Configuration](#Configuration)
  - [Authenticating](#Authenticating)
- [Use Examples](#Use-Examples)
- [Contributing](#Contributing)
---

## <a name="Overview">Overview</a>

The @ospin/synapse is a JavaScript SDK to communicate to Ospin's HTTP API from a device. It is build on top of @aws-amplify. To use it, the device has to have a X509 certificate that was issued by the OSPIN cloud.

  - [configure synapse for the environment](#Configuration)
  - [Authentication](#Authenticating)

#### <a name="Configuration">Configuration</a>
```js
const synapse = require('@ospin/synapse')

synapse.configure() // set up the SDK for default usage
```

#### <a name="Authenticating">Authenticating</a>

With the synapse configured, a device can authenticate with deviceId and the path to the X509 certificate

```js
const deviceId = "707be014-1e80-482f-ae5c-b6b7b11a4ad2"
const pathToCert = "my/path/to/cert"
synapse.deviceAPI.authentication.setCredentials({
  deviceId,
  pathToCert,
})

const { status } = await synapse.deviceAPI.validateAuthorization() // allows to validate your credentials
```

## <a name="Use-Examples">Use Example</a>
```js
// loading a process

const processId = "a3339d89-345b-4baf-9859-46a4542a505a"
const {
  status: 200,
  data: process,
} = await synapse.deviceAPI.process.get(processId)


```

## <a name="Contributing">Contributing</a>

This repo employs the github action [semantic-release](https://semantic-release.gitbook.io/semantic-release/), which, on approved PRs to `main`, sniffs the PR title/commit message to automatically bump the semantic versioning and publish the package to NPM.

All PRs to the `main` branch should indicate the semantic version change via the following options:

Available types:
 - feat: A new feature
 - fix: A bug fix
 - docs: Documentation only changes (unclear if this bumps version)
 - style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
 - refactor: A code change that neither fixes a bug nor adds a feature
 - perf: A code change that improves performance
 - test: Adding missing tests or correcting existing tests
 - build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
 - ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
 - chore: Other changes that don't modify src or test files
 - revert: Reverts a previous commit

Add BREAKING CHANGE into the commit message body (!) to indicate a major version release.
