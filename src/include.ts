import { Dummy } from './types'

export const booleanValue = (value: string): Dummy => {
    console.log('DUMMY INCLUDE')
    return value.indexOf('j') === 0
}
