const create = require('./src/modules/create_script')
const install = require('./src/modules/install_script')
const list = require('./src/modules/list_script')
const open = require('./src/modules/call_ide')
const addtech = require('./src/modules/add_tech')
const updatepkg = require('./src/modules/update_script')
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
            ext: process.argv[4],
            root: __dirname
        }
    }catch(e){
        line.log(e, 'error')
    }
    command = true
    valid.notNull(req) !== true ? h() : addtech(req)
}

let u = () => {
    let req
    try{
        req = {
            command: process.argv[3],
            value: process.argv[4],
            pkg: process.argv[5],
            root: __dirname
        }
    }catch(e){
        line.log(e, 'error')
    }
    command = true
    valid.notNull(req) !== true ? h() : updatepkg(req)
}

let l = () => {
    let req
    try{
        req = {
            type: process.argv[3],
            pkg: process.argv[4],
            root: __dirname
        }
    }catch(e){
        line.log(e, 'error')
    }
    command = true
    valid.notNull({ req: req['root'] }) !== true ? h() : list(req)
}

let o = () => {
    let req
    try{
        req = {
            pkg: process.argv[3],
            root: __dirname
        }
    }catch(e){
        line.log(e, 'error')
    }
    command = true
    valid.notNull({ req: req['root'] }) !== true ? h() : open(req)
}

let h = (call) => {
    command = true
    call !== true ? line.log('Erro : Comando não conhecido', 'error') : line.log('')
    line.log('Os seguintes comandos estão disponiveis nesta versão do sistema: ', 'info')
    line.log('')
    line.log('usm <add  -a  --a> <scripts type (node/vue/react)> <techs extension (.js/.vue/.ts)> "Adiciona um tipo de script a sua biblioteca"')
    line.log('usm <install  -i  --i> <scripts type (node/vue/react)> <scripts name> "Instala um script de sua biblioteca em seu projeto"')
    line.log('usm <create  -c  --c> <scripts type (node/vue/react)> <scripts name> "Cria a base para um novo script em sua biblioteca"')
    line.log('usm <update  -u  --u> <atribute command> <new value> <scripts name> "Atualiza as informações do script na biblioteca"')
    line.log('                      -stable')
    line.log('                      -version')
    line.log('                      -usmdependencies')
    line.log('                      -externaldependencies')
    line.log('')
}

process.argv[2] === 'init' ? init() : command = false
process.argv[2] === '-u' || process.argv[2] === '--u' || process.argv[2] === 'update' ? u() : command == true ? true : command = false
process.argv[2] === '-h' || process.argv[2] === '--h' || process.argv[2] === 'help' ? h(true) : command == true ? true : command = false
process.argv[2] === '-a' || process.argv[2] === '--a' || process.argv[2] === 'add' ? a() : command == true ? true : command = false
process.argv[2] === '-i' || process.argv[2] === '--i' || process.argv[2] === 'install' ? i() : command == true ? true : command = false
process.argv[2] === '-l' || process.argv[2] === '--l' || process.argv[2] === 'list' ? l() : command == true ? true : command = false
process.argv[2] === '-o' || process.argv[2] === '--o' || process.argv[2] === 'open' ? o() : command == true ? true : command = false
process.argv[2] === '-c' || process.argv[2] === '--c' || process.argv[2] === 'create' ? c() : command == true ? true : command = false
command == false ? h() : false