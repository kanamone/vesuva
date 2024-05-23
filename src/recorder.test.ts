import { recorder } from './recorder'

interface TestObject {
    methodName(param: unknown): TestObject
    first(): TestObject
    second(): TestObject
    third(): TestObject
}

describe('recorder function', () => {
    const proxy = recorder<TestObject>('object')

    test('handles number arguments', () => {
        expect(proxy.methodName(42).toString()).toBe('object.methodName(42)')
    })

    test('handles boolean arguments', () => {
        expect(proxy.methodName(true).toString()).toBe('object.methodName(true)')
    })

    test('handles null arguments', () => {
        expect(proxy.methodName(null).toString()).toBe('object.methodName(null)')
    })

    test('handles nested object arguments', () => {
        const nestedObj = proxy.methodName({ key: 'value' })
        expect(nestedObj.toString()).toBe('object.methodName({key:"value"})')
    })

    test('handles proxy as arguments', () => {
        const anotherProxy = recorder<TestObject>('anotherProxy')
        expect(proxy.methodName(anotherProxy.first().second().third()).toString()).toBe(
            'object.methodName(anotherProxy.first().second().third())',
        )
    })

    test('handles array arguments', () => {
        expect(proxy.methodName([1, 2, 3]).toString()).toBe('object.methodName([1,2,3])')
    })

    test('handles array of objects arguments', () => {
        expect(proxy.methodName([{ key: 'value' }, { key: 'value' }]).toString()).toBe(
            'object.methodName([{key:"value"},{key:"value"}])',
        )
    })

    test('handles object with array arguments', () => {
        expect(proxy.methodName({ key: [1, 2, 3] }).toString()).toBe(
            'object.methodName({key:[1,2,3]})',
        )
    })

    test('handles nested object and array arguments', () => {
        expect(proxy.methodName({ key: [{ key: 'value' }, { key: 'value' }] }).toString()).toBe(
            'object.methodName({key:[{key:"value"},{key:"value"}]})',
        )
    })
})
