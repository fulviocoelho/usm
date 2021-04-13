const Logger = require('@node/logger/logger.js')

describe('Modulo Logger para NodeJs', () => {

    let line

    beforeEach(() => {
        line = new Logger()
    })

    it('Loga no console mensagem comun', () => {
        console.log = jest.fn();
        line.log('teste');
        expect(console.log.mock.calls[0][2]).toBe('\u001b[0m'); // Reseta cor para a linha
        expect(console.log.mock.calls[0][1]).toBe('teste'); // Texto exibido
        expect(console.log.mock.calls[0][0]).toBe('\u001b[0m'); // Reseta cor para a linha seguinte
    });

    it('Loga no console mensagem de sucesso', () => {
        console.log = jest.fn();
        line.log('sucesso','success');
        expect(console.log.mock.calls[0][0]).toBe('\x1b[1;30m'); // Torna cor de texto preta
        expect(console.log.mock.calls[0][1]).toBe('\x1b[42m'); // Adiciona bg verde ao texto
        expect(console.log.mock.calls[0][2]).toBe('SUCCESS'); // Tag de mensagem de sucesso
        expect(console.log.mock.calls[0][3]).toBe('\u001b[0m'); // Reseta configurações anteriores 
        expect(console.log.mock.calls[0][4]).toBe('\u001b[32m'); // Torna cor de texto verde
        expect(console.log.mock.calls[0][5]).toBe('sucesso'); // Printa mensagem enviada
        expect(console.log.mock.calls[0][6]).toBe('\u001b[0m'); // Reseta configurações anteriores
    });

    it('Loga no console mensagem de alerta', () => {
        console.log = jest.fn();
        line.log('alerta','warning');
        expect(console.log.mock.calls[0][0]).toBe('\x1b[1;30m'); // Torna cor de texto preta
        expect(console.log.mock.calls[0][1]).toBe('\x1b[43m'); // Adiciona bg amarelo ao texto
        expect(console.log.mock.calls[0][2]).toBe('WARNING'); // Tag de mensagem de alerta
        expect(console.log.mock.calls[0][3]).toBe('\u001b[0m'); // Reseta configurações anteriores 
        expect(console.log.mock.calls[0][4]).toBe('\u001b[33m'); // Torna cor de texto amarela
        expect(console.log.mock.calls[0][5]).toBe('alerta'); // Printa mensagem enviada
        expect(console.log.mock.calls[0][6]).toBe('\u001b[0m'); // Reseta configurações anteriores
    });

    it('Loga no console mensagem de erro', () => {
        console.log = jest.fn();
        line.log('erro','error');
        expect(console.log.mock.calls[0][0]).toBe('\x1b[1;30m'); // Torna cor de texto preta
        expect(console.log.mock.calls[0][1]).toBe('\x1b[41m'); // Adiciona bg vermelho ao texto
        expect(console.log.mock.calls[0][2]).toBe('ERROR'); // Tag de mensagem de erro
        expect(console.log.mock.calls[0][3]).toBe('\u001b[0m'); // Reseta configurações anteriores 
        expect(console.log.mock.calls[0][4]).toBe('\u001b[31m'); // Torna cor de texto vermelha
        expect(console.log.mock.calls[0][5]).toBe('erro'); // Printa mensagem enviada
        expect(console.log.mock.calls[0][6]).toBe('\u001b[0m'); // Reseta configurações anteriores
    });

    it('Loga no console mensagem de info', () => {
        console.log = jest.fn();
        line.log('informativo','info');
        expect(console.log.mock.calls[0][0]).toBe('\x1b[1;30m'); // Torna cor de texto preta
        expect(console.log.mock.calls[0][1]).toBe('\x1b[44m'); // Adiciona bg azul ao texto
        expect(console.log.mock.calls[0][2]).toBe('INFO'); // Tag de mensagem de info
        expect(console.log.mock.calls[0][3]).toBe('\u001b[0m'); // Reseta configurações anteriores 
        expect(console.log.mock.calls[0][4]).toBe('\x1b[34m'); // Torna cor de texto azul
        expect(console.log.mock.calls[0][5]).toBe('informativo'); // Printa mensagem enviada
        expect(console.log.mock.calls[0][6]).toBe('\u001b[0m'); // Reseta configurações anteriores
    });

})