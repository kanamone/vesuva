import { encode } from './encode'

describe('encode function', () => {
    test('encodes null as string "null"', () => {
        expect(encode(null)).toBe('null')
    })

    test('encodes undefined as string "undefined"', () => {
        expect(encode(undefined)).toBe('undefined')
    })

    test('encodes arrays correctly', () => {
        expect(encode(['hello', 'world'])).toBe('["hello","world"]')
    })

    test('encodes objects correctly', () => {
        const obj = { key: 'value', anotherKey: 'anotherValue' }
        expect(encode(obj)).toBe('{key:"value",anotherKey:"anotherValue"}')
    })
})
