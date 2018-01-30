# nested-get

> Get nested value inside a string, an array or an object.

![stability-unstable](https://img.shields.io/badge/stability-stable-green.svg)

[![npm version][version-badge]][version-url]
[![Known Vulnerabilities][vulnerabilities-badge]][vulnerabilities-url]
[![dependency status][dependency-badge]][dependency-url]
[![devdependency status][devdependency-badge]][devdependency-url]
[![build status][build-badge]][build-url]
[![downloads][downloads-badge]][downloads-url]

[![NPM][npm-stats-badge]][npm-stats-url]

## Use

*`get(data, filter)`*

* `data` (`string`||`object`): Contains the datas to get.
* `filter` (`number`||`object`||`string`): What to get. See the examples below.

### Operators

* `a.b` : Get the `b` attribute of the object `a`.
* `a.*` : Get everything from the array `a`.
* `a.*.b` : Map on the array `a` with the `b` attribute.
* `~a` : Keep the key/value data of the object `a` instead of only its value.

### Examples

```javascript
const get = require('nested-get');

// Get from a string
get('foo', 1);
// 'o'
get('foo', [0, 1]);
// ['f', 'o']

// Get from an object
get({ a: 1, b: 1 }, 0);
// { a: 1 }
get({ a: 1, b: 1 }, 'a');
// 1
get({ a: 1, b: { c: 2 } }, 'b.c');
// 2
get({ a: 1, b: { c: 2 } }, 'b.0');
// { c: 2 }
get({ a: [1, 2, 3] }, 'a.1');
// 2
get({ a: 1, b: 1 }, ['a' 0]);
// [1, { a: 1 }]

// Get from an array
get([1, 2, 3], 1);
// 2
get([1, 2, 3], [0, 1]);
// [1, 2]

// '*' acts like a '.map()' function
get([{ a: 1, b: 2 }, { a: 3, b: 4 }], '*.a');
// [1, 3]
get([{ a: 1, b: 2 }, { a: 3, b: 4 }], '*.0');
// [{ a: 1 }, { a: 3 }]
get([{ a: 1, b: 2 }, { a: 3, b: 4 }], 'a'); // Works like '*.a' if applied to an array
// [1, 3]

// '~' => Keeps the full object :
get([{ a: 1, b: 2 }, { a: 3, b: 4 }], '*.~a');
// [{ a: 1 }, { a: 3 }]
```

## License

MIT License

Copyright (c) 2018 **Nicolas COUTIN**

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[version-badge]: https://img.shields.io/npm/v/nested-get.svg
[version-url]: https://www.npmjs.com/package/nested-get
[vulnerabilities-badge]: https://snyk.io/test/npm/nested-get/badge.svg
[vulnerabilities-url]: https://snyk.io/test/npm/nested-get
[dependency-badge]: https://david-dm.org/ilshidur/nested-get.svg
[dependency-url]: https://david-dm.org/ilshidur/nested-get
[devdependency-badge]: https://david-dm.org/ilshidur/nested-get/dev-status.svg
[devdependency-url]: https://david-dm.org/ilshidur/nested-get#info=devDependencies
[build-badge]: https://travis-ci.org/Ilshidur/nested-get.svg
[build-url]: https://travis-ci.org/Ilshidur/nested-get
[downloads-badge]: https://img.shields.io/npm/dt/nested-get.svg
[downloads-url]: https://www.npmjs.com/package/nested-get
[npm-stats-badge]: https://nodei.co/npm/nested-get.png?downloads=true&downloadRank=true
[npm-stats-url]: https://nodei.co/npm/nested-get
