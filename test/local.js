/* global describe, it */

const assert = require('assert')
const path = require('path')

const sr = require('../')
const blockingFunction = require('./module-function')
const nonBlockingFunction = sr(path.resolve(__dirname, './module-function'))

describe('local module', function () {
  it('should work without sr', function () {
    assert.strictEqual(blockingFunction(), 'Done')
  })

  it('should block the event loop without sr', function (done) {
    const start = process.hrtime()
    setTimeout(() => {
      const [s] = process.hrtime(start)
      if (!s === 0) done(new Error(`Didn't block event loop`))
    }, 0)
    assert.strictEqual(blockingFunction(), 'Done')
    done()
  })

  it('should work with sr', async function () {
    assert.strictEqual(await nonBlockingFunction(), 'Done')
  })

  it('should not block the event loop with sr', async function () {
    const start = process.hrtime()
    setTimeout(() => {
      const [s] = process.hrtime(start)
      if (!s === 1) throw new Error(`Didn't block event loop`)
    }, 0)
    assert.strictEqual(await nonBlockingFunction(), 'Done')
  })
})
