# lucene-filter

> Data filter for lucene queries

[![NPM](https://nodei.co/npm/lucene-filter.png)](https://nodei.co/npm/lucene-filter/)

Easily rate, order or filter objects by lucene queries.

---

## Installation

```bash
npm install --save lucene-filter
```

## Usage

For a better overview of what's possible, take a look at [lucene-query-parser][lucene-query-parser].

### Node.JS

```javascript
const lucene = require('lucene-filter');
```

### Browser

```html
// If requirejs is detected, registers as an anonymous module
// Else, it'll attach to window.lucene
<script src="https://unpkg.com/lucene-filter/dist/lucene-filter.min.js"></script>
```

### Example

```js
const lucene = require('lucene-filter');
let   result;

const data = [
  { name: 'C-3PO'           , description: 'Protocol droid.'                , race: 'Droid' },
  { name: 'R2-D2'           , description: 'Astromech droid built on Naboo.', race: 'Droid' },
  { name: 'Anakin Skywalker', description: 'Fallen Jedi, the chosen one.'   , race: 'Human' },
  { name: 'Obi-Wan Kenobi'  , description: 'Jedi Master.'                   , race: 'Human' },
  { name: 'Moon Moon'       , description: 'Mentally challenged wolf.'      , race: 'Wolf'  },
];

// Prints an array with both R2-D2 and C-3PO
console.log(data.filter(lucene('droid')));

// Prints an array with only R2-D2
console.log(data.filter(lucene('astromech')));

// Prints an array with both jedi
console.log(data.filter(lucene('jedi')));

// Prints an array with only the outcast
console.log(data.filter(lucene('wolf')));
```

## Why

I wanted something simple to use & not build a completely new query language without standards or documentation. This
module uses either [lucene][lucene] or [lucene-query-parser][lucene-query-parser] to parse the given query into
something easy-to-process & turns it into a simple-to-use function.

[lucene]: https://www.npmjs.com/package/lucene
[lucene-query-parser]: https://www.npmjs.com/package/lucene-query-parser
