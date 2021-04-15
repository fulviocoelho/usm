const fs = require('fs')
const appLoader = require('./app_load')
try{
    var Logger = require('../../scripts/node/logger/logger')
}catch(e){
    var Logger = class Logger {
        log = (msg) => {
            console.log(msg)
        }
    }
}

module.exports = (root) => {
    return new Promise ( async (resolve, reject) => {
        try{
            let load = new appLoader()
            await load.init('Iniciando Instalação de USM (Utility Script Manager)')

            let line = new Logger()

            let usmpkg = {
                scripts: [],
                techs: [],
                ide: '',
                filecall: ''
            }

            await load.tic('Gerando Pacote de Scripts ....', 50)

            if (!fs.existsSync(root+'/usm.scripts.json')){
                fs.writeFileSync(root+'/usm.scripts.json', JSON.stringify(usmpkg))
            }
            
            await load.tic('Criando Pasta scripts ....', 50)

            if (!fs.existsSync(root+'/scripts')){
                fs.mkdirSync(root+'/scripts')
            }
            
            await load.endit('Processo Finalizado')

            line.log('')
            line.log('Inicialização finalizada com sucesso!!', 'success')
            line.log('')
            resolve()
        }catch(e){
            reject(e)
        }
    })
}