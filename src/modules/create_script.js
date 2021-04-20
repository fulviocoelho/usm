try{
    var Logger = require('../../scripts/node/logger/logger')
}catch(e){
    var Logger = class Logger{
        log = (msg) => {
            console.log(msg)
        }
    }
}
const checkApp = require('./app_check')
const appLoader = require('./app_load')
const md5 = require('./md5')
const fs = require('fs')
const readline = require('readline')

module.exports = async (req) => {

    let load = new appLoader()
    let line = new Logger()

    await checkApp(req.root).then(async () => {

        let pkgcontent = {
            key : "",
            name : "",
            version : "",
            stable : false,
            author : "",
            usmdependencies : [],
            externaldependencies : []
        }
        
        var getScriptinfo = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        await new Promise(resolve => {
            getScriptinfo.question(`Nome do script (${req.name}) : `, function(answer) {
                pkgcontent.name = answer !== null && answer !== undefined && answer !== '' ? answer : req.name
                getScriptinfo.question(`Versão do script (1.0.0) : `, function(answer) {
                    pkgcontent.version = answer !== null && answer !== undefined && answer !== '' ? answer : '1.0.0'
                    getScriptinfo.question(`Autor : `, function(answer) {
                        pkgcontent.author = answer
                        pkgcontent.key = md5(req.name)
                        getScriptinfo.close();
                        resolve()
                    })
                })
            })
        })

        await load.init('Iniciando Criação de Script')

        let usmpkg = fs.readFileSync(req.root+'/usm.scripts.json', {encoding:'utf8', flag:'r'});
        usmpkg = JSON.parse(usmpkg)
        let scriptech = usmpkg.techs.filter(tech => tech.name === req.type)

        if(scriptech.length == 0){
            throw 'Technologia solicitada não encontrada!!'
        }

        await load.tic('Criando pasta ....', 25)
    
        let dir = `${req.root}/scripts/${req.type}/${req.name}`;
    
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        await load.tic('Criando script ....', 25)
    
        let script = `${req.root}/scripts/${req.type}/${req.name}/${req.name}${scriptech[0].ext}`;
        let scontent = ''
        let template = `${req.root}/src/templates/${req.type}.template`
        if (fs.existsSync(template)){
            scontent = fs.readFileSync(template, {encoding:'utf8', flag:'r'})
            scontent = scontent.replace(/"name"/ig, req.name)
        }
    
        if (!fs.existsSync(script)){
            fs.writeFileSync(script, scontent);
        }
        
        await load.tic('Criando pacote ....', 25)
    
        let pkg = `${req.root}/scripts/${req.type}/${req.name}/${req.name}.pkg.json`;
    
        if (!fs.existsSync(pkg)){
            fs.writeFileSync(pkg, JSON.stringify(pkgcontent));
        }
        
        await load.tic('Anexando script a USM ....', 25)
    
        //usmpkg = JSON.parse(usmpkg)
        usmpkg.scripts = [...usmpkg.scripts, { 
            id: pkgcontent.key, 
            name: req.name,
            type: req.type,
            stable: false,
            path: `/scripts/${req.type}/${req.name}`
        }]
    
        fs.writeFileSync(`${req.root}/usm.scripts.json`, JSON.stringify(usmpkg));
        
        await load.tic('Criação Finalizada!!', 1)

        line.log('')
        line.log('Script Criado com Sucesso!!', 'success')
        line.log('')
    }).catch( async (e) => {
        await load.endit(`Erro na criação de ${req.name}`)
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