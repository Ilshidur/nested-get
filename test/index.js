const get = require('../');

get('foo', 0); // 'f'
get('foo', 1); // 'o'

get({ a: 1, b: 2 }, 'a'); // 1
get({ a: 1, b: { c: 2 } }, 'b.c'); // 2
get({ a: 1, b: { c: 2 } }, 0); // { a: 1 }

get([1, 2, 3], '0'); // 1
get([1, 2, 3], 1); // 2
get([1, 2, 3], '*'); // [1, 2, 3]

get({ a: [1, 2, 3] }, 'a.1'); // 2
get({ a: [1, 2, 3] }, 'a.*'); // [1, 2, 3]
get({ a: [1, 2, 3] }, 'a.*.0'); // [undefined, undefined, undefined]
get({ a: [{ b: 1, c: 2 }, { b: 3, c: 6 }] }, 'a.*.b'); // [1, 3]
get({ a: [{ b: 1, c: 2 }, { b: 3, c: 6 }], b: 2, c: 3 }, ['a.*.b', 'b', 'c', 2]); // [[1, 3], 2, 3, { c: 3 }]

get([['a', 'b'], ['c', 'd'], { test: 1 }], '*.0'); // ['a', 'c', { test: 1 }]
get(
[
    [
        ['a', 'b'], ['c', 'd']
    ], [
        ['e', 'f'], ['g', 'h']
    ]
], '*.0.*'); // [['a', 'b'], ['e', 'f']]
get(
[
    [
        ['a', 'b'], ['c', 'd']
    ], [
        ['e', 'f'], ['g', 'h']
    ]
], '0.*.0'); // ['a', 'b']

// TODO: Create (recursive) function to run to get the result
