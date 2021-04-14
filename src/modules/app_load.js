try{
    var Loader = require('../../scripts/node/loader/loader')
}catch(e){
    var Loader = class Loader{
        load = {
            size: 1,
            present: 0
        }
        init = (text) => {
            console.log(`USM : ${text}`)
        }
        tic = (text) => {
            if(text !== '' && text !== null && text !== undefined){
                console.log(`Processo : ${text}`)
            }
        }
    }
}

module.exports = class appLoad {

    constructor(){
        this.load = new Loader(100)
    }

    init = async (text) => {
        console.log('')
        await this.load.init(text)
    }

    tic = async (text, times) => {
        for(let i = 0; i < times; i++){
            if(text !== '' && i == 0){
                await this.load.tic(text)
            }else{
                await this.load.tic()
            }
        }
    }

    endit = async (text) => {
        let sub = this.load.load.size - this.load.load.present
        for(let i = 0; i <= sub; i++){
            if(text !== '' && i == 0){
                await this.load.tic(text)
            }else{
                await this.load.tic()
            }
        }
    }

}