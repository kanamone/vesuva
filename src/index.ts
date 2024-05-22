function slate <T> (): T {
  return (() => {}) as T
}

export function encode (arg: unknown): string {
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
      (arg as { __VESUVA__: () => void }).__VESUVA__()
      isVesuva = true
  } catch (e) {}

  if (isVesuva) {
      return arg.toString()
  }

  return JSON.stringify(arg)
}

export function proxy<T extends object>(receiver: string, initialPath: string[] = []): T {
  return new Proxy<T>(slate(), {
    get(_target, propKey) {
      const stringify = () => [receiver, ...initialPath].join('.')

      const specials: Record<string, () => unknown> = {
        toString: stringify,
        toJSON: stringify,
        __VESUVA__ () {
          return true
        }
      }

      if (typeof propKey === 'string' && propKey in specials) {
        return specials[propKey]
      }

      return new Proxy(slate(), {
        apply (_target, _thisArg, argumentsList) {
          const args = argumentsList.map(encode).join(', ');
          const newPath = [...initialPath, `${String(propKey)}(${args})`];
          return proxy(receiver, newPath);
        }
      });
    }
  });
}
