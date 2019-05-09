# Super Require
Unblock your event loop! Require modules in a child process effortlessly

Features:
- Works with callbacks, promises and async/await
- Easiest adoption: Just replace `require` with `sr`
- Only function calls are proxied

## Install

```sh
npm i sr
```

## Use

Replace `require` with sr

Before
```js
const request = require('request')
```

After:
```js
const sr = require('sr')
const request = sr('request')
```

*Note: To use with localmodules, use `path.resolve`*

Before:
```js
const module = require('./module')
```

After:

```js
const path = require('path')
const sr = require('sr')

const module = sr(path.resolve(__dirname, './module'))
```

## License

MIT © Diego Rodríguez Baquero - 2019
