![vesuva](https://github.com/kanamone/vesuva/assets/603523/bc03a97a-d81a-48c8-9abe-e289954a5e09)
[![Build Status](https://img.shields.io/github/actions/workflow/status/kanamone/vesuva/test-and-lint.yml?branch=main&style=flat&colorA=000000&colorB=000000)](https://github.com/kanamone/vesuva/actions?query=workflow%3Atest)
[![Version](https://img.shields.io/npm/v/vesuva?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/vesuva)
[![Downloads](https://img.shields.io/npm/dt/vesuva.svg?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/vesuva)

# vesuva
vesuva (/vɛˈsuːvə/) is a JavaScript library that uses dynamic proxies to reconstruct method chains as strings.

# Installation

```bash

npm install vesuva
```

# Usage

To use Vesuva, pass the name of the receiver to the `recorder` function:

```javascript
import { recorder } from 'vesuva'

const obj = recorder('obj')
console.log(obj.method1().method2('arg').toString())
// Output: obj.method1().method2("arg")
```

NOTE:  
vesuva does not consider the aesthetics of the resulting code.  
If you need beauty code, please apply your preferred formatter to vesuva's output.

# Type-safe Usage

`recorder` function uses generics to enable vesuva to act as a type-safe wrapper for existing library types:

```typescript
import { recorder } from 'vesuva'
import type { z as _z } from 'zod'

const z = recorder<typeof _z>('z');

const BaseTeacher = z.object({
  students: z.array(z.string())
});

const HasID = z.object({
  id: z.string()
});

const Teacher = BaseTeacher.merge(HasID);

console.log(Teacher.toString())
// Output: z.object({students:z.array(z.string())}).merge(z.object({id:z.string()}))
```

# How It Works
vesuva uses JavaScript's Proxy object to intercept method calls and other interactions, allowing it to record and construct a string representation of the entire method chain dynamically.

# Contributing
Contributions to Vesuva are welcome! Please feel free to fork the repository, make your changes, and submit a pull request.

# License
vesuva is released under the MIT License. See the LICENSE file in the repository for more details.
