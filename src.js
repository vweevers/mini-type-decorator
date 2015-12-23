'use strict';

const t = require('mini-type-assert')
    , introspect = require('introspect')
    , replace = require('replace-constructor')

module.exports = function(...assertions) {
  return function(target, name, descriptor) {
    const length = assertions.length
    if (length === 0) return

    if (typeof target === 'function') { // Constructor
      const names = getNames(target, length)

      return replace(target, function() {
        for(let i=length; i--;) t(arguments[i], assertions[i], names[i])
        return target.apply(this, arguments)
      })
    } else { // Method
      const fn = descriptor.value

      if (typeof fn !== 'function') {
        const msg = '@mini-type-decorator can only be applied to methods, not '
        throw new Error(msg + typeof fn)
      }

      const names = getNames(fn, length)

      descriptor.value = function() {
        for(let i=length; i--;) t(arguments[i], assertions[i], names[i])
        return fn.apply(this, arguments)
      }
    }
  }
}

function getNames(fn, length) {
  const names = introspect(fn).slice(0, length)
  for(let i=length; i--;) names[i] = names[i] || `argument${i}`
  return names
}
