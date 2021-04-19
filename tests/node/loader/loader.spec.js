const process = require('process')
//const readline = require('readline');
const Loader = require('@node/loader/loader.js')

describe('Modulo Loader para NodeJs', () => {

    let load
    let mockWrite
    let mockCursorTo
    let mockClearLine

    beforeEach(() => {
        load = new Loader(10)
        /*
        mockWrite = jest.spyOn(process.stdout, 'write').mockImplementation(() => {})
        mockClearLine = jest.spyOn(readline, 'clearLine').mockImplementation(() => {})
        mockCursorTo = jest.spyOn(readline, 'cursorTo').mockImplementation(() => {})
        */
        mockWrite = jest.spyOn(process.stdout, 'write').mockImplementation(() => {})
        mockCursorTo = jest.spyOn(process.stdout, 'cursorTo').mockImplementation(() => {})
        mockClearLine = jest.spyOn(process.stdout, 'clearLine').mockImplementation(() => {})
    })

    afterEach(() => {
        load.endLoad()
        mockWrite.mockRestore()
        mockCursorTo.mockRestore()
        mockClearLine.mockRestore()
    })

    it('Inicia barra de progresso sem texto', async () => {
        await load.init().then(() => {
            expect(mockWrite).toHaveBeenCalledWith('\x1B[?25l')
            expect(mockWrite).toHaveBeenCalledWith('[░░░░░░░░░░]')
        }).catch((e) => {
            throw new Error(e)
        })
    })

    it('Inicia barra de progresso com texto', async () => {
        await load.init('teste').then(() => {
            expect(mockWrite).toHaveBeenCalledWith('\x1B[?25l')
            expect(mockWrite).toHaveBeenCalledWith('[░░░░░░░░░░]')
            expect(mockClearLine).toHaveBeenCalled()
            expect(mockCursorTo).toHaveBeenCalledWith(0)
            expect(mockWrite).toHaveBeenCalledWith('[░░░░░░░░░░]')
            expect(mockCursorTo).toHaveBeenCalledWith(13)
            expect(mockWrite).toHaveBeenCalledWith('teste')
        }).catch((e) => {
            throw new Error(e)
        })
    })

    it('Progride a barra', async () => {
        await load.tic().then(() => {
            expect(mockCursorTo).toHaveBeenCalledWith(1)
            expect(mockWrite).toHaveBeenCalledWith('█')
        }).catch((e) => {
            throw new Error(e)
        })
    })

    it('Progride a barra e adiciona texto', async () => {
        await load.tic('novo texto...').then(() => {
            expect(mockCursorTo).toHaveBeenCalledWith(1)
            expect(mockWrite).toHaveBeenCalledWith('█')
            expect(mockClearLine).toHaveBeenCalled()
            expect(mockCursorTo).toHaveBeenCalledWith(0)
            expect(mockWrite).toHaveBeenCalledWith('[█░░░░░░░░░]')
            expect(mockCursorTo).toHaveBeenCalledWith(13)
            expect(mockWrite).toHaveBeenCalledWith('novo texto...')
        }).catch((e) => {
            throw new Error(e)
        })
    })

    it('Finaliza progresso de barra ao tentar adicionar progresso passando do tamanho da barra', async () => {
        load.load.present = 10
        await load.tic().then(() => {
            expect(mockWrite).toHaveBeenCalledWith('\n')
        }).catch((e) => {
            throw new Error(e)
        })
    })

    it('Finaliza progresso de barra ao tentar adicionar progresso passando do tamanho da barra com texto', async () => {
        load.load.present = 10
        await load.tic('texto final').then(() => {
            expect(mockClearLine).toHaveBeenCalled()
            expect(mockCursorTo).toHaveBeenCalledWith(0)
            expect(mockWrite).toHaveBeenCalledWith('[░░░░░░░░░░]')
            expect(mockCursorTo).toHaveBeenCalledWith(13)
            expect(mockWrite).toHaveBeenCalledWith('texto final')
            expect(mockWrite).toHaveBeenCalledWith('\n')
        }).catch((e) => {
            throw new Error(e)
        })
    })

})