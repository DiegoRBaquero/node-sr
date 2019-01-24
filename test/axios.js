/* global describe, it, before, after */

const assert = require('assert')
const http = require('http')

const sr = require('../')
const axios = require('axios')
const axiosSr = sr('axios')

describe('axios', function () {
  let server

  before(done => {
    server = http.createServer((req, res) => {
      res.end('OK')
    }).listen(4500)
    server.on('listening', done)
  })

  it('should work without sr', async function () {
    const body = (await axios('http://localhost:4500')).data
    assert.strictEqual(body, 'OK')
  })

  it('should work with sr', async function () {
    const body = (await axiosSr('http://localhost:4500')).data
    assert.strictEqual(body, 'OK')
  })

  it('axios.get should work without sr', async function () {
    const body = (await axios.get('http://localhost:4500')).data
    assert.strictEqual(body, 'OK')
  })

  it('axios.get should work with sr', async function () {
    const body = (await axiosSr.get('http://localhost:4500')).data
    assert.strictEqual(body, 'OK')
  })

  after(() => {
    server.close()
  })
})
