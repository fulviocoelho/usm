const crypto = require('crypto')

module.exports = (file) => {
    let hash = crypto.createHash('md5').update(file+Date()).digest("hex")
    return hash
}