try{
    var Logger = require('../../scripts/node/logger/logger')
}catch(e){
    var Logger = class Logger{
        log = (msg) => {
            console.log(msg)
        }
        text = (msg) => {
            console.log(msg)
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

    await getJson(`${req.root}/usm.scripts.json`)
    .then( async (filecontent) => {
        let content = JSON.parse(filecontent)
        if(req.type !== undefined && req.pkg !== undefined){
            if(req.pkg == '*'){
                content.scripts = content.scripts.filter(script => script.type == req.type)
            }else{
                content.scripts = content.scripts.filter(script => script.name == req.pkg && script.type == req.type)
            }
        }else if(req.pkg !== undefined){
            content.scripts = content.scripts.filter(script => script.name == req.pkg)
        }

        if(content.scripts.length > 1){
            line.text(`SCRIPT          TECNOLOGIA         CAMINHO`, 'info')
            content.scripts.forEach(element => {
                line.text(`${element.name}          ${element.type}         ${element.path}`, element.stable === 'true' ? 'success' : 'warning')
            });
        }else{
            await getJson(`${req.root}${content.scripts[0].path}/${req.pkg}.pkg.json`)
                    .then((pkgcontent) => {
                        let pkg = JSON.parse(pkgcontent)
                        let type = pkg.stable === 'false' ? 'warning' : 'success'
                        line.text(``)
                        pkg.stable === false ? line.log(`Informações de ${req.pkg} (Pacote não Estavel): `, type) : line.log(`Informações de ${req.pkg}: `, type)
                        let data = ['key', 'name', 'version', 'stable', 'author', 'usmdependencies', 'externaldependencies']
                        let title = ['Chave', 'Nome', 'Versão', 'Estavel', 'Autor', 'Dependencias USM', 'Dependencias Externas']
                        for(let i in data){
                            line.text(`             ${title[i]} : ${pkg[data[i]]}`, type)
                        }
                        line.text(``)
                    })
                    .catch(e => {
                        line.log(``)
                        line.log(e, 'error')
                        line.log(``)
                    })
        }
    })
    .catch(e => {
        line.log(``)
        line.log(e, 'error')
        line.log(``)
    })

}