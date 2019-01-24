const { fork } = require('child_process')
const flatted = require('flatted/cjs')

module.exports = module => {
  const targetModule = require(module)
  const child = fork('./worker.js', [module])
  child.channel.unref()
  child.unref()

  let pendingCount = 0

  child.on('message', msg => {
    if (pendingCount === 0) child.unref()
    child.emit(msg.id, flatted.parse(msg.result))
  })

  return new Proxy(targetModule, {
    get (target, prop) {
      console.log('get', prop)
      if (!(prop in target)) throw new Error(`${prop} not found in ${module}`)
      if (typeof target[prop] !== 'function') return target[prop]
      child.send(prop)
      child.ref()
      pendingCount++
    },
    apply (target, thisArg, args) {
      console.log('apply', thisArg, args)
      let id = Math.floor(Math.random() * 100000)

      args = args.map((arg, argIndex) => {
        if (typeof arg === 'function') {
          pendingCount++
          child.once(`${id}-${argIndex}`, val => {
            arg(...val)
          })
          return 'function'
        }
        return arg
      })

      child.send({ type: 'apply', args, id })
      child.ref()
      pendingCount++
      return new Promise((resolve, reject) => {
        child.once(id, val => {
          resolve(val)
        })
      })
    }
  })
}
