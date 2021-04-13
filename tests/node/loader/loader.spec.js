const process = require('process')
const Loader = require('@node/loader/loader.js')

describe('Modulo Loader para NodeJs', () => {

    let load
    let mockWrite
    let mockCursorTo
    let mockClearLine

    beforeEach(() => {
        load = new Loader(10)
        mockWrite = jest.spyOn(process.stdout, 'write').mockImplementation(() => {})
        mockClearLine = jest.spyOn(process.stdout, 'clearLine').mockImplementation(() => {})
        mockCursorTo = jest.spyOn(process.stdout, 'cursorTo').mockImplementation(() => {})
    })

    afterEach(() => {
        load.endLoad()
        mockWrite.mockRestore()
        mockCursorTo.mockRestore()
        mockClearLine.mockRestore()
    })

    it('Inicia barra de progresso sem texto', () => {
        load.init()
        expect(mockWrite).toHaveBeenCalledWith('\x1B[?25l')
        expect(mockWrite).toHaveBeenCalledWith('[░░░░░░░░░░]')
    })

    it('Inicia barra de progresso com texto', () => {
        load.init('teste')
        expect(mockWrite).toHaveBeenCalledWith('\x1B[?25l')
        expect(mockWrite).toHaveBeenCalledWith('[░░░░░░░░░░]')
        expect(mockClearLine).toHaveBeenCalled()
        expect(mockCursorTo).toHaveBeenCalledWith(0)
        expect(mockWrite).toHaveBeenCalledWith('[░░░░░░░░░░]')
        expect(mockCursorTo).toHaveBeenCalledWith(13)
        expect(mockWrite).toHaveBeenCalledWith('teste')
    })

    it('Progride a barra', () => {
        load.tic()
        expect(mockCursorTo).toHaveBeenCalledWith(1)
        expect(mockWrite).toHaveBeenCalledWith('█')
    })

    it('Progride a barra e adiciona texto', () => {
        load.tic('novo texto...')
        expect(mockCursorTo).toHaveBeenCalledWith(1)
        expect(mockWrite).toHaveBeenCalledWith('█')
        expect(mockClearLine).toHaveBeenCalled()
        expect(mockCursorTo).toHaveBeenCalledWith(0)
        expect(mockWrite).toHaveBeenCalledWith('[█░░░░░░░░░]')
        expect(mockCursorTo).toHaveBeenCalledWith(13)
        expect(mockWrite).toHaveBeenCalledWith('novo texto...')
    })
    
    it('Finaliza progresso de barra', () => {
        load.load.present = 10
        load.tic()
        expect(mockWrite).toHaveBeenCalledWith('\n')
    })
    
    it('Finaliza progresso de barra com texto de finalização', () => {
        load.load.present = 10
        load.tic('texto final')
        expect(mockClearLine).toHaveBeenCalled()
        expect(mockCursorTo).toHaveBeenCalledWith(0)
        expect(mockWrite).toHaveBeenCalledWith('[░░░░░░░░░░]')
        expect(mockCursorTo).toHaveBeenCalledWith(13)
        expect(mockWrite).toHaveBeenCalledWith('texto final')
        expect(mockWrite).toHaveBeenCalledWith('\n')
    })

})