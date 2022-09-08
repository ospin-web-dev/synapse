Documentation can be found [here](https://ospin-web-dev.github.io/synapse/)

---

## Table of Contents

- [Use Overview](#UseOverview)
  - [Configuration](#Configuration)
  - [Authenticating as a User](#Authenticating-as-a-User)
  - [Authenticating as a Device](#Authenticating-as-a-Device)
- [API Documentation](#API-documentation)
  - [Modules and their Methods](#modules-and-their-methods)
  - [Helper Methods](#helper-methods)
- [Use Examples](#Use-Examples)
- [Contributing](#Contributing)
- [Upcoming](#Upcoming)

---

## <a name="UseOverview">Use Overview</a>

The @ospin/synapse exposes a set of conveniences methods wrapping calls to the OSPIN AWS backend, JSON serving, rest-like, API. Unless a method is explicitly labeled as using a public endpoint, or otherwise stated, all synapse consumers must do the following before using the methods provided:
  - [configure the synapse for their environment](#Configuration)
  - authenticate [as a User](#Authenticating-as-a-User) or [as a Device](#Authenticating-as-a-Device)

#### <a name="Configuration">Configuration</a>
```js
const synapse = require('@ospin/synapse') // or import

synapse.configure() // set up the SDK for default usage
```

#### <a name="Authenticating-as-a-User">Authenticating as a User</a>

With the synapse configured, a user can authenticate as their OSPIN AWS Cognito user:
```js
const synapse = require('@ospin/synapse')

synapse.auth.signIn(username, password) // may require 2FA
```

#### <a name="Authenticating-as-a-Device">Authenticating as a Device</a>

With the synapse configured, a device can authenticate using its certificate:
```js
synapse.deviceAPI.authentication.setCredentials({
  deviceId: <deviceId>,
  pathToCert: <pathToCert>
})


synapse.deviceAPI.validateAuthorization()
// -> { sucess, status, data, errorMsg }

```
---

## <a name="Use-Examples">Use Example</a>
```js
// getting the list representation of all devices (that the authenticated consumer is privileged to)
const synapse = require('@ospin/synapse')

synapse.connect()

const username = 'Nero Claudius Caesar Augustus Germanicus'
const password = 'BurnRomeToMakeANewPalace@Good-Plan-&-Ok-Password',

synapse.auth.signIn(username, password)

const {
  success: listDevicesWasSuccessful,
  data: devicesList,
  errorMsg: listDevicesErrorMsg,
  error: listDevicesError
} = synapse.device.list()

if (listDevicesWasSuccessful) {
  console.log(deviceList)
  // -> [ { ...deviceObj }, { ...deviceObj }, ... ]
} else {
  // kindly find out why...
  console.error(errorMsg)

  // ..or live up to the username and be an unforgiving and unyielding tyrant
  throw listDevicesError
  // -> 💣
}

```

---

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

---

