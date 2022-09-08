class RegexUtils {

  static get UUIDV4() {
    return /^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-4[A-Za-z0-9]{3}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/
  }

  static get FILE_EXTENSION() { return /\.([0-9a-z]{1,5}$)/ }

}

module.exports = RegexUtils
