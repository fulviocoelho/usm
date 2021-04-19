const Random = require('@node/random/random.js')

describe('Modulo Random para NodeJS', () => {

    let r

    beforeEach(() => {
        r = new Random()
    })

    it('Retorna um nome da lista de primerios nomes', () => {
        let n = r.firstname()
        let f = r.first_name.filter((v) => {return v == n})
        expect(f.length).toBe(1)
    })

    it('Retorna um nome da lista de ultimos nomes', () => {
        let n = r.lastname()
        let l = r.last_name.filter((v) => {return v == n})
        expect(l.length).toBe(1)
    })

    it('Retorna um nome completo usando as listas de primeiro e ultimo nome', () => {
        let n = r.fullname()
        n = n.split(' ')
        let f = r.first_name.filter((v) => {return v == n[0]})
        let l = r.last_name.filter((v) => {return v == n[1]})
        expect(f.length).toBe(1)
        expect(l.length).toBe(1)
    })

    it('Retorna um item da lista de itens', () => {
        let n = r.ritems()
        let i = r.items.filter((v) => {return v == n})
        expect(i.length).toBe(1)
    })

    it('Retorna uma data aleatória entre 01/01/2000 a 30/12/2020', () => {
        let n = r.date()
        n = n.split('/')
        expect(n[0] > 0 && n[0] < 31).toBe(true)
        expect(n[1] > 0 && n[1] < 13).toBe(true)
        expect(n[2] > 1999 && n[2] < 2021).toBe(true)
    })

    it('Retorna uma hora aleatória entre 00:00 até 12:59', () => {
        let n = r.time()
        n = n.split(' ')
        n[0] = n[0].split(':')
        expect(n[0][0] >= 0 && n[0][0] < 13).toBe(true)
        expect(n[0][1] >= 0 && n[0][1] < 60).toBe(true)
        expect(n[1] == 'AM' || n[1] == 'PM').toBe(true)
    })

})