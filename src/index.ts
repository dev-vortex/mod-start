import { booleanValue } from '~/include'
import { Dummy } from './types'

export const dummy = (): Dummy => {
    console.log('DUMMY TEST')
    return booleanValue('jack')
}
