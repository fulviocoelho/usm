try{
    var Logger = require('../../scripts/node/logger/logger')
}catch(e){
    var Logger = class Logger {
        log = (msg) => {
            console.log(msg)
        }
    }
}
try{
    var Cmd = require('../../scripts/node/cmd/cmd')
}catch(e){
    var Cmd = class Cmd {
        do = () => {
            throw 'Script não encontrado!!'
        }
    }
}

const fs = require('fs')

let getJson = async (path) => {
    return new Promise( (resolve, rejects) => {
        try{
            if (fs.existsSync(path)){
                let r = fs.readFileSync(path, {encoding:'utf8', flag:'r'});
                resolve(r)
            }else{
                rejects(`${path} não encontrado`)
            }
        }catch(e){
            rejects(e)
        }
    })
}

module.exports = async (req) => {
    let line = new Logger()
    let console = new Cmd()
    if(req.pkg !== undefined){
        try{
            let json = await getJson(`${req.root}/usm.scripts.json`)
            json = JSON.parse(json)
            let pkg = json.scripts.filter(item => item.name === req.pkg)
            let tech = json.techs.filter(item => item.name === pkg[0].type)
            let command = json.filecall.replace(/-root-/ig, req.root)
            command = command.replace(/-file-/ig, `.${pkg[0].path}/${pkg[0].name}${tech[0].ext}`)
            await console.do(command)
            line.log(``)
            line.log('Comando executado com sucesso!!', 'success')
            line.log(``)
        }catch(e){
            line.log(``)
            line.log(e, 'error')
            line.log(``)
        }
    }else{
        try{
            let json = await getJson(`${req.root}/usm.scripts.json`)
            json = JSON.parse(json)
            let command = json.ide.replace(/-root-/ig, req.root)
            await console.do(command)
            line.log(``)
            line.log('Comando executado com sucesso!!', 'success')
            line.log(``)
        }catch(e){
            line.log(``)
            line.log(e, 'error')
            line.log(``)
        }
    }
}