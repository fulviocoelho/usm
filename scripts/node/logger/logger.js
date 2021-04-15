class Logger{

    statusLog = {
        success : {
            bg : '\x1b[42m',
            text : 'SUCCESS'
        },
        error: {
            bg : '\x1b[41m',
            text : 'ERROR'
        },
        warning: {
            bg : '\x1b[43m',
            text : 'WARNING'
        },
        info: {
            bg : '\x1b[44m',
            text : 'INFO'
        }
    }

    red = '\u001b[31m'
    green = '\u001b[32m'
    yellow = '\u001b[33m'
    blue = '\x1b[34m'
    black = '\x1b[1;30m'
    reset = '\u001b[0m'

    log = (message, type) => {
        switch(type){
            case 'success' : console.log(this.black, this.statusLog.success.bg, this.statusLog.success.text, this.reset, this.green, message, this.reset); break
            case 'warning' : console.log(this.black, this.statusLog.warning.bg, this.statusLog.warning.text, this.reset, this.yellow, message, this.reset); break
            case 'error' : console.log(this.black, this.statusLog.error.bg, this.statusLog.error.text, this.reset, this.red, message, this.reset); break
            case 'info' : console.log(this.black, this.statusLog.info.bg, this.statusLog.info.text, this.reset, this.blue, message, this.reset); break
            default : console.log(this.reset, message, this.reset); break 
        }
    }

    text = (message, type) => {
        switch(type){
            case 'success' : console.log(this.reset, this.green, message, this.reset); break
            case 'warning' : console.log(this.reset, this.yellow, message, this.reset); break
            case 'error' : console.log(this.reset, this.red, message, this.reset); break
            case 'info' : console.log(this.reset, this.blue, message, this.reset); break
            default : console.log(this.reset, message, this.reset); break 
        }
    }

}

module.exports = Logger