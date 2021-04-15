try{
    var Logger = require('../../scripts/node/logger/logger')
}catch(e){
    var Logger = class Logger {
        log = (msg) => {
            console.log(msg)
        }
    }
}

const appLoader = require('./app_load')
const fs = require('fs')

module.exports = async (req) => {
    let line = new Logger()
    let load = new appLoader()

    try{

        await load.init('Preparando adição de tech a biblioteca')

        await load.tic('Verificando arquivos essenciais ....', 25)

        let dir = `${req.root}/scripts`;
        let configfile = `${req.root}/usm.scripts.json`
        if (fs.existsSync(dir) && fs.existsSync(configfile)){
            let dir = `${req.root}/scripts/${req.type}`;
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            
            await load.tic('Criando pasta de templates ....', 25)

            dir = `${req.root}/src/templates`;
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }

            await load.tic('Criando arquivo de template ....', 25)

            template = `${req.root}/src/templates/${req.type}.template`;
            if (!fs.existsSync(template)){
                fs.writeFileSync(template, '')
            }

            await load.tic('Indexando tech a biblioteca ....', 25)

            let usmpkg = fs.readFileSync(configfile, {encoding:'utf8', flag:'r'});
    
            usmpkg = JSON.parse(usmpkg)
            usmpkg.techs = [...usmpkg.techs, { 
                name: req.type,
                ext: req.ext,
                path: `/scripts/${req.type}/`
            }]

            fs.writeFileSync(`${req.root}/usm.scripts.json`, JSON.stringify(usmpkg));

            await load.endit('Finalizado com Sucesso!!')

            line.log(``)
            line.log(`Technologia ${req.type} adicionada a sua biblioteca`, 'success')
            line.log(`Para facilitar sua vida, modifique o arquivo ./src/template/${req.type}.template`, 'info')
            line.log(`Assim todo arquivo criado da technologia ${req.type} tera esse formato basico`, 'info')
            line.log(`Utilize "name" em locais que o nome do script deve ser colocado`, 'info')
            line.log(``)
        }else{
            await load.endit('Erro ao tentar adicionar tech!!')
            line.log(``)
            line.log(`Usm ainda não foi iniciado, use o comando "usm init" para iniciar o gerenciador`, 'error')
            line.log(``)
        }
    
    }catch(e){
        await load.endit(`Erro na criação de ${req.type}`)
        line.log(e, 'error')
    }
}