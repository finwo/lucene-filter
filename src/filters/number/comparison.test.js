const tape     = require('tape');
const comparison = require('./comparison');

tape('filter.number.comparison -- structure', async t => {
  t.plan(2);
  t.ok('detect' in comparison, 'comparison filter has detect method');
  t.ok('compile' in comparison, 'comparison filter has compile method');
});

tape('filter.number.comparison -- detect', async t => {
  t.plan(9);
  t.notOk(comparison.detect(false), 'contains.detect doesn\'t trigger on false query');
  t.notOk(comparison.detect(null), 'contains.detect doesn\'t trigger on null query');
  t.notOk(comparison.detect(true), 'contains.detect doesn\'t trigger on true query');
  t.notOk(comparison.detect([]), 'contains.detect doesn\'t trigger on empty array query');
  t.notOk(comparison.detect({}), 'contains.detect doesn\'t trigger on empty object query');
  t.notOk(comparison.detect({ field: 'something' }), 'contains.detect doesn\'t trigger on termless query');
  t.notOk(comparison.detect({ term: 'something' }), 'contains.detect doesn\'t trigger on fieldless query');
  t.ok(comparison.detect({ field: 'hello', term: '>1' }), 'contains.detect triggers on properly structured query');
  t.notOk(comparison.detect({ field: 'hello', term: '1' }), 'contains.detect doesn\'t trigger on query with no comparator');
});

tape('filter.number.comparison, gt -- compile', async t => {
  t.plan(3);

  const extractor = comparison.compile({ field: 'age', term: '>21' });
  t.equal(typeof extractor, 'function', 'comparison.compile returns a function');

  t.ok(extractor({ age: 22 }), 'finds term in comparison');
  t.notOk(extractor({ age: 21 }), 'doesn\'t find term in comparison');
});
tape('filter.number.comparison, gte -- compile', async t => {
  t.plan(4);

  const extractor = comparison.compile({ field: 'age', term: '>=21' });
  t.equal(typeof extractor, 'function', 'comparison.compile returns a function');

  t.ok(extractor({ age: 22 }), 'finds term in comparison');
  t.ok(extractor({ age: 21 }), 'finds term in comparison');
  t.notOk(extractor({ age: 20 }), 'doesn\'t find term in comparison');
});
tape('filter.number.comparison, lt -- compile', async t => {
  t.plan(3);

  const extractor = comparison.compile({ field: 'age', term: '<21' });
  t.equal(typeof extractor, 'function', 'comparison.compile returns a function');

  t.ok(extractor({ age: 20 }), 'finds term in comparison');
  t.notOk(extractor({ age: 21 }), 'doesn\'t find term in comparison');
});
tape('filter.number.comparison, lte -- compile', async t => {
  t.plan(4);

  const extractor = comparison.compile({ field: 'age', term: '<=21' });
  t.equal(typeof extractor, 'function', 'comparison.compile returns a function');

  t.ok(extractor({ age: 20 }), 'finds term in comparison');
  t.ok(extractor({ age: 21 }), 'finds term in comparison');
  t.notOk(extractor({ age: 22 }), 'doesn\'t find term in comparison');
});
