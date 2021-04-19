let Validate = require('@node/validate/validate.js')

describe('Modulo de Validação para NodeJS', () => {

    let val

    beforeEach(() => {
        val = new Validate()
    })

    it('Valida objeto sem valores null/undefined/""', () => {
        let form = {
            id : 0,
            nome : 'fernando' 
        }
        let r = val.notNull(form)
        expect(r).toBe(true)
    })

    it('Recusa objeto com valores null', () => {
        let form = {
            id : null,
            nome : 'fernando' 
        }
        let r = val.notNull(form)
        expect(r).toBe(false)
    })

    it('Recusa objeto com valores undefined', () => {
        let form = {
            id : undefined,
            nome : 'fernando' 
        }
        let r = val.notNull(form)
        expect(r).toBe(false)
    })

    it('Recusa objeto com valores ""', () => {
        let form = {
            id : "",
            nome : 'fernando' 
        }
        let r = val.notNull(form)
        expect(r).toBe(false)
    })

})