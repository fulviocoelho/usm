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
        let h = ['\\','|','/','-']
        let i = 0
        return setInterval(() => {
            i = (i > 3) ? 0 : i;
            process.stdout.cursorTo(this.load.size+2)
            process.stdout.write(h[i]);
            i++;
          }, 300);
    }

    progressText = (text) => {
        this.clear()
        this.printBar()
        process.stdout.cursorTo(this.load.size+3)
        process.stdout.write(text)
    }

    printBar = () => {
        let bar = '['
        for(let i of this.load.bar){
            bar += i
        }
        bar += ']'
        process.stdout.write(bar)
    }

    clear = () => {
        process.stdout.clearLine()
        process.stdout.cursorTo(0)
    }

    endLoad = () => {
        clearInterval(this.load.ongoing)
        process.stdout.write('\n')
    }

    init(text){
        process.stdout.write("\x1B[?25l")
        this.printBar()
        this.load.ongoing = this.ongoing()
        text !== null && text !== undefined && text !== '' ? this.progressText(text) : false
    }

    tic(text){
        if(this.load.present < this.load.size){
            process.stdout.cursorTo(this.load.present+1)
            process.stdout.write('\u2588')
            this.load.bar[this.load.present] = '\u2588'
            this.load.present++
            text !== null && text !== undefined && text !== '' ? this.progressText(text) : false
        }else{
            text !== null && text !== undefined && text !== '' ? this.progressText(text) : false
            this.endLoad()
        }
    }

}

module.exports = Loader