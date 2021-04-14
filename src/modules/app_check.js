const fs = require('fs')

module.exports = (root) => {
    return new Promise ((resolve, reject) => {
        !fs.existsSync(root+'/usm.scripts.json') ? reject(false) : true
        !fs.existsSync(root+'/scripts') ? reject(false) : true
        !fs.existsSync(root+'/scripts/node') ? reject(false) : true
        resolve() 
    })
}