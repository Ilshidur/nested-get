const expect = require('chai').expect;

const get = require('../');

describe('nested-get', function () {

  it('should throw an error if the filter is undefined', function () {
    expect(() => get({ a: 1 }, undefined)).to.throw(Error);
  });
  it('should throw an error if the filter is NaN', function () {
    expect(() => get({ a: 1 }, NaN)).to.throw(Error);
  });
  it('should throw an error if the filter is null', function () {
    expect(() => get({ a: 1 }, null)).to.throw(Error);
  });
  it('should throw an error if the filter is empty string', function () {
    expect(() => get({ a: 1 }, '')).to.throw(Error);
  });
  it('should throw an error if the filter is below 0', function () {
    expect(() => get({ a: 1 }, -1)).to.throw(Error);
  });
  it('should throw an error if the filter is below 0', function () {
    expect(() => get([1, 2, 3], '0.3')).to.throw(Error);
  });

  it('should get from string with int', function () {
    const result1 = get('foo', 0);
    expect(result1).to.equal('f');
    const result2 = get('foo', 1);
    expect(result2).to.equal('o');
    const result3 = get('foo', 3);
    expect(result3).to.equal(undefined);
  });

  it('should get from string with array', function () {
    const result1 = get('foo', [0, 1]);
    expect(result1).to.deep.equal(['f', 'o']);
    const result2 = get('foo', [1, 3]);
    expect(result2).to.deep.equal(['o', undefined]);
    const result3 = get('foo', [3]);
    expect(result3).to.deep.equal([undefined]);
  });

  it('should get from object with number', function () {
    const result1 = get({ a: 1 }, 0);
    expect(result1).to.deep.equal({ a: 1 });
    const result2 = get({ a: 1, b: { c: { d: 2 } } }, 0);
    expect(result2).to.deep.equal({ a: 1 });
    const result3 = get({}, 0);
    expect(result3).to.deep.equal(undefined);
    const result4 = get({ a: 1 }, 1);
    expect(result4).to.deep.equal(undefined);
  });

  it('should get from object with string', function () {
    const result1 = get({ a: 1, b: 2 }, 'a');
    expect(result1).to.equal(1);
    const result2 = get({ a: 1, b: 2 }, 'b');
    expect(result2).to.equal(2);
    const result3 = get({ a: 1, b: 2 }, '0');
    expect(result3).to.deep.equal({ a: 1 });
  });

  it('should get from object with string (nested chars: 2)', function () {
    const result1 = get({ a: 1, b: { c: 2 } }, 'b.c');
    expect(result1).to.equal(2);
    const result2 = get({ a: 1, b: { c: 2 } }, 'b.0');
    expect(result2).to.deep.equal({ c: 2 });
  });
  it('should get from object with string (nested chars: 3)', function () {
    const result = get({ a: 1, b: { c: { d: 2 } } }, 'b.c.d');
    expect(result).to.equal(2);
  });

  it('should get from object with array', function () {
    const result = get({ a: 1, b: { c: { d: 2 } } }, ['b.c.d', 0]);
    expect(result).to.deep.equal([2, { a: 1 }]);
  });

  it('should get from array with number', function () {
    const result1 = get([1, 2, 3], 0);
    expect(result1).to.equal(1);
    const result2 = get([1, 2, 3], 1);
    expect(result2).to.equal(2);
    const result3 = get([1, 2, 3], 3);
    expect(result3).to.equal(undefined);
  });
  it('should get from array with string', function () {
    const result1 = get([1, 2, 3], '0');
    expect(result1).to.equal(1);
    const result2 = get([1, 2, 3], '1');
    expect(result2).to.equal(2);
    const result3 = get([1, 2, 3], '3');
    expect(result3).to.equal(undefined);
    const result4 = get([{ a: 1, b: 2 }], 'a'); // Redirect to '*.a'
    expect(result4).to.deep.equal([1]);
    const result5 = get([1, 2, 3], '*');
    expect(result5).to.deep.equal([1, 2, 3]);
  });

  it('should get from array with array', function () {
    const result1 = get([1, 2, 3], [0]);
    expect(result1).to.deep.equal([1]);
  });

  it('should keep the entire objects if "~" is included', function() {
    const result1 = get({ a: { b: 1 } }, 'a.~0');
    expect(result1).to.deep.equal({ b: 1 });
    const result2 = get({ a: { b: 1 } }, 'a.~b');
    expect(result2).to.deep.equal({ b: 1 });
    const result3 = get([{ a: 1, b: 2 }, { a: 3, b: 4 }], '*.~b');
    expect(result3).to.deep.equal([{ b: 2 }, { b: 4 }]);
  });

  it('combined tests', function () {
    const result1 = get({ a: [1, 2, 3] }, 'a.1');
    expect(result1).to.equal(2);
    const result2 = get({ a: [1, 2, 3] }, 'a.*');
    expect(result2).to.deep.equal([1, 2, 3]);
    const result3 = get({ a: [{ b: 1, c: 2 }, { b: 3, c: 6 }] }, 'a.*.b');
    expect(result3).to.deep.equal([1, 3]);
    const result4 = get({ a: 1, c: { a: 2, b: 3 } }, ['a', 'b', 'c.a']);
    expect(result4).to.deep.equal([1, undefined, 2]);
    const result5 = get({ a: [{ b: 1, c: 2 }, { b: 3, c: 6 }], b: 2, c: 3 }, ['a.*.b', 'b', 'c', 2]);
    expect(result5).to.deep.equal([[1, 3], 2, 3, { c: 3 }]);
    const result6 = get([['a', 'b'], ['c', 'd'], { test: 1 }], '*.0');
    expect(result6).to.deep.equal(['a', 'c', { test: 1 }]);
    const result7 = get([{ a: 1, b: 2, c: { d: 3, e: 5 } }, { a: 4, b: 5, c: { d: 6, e: 6 } }], '~a');
    expect(result7).to.deep.equal([{ a: 1 }, { a: 4 }]);
    const result8 = get(
      [
          [
              ['a', 'b'], ['c', 'd']
          ], [
              ['e', 'f'], ['g', 'h']
          ]
      ], '*.0');
    expect(result8).to.deep.equal([['a', 'b'], ['e', 'f']]);
    const result9 = get(
      [
          [
              ['a', 'b'], ['c', 'd']
          ], [
              ['e', 'f'], ['g', 'h']
          ]
      ], '0.*.0');
    expect(result9).to.deep.equal(['a', 'c']);
    const result10 = get([[1, 2], [3, 4]], '0.*');
    expect(result10).to.deep.equal([1, 2]);
    const result11 = get([[1, 2], [3, 4]], '0');
    expect(result11).to.deep.equal([1, 2]);
    const result12 = get([{ a: 1 }], '*.*.a');
    expect(result12).to.deep.equal([1]);
  });

});
