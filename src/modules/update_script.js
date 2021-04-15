try{
    var Logger = require('../../scripts/node/logger/logger')
}catch(e){
    var Logger = class Logger{
        log = (msg) => {
            console.log(msg)
        }
    }
}

const fs = require('fs')

let line = new Logger()

let stable = async (req) => {
    return new Promise(async (resolve, rejects) => {
        try{
            let bundle = await getJson(req)
            bundle.info.stable = req.value
            await setJson(bundle)
                .then(() => {
                    resolve()
                })
                .catch(e => {
                    rejects(e)
                })
        }catch(e){
            rejects(e)
        }
    })
}

let version = async (req) => {
    return new Promise(async (resolve, rejects) => {
        try{
            let bundle = await getJson(req)
            bundle.info.version = req.value
            await setJson(bundle)
                .then(() => {
                    resolve()
                })
                .catch(e => {
                    rejects(e)
                })
        }catch(e){
            rejects(e)
        }
    })
}

let usmdependencies = async (req) => {
    return new Promise(async (resolve, rejects) => {
        try{
            let bundle = await getJson(req)
            bundle.info.usmdependencies = [...bundle.info.usmdependencies, req.value]
            await setJson(bundle)
                .then(() => {
                    resolve()
                })
                .catch(e => {
                    rejects(e)
                })
        }catch(e){
            rejects(e)
        }
    })
}

let externaldependencies = async (req) => {
    return new Promise(async (resolve, rejects) => {
        try{
            let bundle = await getJson(req)
            bundle.info.externaldependencies = [...bundle.info.externaldependencies, req.value]
            await setJson(bundle)
                .then(() => {
                    resolve()
                })
                .catch(e => {
                    rejects(e)
                })
        }catch(e){
            rejects(e)
        }
    })
}

let getJson = async (req) => {
    return new Promise( (resolve, rejects) => {
        try{
            let usmpkg = fs.readFileSync(req.root+'/usm.scripts.json', {encoding:'utf8', flag:'r'});
            usmpkg = JSON.parse(usmpkg)
            let scripjson = usmpkg.scripts.filter(code => code.name === req.pkg)
    
            if(scripjson.length == 0){
                throw 'Pacote solicitado não encontrado!!'
            }
    
            let pkg = `${req.root}${scripjson[0].path}/${req.pkg}.pkg.json`;
            
            if (fs.existsSync(pkg)){
                let r = fs.readFileSync(pkg, {encoding:'utf8', flag:'r'});
                let bundle = {
                    info: JSON.parse(r),
                    path: pkg
                }
                resolve(bundle)
            }else{
                rejects(`${pkg} não encontrado`)
            }
        }catch(e){
            rejects(e)
        }
    })
}

let setJson = async (bundle) => {
    return new Promise( async (resolve, rejects) => {
        try{
            if (fs.existsSync(bundle.path)){
                fs.writeFileSync(bundle.path, JSON.stringify(bundle.info))
                resolve(true)
            }else{
                rejects(`${pkg} não encontrado`)
            }
        }catch(e){
            rejects(e)
        }
    })
}

module.exports = async (req) => {
    switch(req.command){
        case '-stable' : await stable(req)
                                .then( async () => {
                                    line.log(``)
                                    line.log(`Pacote ${req.pkg} foi atualizado com sucesso!!`, 'success')
                                    line.log(``)
                                })
                                .catch( async (e) => { 
                                    line.log(``)
                                    line.log(e, 'error') 
                                    line.log(``)
                                }); 
                        break;
        case '-version' : await version(req)
                                .then( async () => {
                                    line.log(``)
                                    line.log(`Pacote ${req.pkg} foi atualizado com sucesso!!`, 'success')
                                    line.log(``)
                                })
                                .catch( async (e) => { 
                                    line.log(``)
                                    line.log(e, 'error') 
                                    line.log(``)
                                }); 
                        break;
        case '-usmdependencies' : await usmdependencies(req)
                                        .then( async () => {
                                            line.log(``)
                                            line.log(`Pacote ${req.pkg} foi atualizado com sucesso!!`, 'success')
                                            line.log(``)
                                        })
                                        .catch( async (e) => { 
                                            line.log(``)
                                            line.log(e, 'error') 
                                            line.log(``)
                                        }); 
                                break;
        case '-externaldependencies' : await externaldependencies(req)
                                                .then( async () => {
                                                    line.log(``)
                                                    line.log(`Pacote ${req.pkg} foi atualizado com sucesso!!`, 'success')
                                                    line.log(``)
                                                })
                                                .catch( async (e) => { 
                                                    line.log(``)
                                                    line.log(e, 'error') 
                                                    line.log(``)
                                                }); 
                                        break;
        default : line.log(`Comando ${req.command} não reconhecido`, 'error'); break;
    }
}