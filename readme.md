# mini-type-decorator

**Concise type assertions like `a<map<fn:s>>` for class constructors and methods. For details on the type expressions, refer to [mini-type-assert](https://github.com/vweevers/node-mini-type-assert).**

[![npm status](http://img.shields.io/npm/v/mini-type-decorator.svg?style=flat-square)](https://www.npmjs.org/package/mini-type-decorator) [![Dependency status](https://img.shields.io/david/vweevers/mini-type-decorator.svg?style=flat-square)](https://david-dm.org/vweevers/mini-type-decorator)

## example

```js
const t = require('mini-type-decorator')

@t('a<s>', ['n', (n) => n <= 10], 'o<b>')
class Example {
  constructor(tags, grade, flags = {}) {
    this.tags = tags
  }

  @t('s')
  say(what) {
    console.log(what)
  }
}

// Throws because 200 is not a string
new Example([['ok', 200], 2, { a: true })

// Throws because 200 is more than 10
new Example(['ok'], 200, { a: true })

// Throws because 200 is not a boolean
new Example(['ok'], 2, { a: 200 })
```

Note: optional arguments (`o<b>?`) as well as wildcards (`*`) are on the roadmap.

## install

With [npm](https://npmjs.org) do:

```
npm install mini-type-decorator
```

## license

[MIT](http://opensource.org/licenses/MIT) © Vincent Weevers
