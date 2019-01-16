const imp = require(process.argv[2])

process.on('message', msg => {
  switch (msg.type) {
    case 'apply': {
      const args = msg.args.map((arg, argIndex) => {
        return arg === 'function' ? (...result) => {
          process.send({ id: `${msg.id}-${argIndex}`, result })
        } : arg
      })
      const result = imp(...args)
      process.send({ id: msg.id, result })
      break
    }
  }
})
