const fs = require('fs')
const RegexUtils = require('./RegexUtils')

function createDataUriFromFile(file) {
  if (!fs.existsSync(file)) {
    throw Error(`No file found at location ${file}`)
  }
  const fileExtensionRegexMatch = new RegExp(RegexUtils.FILE_EXTENSION).exec(file)
  const fileExtension = fileExtensionRegexMatch[fileExtensionRegexMatch.length - 1]
  const dataUri = `data:image/${fileExtension};base64,`.concat(fs.readFileSync(file, 'base64'))
  return dataUri
}

module.exports = {
  createDataUriFromFile,
}
