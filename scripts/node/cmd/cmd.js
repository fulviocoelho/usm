const { exec } = require("child_process");

class Cmd{
    
    do = (comando) => {
        return new Promise((resolve, reject) => {
            try{
                exec(comando, (err, stdout, stderr) => {
                    if(stdout){
                        resolve(comando+' - '+stdout)
                    }else if (stderr){
                        reject(stderr)
                    }else if(err){
                        reject(err)
                    }else{
                        resolve(true)
                    }
                })
            }catch(e){
                reject(e)
            }
        })
    }    

}

module.exports = Cmd