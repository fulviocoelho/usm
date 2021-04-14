const fs = require('fs')

class Filemng{

    constructor(name,path){
        this.file = name
        this.root = path
    }

    create = async (content) => {
        let retorno
        
        await new Promise(resolve => {
            fs.access(`${this.file}`, fs.F_OK, err => {
                err == null ? resolve(retorno = false) : fs.appendFile(`${this.file}`, content, err => {
                    err != null ? retorno = false : retorno = true
                    resolve()
                }) 
            })
        })

        return retorno;
    }

    update = (content,file) => {
        let filePath = ''
        filePath = filePath.concat(this.root, file !== null ? file : this.file)
        fs.writeFile(filePath, content, err => {
            return err !== null ? true : false
        })
    }

    read = async (file) => {
        let retorno
        await new Promise(resolve => {
            let filePath = ''
            filePath = filePath.concat(this.root, file !== null ? file : this.file)
            fs.readFile(filePath, (err, data) => {
                err == null ? retorno = JSON.parse(data) : retorno = false
                resolve()
            })
        })
        return retorno
    }

    acess = async (file,path) => {
        let retorno = true
        await new Promise(resolve => {
            let filePath = ''
            let f
            file !== null ? f = file : f = this.file
            let a = f.split('/')
            console.log(JSON.stringify(a))
            let fpath = this.root
            //filePath = filePath.concat(this.root, )
            for(let val of a){
                fs.access(fpath+val, fs.F_OK, err => {
                    console.log(fpath+val+' - '+err)
                    err == null ? fpath += '/'+val : retorno = false
                })
                console.log('antes do resolve')
                if(val === a[a.lenght-1]){
                    resolve()  
                } 
                console.log('depois do resolve')
            }
            console.log('depois do for')
            console.log('antes do retorno')
            return 'aa'+retorno;
        })
    }

}

module.exports = Filemng