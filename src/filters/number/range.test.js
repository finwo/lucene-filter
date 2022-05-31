const tape     = require('tape');
const range = require('./range');

tape('filter.number.range -- structure', async t => {
  t.plan(2);
  t.ok('detect' in range, 'range filter has detect method');
  t.ok('compile' in range, 'range filter has compile method');
});

tape('filter.number.range -- detect', async t => {
  t.plan(8);
  t.notOk(range.detect(false), 'contains.detect doesn\'t trigger on false query');
  t.notOk(range.detect(null), 'contains.detect doesn\'t trigger on null query');
  t.notOk(range.detect(true), 'contains.detect doesn\'t trigger on true query');
  t.notOk(range.detect([]), 'contains.detect doesn\'t trigger on empty array query');
  t.notOk(range.detect({}), 'contains.detect doesn\'t trigger on empty object query');
  t.notOk(range.detect({ field: 'something' }), 'contains.detect doesn\'t trigger on termless query');
  t.notOk(range.detect({ term: 'something' }), 'contains.detect doesn\'t trigger on fieldless query');
  t.ok(range.detect({ field: 'hello', term_min: 1, term_max: 10, inclusive: 'both' }), 'contains.detect triggers on properly structured query');
});

tape('filter.number.range, both inclusive -- compile', async t => {
  t.plan(6);

  const extractor = range.compile({ field: 'age', term_min: 18, term_max: 21, inclusive: 'both' });
  t.equal(typeof extractor, 'function', 'range.compile returns a function');

  t.ok(extractor({ age: 20 }), 'finds term in range');
  t.ok(extractor({ age: 21 }), 'finds term in range');
  t.ok(extractor({ age: 18 }), 'finds term in range');
  t.notOk(extractor({ age: 17 }), 'doesn\'t find term in range');
  t.notOk(extractor({ age: 22 }), 'doesn\'t find term in range');
});

tape('filter.number.range, left inclusive -- compile', async t => {
  t.plan(4);

  const extractor = range.compile({ field: 'age', term_min: 18, term_max: 21, inclusive: 'left' });
  t.equal(typeof extractor, 'function', 'range.compile returns a function');

  t.ok(extractor({ age: 18 }), 'finds term in range');
  t.ok(extractor({ age: 20 }), 'finds term in range');
  t.notOk(extractor({ age: 21 }), 'doesn\'t find term in range');
});

tape('filter.number.range, right inclusive -- compile', async t => {
  t.plan(4);

  const extractor = range.compile({ field: 'age', term_min: 18, term_max: 21, inclusive: 'right' });
  t.equal(typeof extractor, 'function', 'range.compile returns a function');

  t.ok(extractor({ age: 20 }), 'finds term in range');
  t.ok(extractor({ age: 21 }), 'finds term in range');
  t.notOk(extractor({ age: 18 }), 'doesn\'t find term in range');
});
