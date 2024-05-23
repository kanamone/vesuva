import { encode } from './encode'

function slate<T>(): T {
    return (() => {}) as T
}

export function recorder<T extends object>(receiver: string, initialPath: string[] = []): T {
    return new Proxy<T>(slate(), {
        get(_target, propKey) {
            const stringify = () => [receiver, ...initialPath].join('.')

            const specials: Record<string, () => unknown> = {
                toString: stringify,
                toJSON: stringify,
                __VESUVA__() {
                    return true
                },
            }

            if (typeof propKey === 'string' && propKey in specials) {
                return specials[propKey]
            }

            return new Proxy(slate(), {
                apply(_target, _thisArg, argumentsList) {
                    const args = argumentsList.map(encode).join(', ')
                    const newPath = [...initialPath, `${String(propKey)}(${args})`]
                    return recorder(receiver, newPath)
                },
            })
        },
    })
}
