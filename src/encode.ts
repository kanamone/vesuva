export function encode(arg: unknown): string {
    if (typeof arg === 'object') {
        if (arg === null) {
            return 'null'
        }

        if (Array.isArray(arg)) {
            return `[${arg.map(encode).join(',')}]`
        }

        const keys = Object.keys(arg)
        const pairs = keys.map((key) => `${key}:${encode((arg as Record<string, unknown>)[key])}`)

        return `{${pairs.join(',')}}`
    }

    if (arg === undefined) {
        return 'undefined'
    }

    let isVesuva = false

    try {
        ;(arg as { __VESUVA__: () => void }).__VESUVA__()
        isVesuva = true
    } catch (e) {}

    if (isVesuva) {
        return arg.toString()
    }

    return JSON.stringify(arg)
}
