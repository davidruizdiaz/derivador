const { checkAccess, authenticated } = require("./auth")
const error404 = require("./error_404")

module.exports = {
  error404,
  checkAccess,
  authenticated,
}
