try{
    var Logger = require('../../scripts/node/logger/logger')
}catch(e){
    var Logger = class Logger {
        log = (msg) => {
            console.log(msg)
        }
    }
}

const fs = require('fs')

module.exports = (req) => {
    let line = new Logger()

    try{
        let dir = `${req.root}/scripts`;
        if (fs.existsSync(dir)){
            let dir = `${req.root}/scripts/${req.type}`;
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            line.log(``)
            line.log(`Technologia ${req.type} adicionada a sua biblioteca`, 'success')
            line.log(``)
        }else{
            line.log(``)
            line.log(`Usm ainda não foi iniciado, use o comando "usm init" para iniciar o gerenciador`, 'error')
            line.log(``)
        }
    
    }catch(e){
        line.log(e, 'error')
    }
}