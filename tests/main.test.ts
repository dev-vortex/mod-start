import { expect } from 'chai'
import { dummy } from '../src'

describe('[main]', () => {
    describe('import', () => {
        it('should be present', () => {
            expect(dummy).to.exist
        })
    })
})
