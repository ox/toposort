const assert = require('assert');

const Graph = require('../index');

describe('basic', function () {
  it('can sort a DAG with a single element', function () {
    const g = new Graph();
    /*
      0
     */
    g.add('0');

    const expected = ['0'];
    const queue = g.sort();
    assert.deepEqual(expected, queue);
  });

  it('can sort a simple DAG', function () {
    const g = new Graph();

    /*
      3 -> 2 -> 1 -> 0
     */
    g.add('3', '2');
    g.add('2', '1');
    g.add('1', '0');

    const expected = ['0', '1', '2', '3'];
    const queue = g.sort();
    assert.deepEqual(expected, queue);
  });

  it('can sort a DAG with a branch', function () {
    const g = new Graph();

    /*
      3 -> 2 -> 1
            \-> 0
     */
    g.add('3', '2');
    g.add('2', '1');
    g.add('2', '0');

    const expected = ['0', '1', '2', '3'];
    const queue = g.sort();
    assert.deepEqual(expected, queue);
  });

  it('throws on a circular DAG', function () {
    const g = new Graph();

    /*
      1 -> 0
      0 -> 1
     */
    g.add('1', '0');
    g.add('0', '1');

    assert.throws(g.sort);
  });

  it('can sort multiple DAGs', function () {
    const g = new Graph();

    g.add('2', '1');
    g.add('4', '3');

    const expected = ['1', '2', '3', '4'];
    const queue = g.sort();
    assert.deepEqual(expected, queue);
  });
});
