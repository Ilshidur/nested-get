# nested-get

> Get nested value inside a string, an array or an object.

![stability-unstable](https://img.shields.io/badge/stability-stable-green.svg)

[![npm version][version-badge]][version-url]
[![Known Vulnerabilities][vulnerabilities-badge]][vulnerabilities-url]
[![dependency status][dependency-badge]][dependency-url]
[![devdependency status][devdependency-badge]][devdependency-url]
[![build status][build-badge]][build-url]
[![Code Climate][maintainability-badge]][maintainability-url]
[![downloads][downloads-badge]][downloads-url]

[![NPM][npm-stats-badge]][npm-stats-url]

## Compatibility

* Server : Node.js >= 6.0.0
* Browser :
  * Chrome >= 49
  * Firefox >= 34
  * Edge >= 12
  * Opera >= 37

## Use

*`get(data, filter)`*

* `data` (`string`||`object`): Contains the datas to get.
* `filter` (`number`||`object`||`string`): Defines the content to get from `data`. See the examples below.

### String Operators on objects

If the `filter` argument is a `string`, it can contain the following operators in order to get nested object attributes.

* `a.b` : Get the `b` attribute of the object `a`.
* `a.*` : Get everything from the array `a`. Acts like a `map()` function.
* `a.*.b` : Map on the array `a` with the `b` attribute.
* `~a` : Keep the key/value data of the object `a` instead of only its value. This operator can only be placed before an object attribute.
  * e.g. : on `{ a: 1, b: 2 }` => gets `{ a: 1 }` instead of just `1`.

### Examples

```javascript
const get = require('nested-get');

// Get from a string
get('foo', 1);
// => 'o'
get('foo', [0, 1]);
// => ['f', 'o']

// Get from an object
get({ a: 1, b: 1 }, 0);
// => { a: 1 }
get({ a: 1, b: 1 }, 'a');
// => 1
get({ a: 1, b: { c: 2 } }, 'b.c');
// => 2
get({ a: 1, b: { c: 2 } }, 'b.0');
// => { c: 2 }
get({ a: [1, 2, 3] }, 'a.1');
// => 2
get({ a: 1, b: 1 }, ['a', 0]);
// => [1, { a: 1 }]

// Get from an array
get([1, 2, 3], 1);
// => 2
get([1, 2, 3], [0, 1]);
// => [1, 2]

// '*' acts like a '.map()' function
get([{ a: 1, b: 2 }, { a: 3, b: 4 }], '*.a');
// => [1, 3]
get([{ a: 1, b: 2 }, { a: 3, b: 4 }], '*.0');
// => [{ a: 1 }, { a: 3 }]
get([{ a: 1, b: 2 }, { a: 3, b: 4 }], 'a'); // Works like '*.a' if applied to an array
// => [1, 3]

// '~' => Keeps the full object :
get([{ a: 1, b: 2 }, { a: 3, b: 4 }], '*.~a');
// => [{ a: 1 }, { a: 3 }]
```

## Alternatives

[![NPM](https://nodei.co/npm/dotprop.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/dotprop/)
[![NPM](https://nodei.co/npm/dot-prop.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/dot-prop/)

## License

MIT

<hr/>

<p align="center">
  Don't forget to 🌟 Star 🌟 the repo if you like this npm package !<br/>
  <a href="https://github.com/Ilshidur/nested-get/issues/new">Your feedback is appreciated</a>
</p>

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
[maintainability-badge]: https://api.codeclimate.com/v1/badges/e686158bc0820cc9d250/maintainability
[maintainability-url]: https://codeclimate.com/github/Ilshidur/nested-get/maintainability
[downloads-badge]: https://img.shields.io/npm/dt/nested-get.svg
[downloads-url]: https://www.npmjs.com/package/nested-get
[npm-stats-badge]: https://nodei.co/npm/nested-get.png?downloads=true&downloadRank=true
[npm-stats-url]: https://nodei.co/npm/nested-get
