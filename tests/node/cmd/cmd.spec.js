let CMD = require('@node/cmd/cmd.js')

describe('Modulo de CMD para NodeJS', () => {

    let cmd

    beforeEach(() => {
        cmd = new CMD()
    })

    it('Executa Comando com Sucesso', async () => {
        let texto = 'executado em console\r\n'
        let result = await cmd.do(`echo ${texto}`)
        expect(result).toBe(texto)
        
    })

    it('Trata Falha de Execução', async () => {
        let rexpected = "'echao' n�o � reconhecido como um comando interno\r\n"+
                        "ou externo, um programa oper�vel ou um arquivo em lotes.\r\n"
        let cd = cmd.do(`echao erro`)
        let retorno = await cd
            .then((result) => {
                return result  
            })
            .catch((e) => {
                return e
            })
        expect(retorno).toBe(rexpected)
    })

})