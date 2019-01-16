/* global describe, it, before, after */

const assert = require('assert')
const http = require('http')

const sr = require('../')
const request = require('request')
const requestSr = sr('request')

describe('request', function () {
  let server

  before(done => {
    server = http.createServer((req, res) => {
      res.end('OK')
    }).listen(4500)
    server.on('listening', done)
  })

  it('should work without sr', function (done) {
    request('http://localhost:4500', (err, res, body) => {
      if (err) return done(err)
      assert.strictEqual(body, 'OK')
      done()
    })
  })

  it('should work with sr', function (done) {
    requestSr('http://localhost:4500', (err, res, body) => {
      if (err) return done(err)
      assert.strictEqual(body, 'OK')
      done()
    })
  })

  after(() => {
    server.close()
  })
})
