const sleep = require('@node/sleep/sleep.js')

describe('Modulo Sleep para NodeJS', () => {

    jest.useFakeTimers()

    it('Aguarda pelo tempo esperado (ms)', () => {
        sleep(1000)
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    })

})