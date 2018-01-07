const expect = require('chai').expect;

const get = require('../');

describe('nested-get', function() {

    it('should throw an error if the filter is undefined', function() {
        expect(() => get({ a: 1 }, undefined)).to.throw(Error);
    });
    it('should throw an error if the filter is NaN', function() {
        expect(() => get({ a: 1 }, NaN)).to.throw(Error);
    });
    it('should throw an error if the filter is null', function() {
        expect(() => get({ a: 1 }, null)).to.throw(Error);
    });
    it('should throw an error if the filter is empty string', function() {
        expect(() => get({ a: 1 }, '')).to.throw(Error);
    });
    it('should throw an error if the filter is below 0', function() {
        expect(() => get({ a: 1 }, -1)).to.throw(Error);
    });

    it('should get from string with int', function() {
        const result1 = get('foo', 0); // 'f'
        expect(result1).to.equal('f');
        const result2 = get('foo', 1); // 'o'
        expect(result2).to.equal('f');
    });

    it('should get from object with char', function() {
        const result1 = get({ a: 1, b: 2 }, 'a');
        expect(result1).to.equal(1);
        const result2 = get({ a: 1, b: 2 }, 'b');
        expect(result2).to.equal(2);
    });

    it('should get from object with nested chars (2)', function() {
        const result = get({ a: 1, b: { c: 2 } }, 'b.c');
        expect(result).to.equal(2);
    });
    it('should get from object with nested chars (3)', function() {
        const result = get({ a: 1, b: { c: { d: 2 } } }, 'b.c.d');
        expect(result).to.equal(2);
    });

    it('should get from object with int', function() {
        const result = get({ a: 1, b: { c: { d: 2 } } }, 0);
        expect(result).to.equal({ a: 1 });
    });

});

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
