const create = require('./src/modules/create_script')
const install = require('./src/modules/install_script')
const addtech = require('./src/modules/add_tech')
const iniciar = require('./src/modules/app_install')
const Loader = require('./src/modules/app_load')
try{
    var Logger = require('./scripts/node/logger/logger')
}catch(e){
    var Logger = class Logger{
        log = (msg) => {
            console.log(msg)
        }
    }
}
try{
    var Validate = require('./scripts/node/validate/validate')
}catch(e){
    var Validate = class Validade{
        notNull = () => {
            return true
        }
    }
}

let command = true
let line = new Logger()
let valid = new Validate()

let init = async () => {
    command = true
    await iniciar(__dirname)
        .catch((e) => {
            line.log(e, 'error')
        })
}

let i = () => {
    let req
    try{
        req = {
            name: process.argv[3],
            root: __dirname
        }
    }catch(e){
        line.log(e, 'error')
    }
    command = true
    valid.notNull(req) !== true ? h() : install(req)
}

let c = () => {
    let req
    try{
        req = {
            type: process.argv[3],
            name: process.argv[4],
            root: __dirname
        }
    }catch(e){
        line.log(e, 'error')
    }
    command = true
    valid.notNull(req) !== true ? h() : create(req)
}

let a = () => {
    let req
    try{
        req = {
            type: process.argv[3],
            root: __dirname
        }
    }catch(e){
        line.log(e, 'error')
    }
    command = true
    valid.notNull(req) !== true ? h() : addtech(req)
}

let h = () => {
    line.log('Erro : Comando não conhecido', 'error')
    line.log('Os seguintes comandos estão disponiveis nesta versão do sistema: ', 'info')
    line.log('')
    line.log('usm <add  -a  --a> <type of script (node/vue/react)> "adiciona um tipo de script a sua biblioteca"')
    line.log('usm <install  -i  --i> <type of script (node/vue/react)> <script name> "instala um script de sua biblioteca em seu projeto"')
    line.log('usm <create  -c  --c> <type of script (node/vue/react)> <script name> "cria a base para um novo script em sua biblioteca"')
    line.log('')
}

process.argv[2] === 'init' ? init() : command = false
process.argv[2] === '-a' || process.argv[2] === '--a' || process.argv[2] === 'add' ? a(process.argv[3]) : command == true ? true : command = false
process.argv[2] === '-i' || process.argv[2] === '--i' || process.argv[2] === 'install' ? i(process.argv[3],process.argv[4]) : command == true ? true : command = false
process.argv[2] === '-c' || process.argv[2] === '--c' || process.argv[2] === 'create' ? c(process.argv[3],process.argv[4]) : command == true ? true : command = false
command == false ? h() : false