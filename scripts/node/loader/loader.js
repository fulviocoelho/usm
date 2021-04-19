class Loader{

    process = require('process')

    constructor(size){
        let line = new Array
        for(let i = 0; i < size; i++){
            line[i] = '\u2591'
        }
        this.load = {
            bar : line,
            size : size,
            present : 0
        }
    }

    ongoing = () => {
        return new Promise(resolve => {
            let h = ['\\','|','/','-']
            let i = 0
            this.load.ongoing = setInterval(() => {
                i = (i > 3) ? 0 : i;
                process.stdout.cursorTo(this.load.size+2)
                process.stdout.write(h[i]);
                i++;
            }, 300);
            resolve()
        })
    }

    progressText = async (text) => {
        return await new Promise(async resolve => {
            await this.clear()
            await this.printBar()
            process.stdout.cursorTo(this.load.size+3)
            process.stdout.write(text)
            resolve()
        })
    }

    printBar = () => {
        return new Promise(resolve => {
            let bar = '['
            for(let i of this.load.bar){
                bar += i
            }
            bar += ']'
            process.stdout.write(bar)
            resolve()
        })
    }

    clear = () => {
        return new Promise(resolve => {    
            process.stdout.clearLine()
            process.stdout.cursorTo(0)
            resolve()
        })
    }

    endLoad = () => {
        return new Promise(resolve => {    
            clearInterval(this.load.ongoing)
            process.stdout.write('\n')
            resolve()
        })
    }

    async init(text){
        return new Promise(async resolve => {
            process.stdout.write("\x1B[?25l")
            await this.printBar()
            await this.ongoing()
            if(text !== null && text !== undefined && text !== ''){
                await this.progressText(text)
                resolve()
            }else{
                //console.log(text)
                resolve()
            }
            
        })
    }

    async tic(text){
        return new Promise(async resolve => {
            if(this.load.present < this.load.size){
                process.stdout.cursorTo(this.load.present+1)
                process.stdout.write('\u2588')
                this.load.bar[this.load.present] = '\u2588'
                this.load.present++
                if(text !== null && text !== undefined && text !== ''){
                    await this.progressText(text)
                    resolve()
                }else{
                    resolve()
                }
            }else{
                if(text !== null && text !== undefined && text !== ''){
                    await this.progressText(text)
                }
                await this.endLoad()
                resolve()
            }
        })
    }

}

module.exports = Loader