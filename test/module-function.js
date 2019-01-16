module.exports = function () {
  const start = process.hrtime()
  let [s] = process.hrtime(start)
  while (s < 1) {
    [s] = process.hrtime(start)
  }
  return 'Done'
}

if (require.main === module) {
  console.log('Start')
  setImmediate(() => console.log('im'))
  setTimeout(() => console.log('to'))
  process.nextTick(() => console.log('nt'))
  console.log(module.exports())
}
