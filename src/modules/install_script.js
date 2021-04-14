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
const checkApp = require('./app_check')
const fs = require('fs')
const { copyFile } = require('fs/promises'); 

module.exports = async (req) => {
    let load = new appLoader()
    let line = new Logger()
    await load.init(`Iniciando instalação de ${req.name}`)

    await checkApp(req.root).then(async () => {
        await load.tic(`Buscando script ....`, 16)

        let usmpkg = fs.readFileSync(req.root+'/usm.scripts.json', {encoding:'utf8', flag:'r'});
        usmpkg = JSON.parse(usmpkg)

        pkg = usmpkg.scripts.filter(pkg => pkg.name == req.name)
        pkg = pkg[0]

        await load.tic(`Criando pasta src ....`, 16)
        
        if (!fs.existsSync('./src')){
            fs.mkdirSync('./src');
        }

        await load.tic(`Criando pasta scripts ....`, 16)

        if (!fs.existsSync('./src/scripts')){
            fs.mkdirSync('./src/scripts');
        }

        await load.tic(`Criando pasta ${pkg.type} ....`, 16)

        if (!fs.existsSync(`./src/scripts/${pkg.type}`)){
            fs.mkdirSync(`./src/scripts/${pkg.type}`);
        }

        await load.tic(`Criando pasta ${pkg.name} ....`, 16)

        if (!fs.existsSync(`./src/scripts/${pkg.type}/${pkg.name}`)){
            fs.mkdirSync(`./src/scripts/${pkg.type}/${pkg.name}`);
        }

        await load.tic(`Instalando pacotes de ${pkg.name} ....`, 16)

        await copyFile(`${req.root}${pkg.path}/${pkg.name}.js`, `${process.cwd()}/src/scripts/${pkg.type}/${pkg.name}/${pkg.name}.js`)
        await copyFile(`${req.root}${pkg.path}/${pkg.name}.pkg.json`, `${process.cwd()}/src/scripts/${pkg.type}/${pkg.name}/${pkg.name}.pkg.json`)
        
        await load.tic(`Instalação de ${pkg.name} finalizada`, 5)

        line.log('')
        line.log(`Script ${pkg.name} instalado com sucesso!!`, 'success')
        line.log('')
    }).catch(async (e) => {
        await load.endit(`Erro na instalação de ${req.name}`)
        line.log('')
        line.log('')
        if(e === false){
            line.log('Usm ainda não foi iniciado, use o comando "usm init" para iniciar o gerenciador', 'error')
        }else{
            line.log(e, 'error')
        }
        line.log('')
    })
}