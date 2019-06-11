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

// Either of these is supported
const lucene = require('lucene-filter')(require('lucene'));
const lucene = require('lucene-filter')(require('lucene-queryparser'));
const lucene = require('lucene-filter')(require('lucene-query-parser'));
```

### Browser

```html
// If requirejs is detected, registers as an anonymous module
// Else, it'll attach to window.lucene
<script src="https://unpkg.com/lucene-filter/dist/lucene-filter.min.js"></script>
```

### Example

`lucene-filter` transforms a lucene query into a function which returns whether an object matches the query, using the
'boost' set by the query. Returning the data when matching is also possible using `.passthrough`.

```js
const lucene = require('lucene-filter')(require('lucene'));
let   result;

const data = [
  { name: 'C-3PO'           , description: 'Protocol droid.'                , species: 'Droid' },
  { name: 'R2-D2'           , description: 'Astromech droid built on Naboo.', species: 'Droid' },
  { name: 'Anakin Skywalker', description: 'Fallen Jedi, the chosen one.'   , species: 'Human' },
  { name: 'Obi-Wan Kenobi'  , description: 'Jedi Master.'                   , species: 'Human' },
  { name: 'Moon Moon'       , description: 'Mentally challenged wolf.'      , species: 'Wolf'  },
];

// Prints an array with both R2-D2 and C-3PO
console.log(data.filter(lucene('species: droid')));

// Prints an array with only R2-D2
console.log(data.filter(lucene('astromech')));

// Prints an array with both jedi
console.log(data.filter(lucene('jedi')));

// Prints an array with only the outcast
console.log(data.filter(lucene('name: "moon moon"')));


```

## Why

I wanted something simple to use & not build a completely new query language without standards or documentation. This
module uses either [lucene][lucene] or [lucene-query-parser][lucene-query-parser] to parse the given query into
something easy-to-process & turns it into a simple-to-use function.

[lucene]: https://www.npmjs.com/package/lucene
[lucene-query-parser]: https://www.npmjs.com/package/lucene-query-parser
