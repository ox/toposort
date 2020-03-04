# Toposort

Toposort is a tiny topological sorting library that uses Kahn's algorithm that shows a linear ordering of vertices in a directed acyclic graph. Practical applications include things like task scheduling.

## API

Create a `Graph`:

```js
const Graph = require('toposort');
const g = new Graph();
```

Add dependencies:

```js
// reads like "'b' depends on 'a'"
g.add('b', 'a');
g.add('c', 'b');
```

Get the order:

```js
const queue = g.sort();
console.dir(queue);
// prints:
//   [ 'a', 'b', 'c' ]
```
