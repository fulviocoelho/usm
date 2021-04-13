const fs = require('fs')

class Jsonfs{

    constructor(name){
        this.file = name
    }

    create = async (json) => {
        let retorno
        
        await new Promise(resolve => {
            fs.access(`${this.file}.json`, fs.F_OK, err => {
                err == null ? resolve(retorno = false) : fs.appendFile(`${this.file}.json`, json, err => {
                    err != null ? retorno = false : retorno = true
                    resolve()
                }) 
            })
        })

        return retorno;
    }

    update = (json) => {
        fs.writeFile(`${this.file}.json`, json, err => {
            return err !== null ? true : false
        })
    }

}

module.exports = Jsonfs