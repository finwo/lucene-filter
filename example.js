const lucene = require('./src/index')(require('lucene'));
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

// Prints Obi-Wan
console.log(data.filter(lucene('species: human AND master')));
