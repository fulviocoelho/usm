/*
console.log('usm args : '+JSON.stringify(process.argv))
console.log('usm args : '+__dirname)
*/

/*
const fs = require('./scripts/node/filejson/filejson')

let fsjson = new fs('testeapp')
let a
let teste = async () => { a = await fsjson.create(); console.log(JSON.stringify(a)) }
teste()
*/

const md5 = require('./src/modules/md5')
md5('teste')


console.log()