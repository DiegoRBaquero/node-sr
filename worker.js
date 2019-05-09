const imp = require(process.argv[2])
const flatted = require('flatted/cjs')

process.on('message', msg => {
  switch (msg.type) {
    case 'apply': {
      const args = msg.args.map((arg, argIndex) => {
        return arg === 'function' ? (...result) => {
          process.send({ id: `${msg.id}-${argIndex}`, result })
        } : arg
      })
      const result = imp(...args)
      if (!result) return
      if (typeof result.then !== 'function') return process.send({ id: msg.id, result: flatted.stringify(result) })
      result.then(promiseResult => process.send({ id: msg.id, result: flatted.stringify(promiseResult) }))
      break
    }
  }
})
