const tape     = require('tape');
const contains = require('./contains');

tape('filter.string.contains -- structure', async t => {
  t.plan(2);
  t.ok('detect' in contains, 'contains filter has detect method');
  t.ok('compile' in contains, 'contains filter has compile method');
});

tape('filter.string.contains -- detect', async t => {
  t.plan(8);
  t.notOk(contains.detect(false), 'contains.detect doesn\'t trigger on false query');
  t.notOk(contains.detect(null), 'contains.detect doesn\'t trigger on null query');
  t.notOk(contains.detect(true), 'contains.detect doesn\'t trigger on true query');
  t.notOk(contains.detect([]), 'contains.detect doesn\'t trigger on empty array query');
  t.notOk(contains.detect({}), 'contains.detect doesn\'t trigger on empty object query');
  t.notOk(contains.detect({ field: 'something' }), 'contains.detect doesn\'t trigger on termless query');
  t.notOk(contains.detect({ term: 'something' }), 'contains.detect doesn\'t trigger on fieldless query');
  t.ok(contains.detect({ field: 'hello', term: 'world' }), 'contains.detect triggers on properly structured query');
});

tape('filter.string.contains -- compile', async t => {
  t.plan(14);

  // Look for a nice greeting message
  const extractor = contains.compile({ field: 'greeting', term: 'hello', boost: 1 });
  t.equal(typeof extractor, 'function', 'contains.compile returns a function');

  t.ok(extractor({ greeting: 'hello', subject: 'world' }), 'finds term in exact string field');
  t.notOk(extractor({ greeting: 'helo', subject: 'world' }), 'doesn\'t find term in malformed string field');
  t.notOk(extractor({ greeting: 'hel', subject: 'world' }), 'doesn\'t find term in partial string field');
  t.ok(extractor({ greeting: '!hello!', subject: 'world' }), 'finds term within enclosed string field');
  t.notOk(extractor({ greeting: [], subject: 'world' }), 'doesn\'t find term within empty array field');
  t.ok(extractor({ greeting: ['hello'], subject: 'world' }), 'finds term within [exact] array field');
  t.ok(extractor({ greeting: ['!hello!'], subject: 'world' }), 'finds term within [enclosed] array field');
  t.notOk(extractor({ greeting: ['helo'], subject: 'world' }), 'doesn\'t find term within [malformed] array field');
  t.notOk(extractor({ greeting: ['hel'], subject: 'world' }), 'doesn\'t find term within [partial] array field');
  t.ok(extractor({ greeting: ['hel', 'hello'], subject: 'world' }), 'finds term within [partial,exact] array field');
  t.ok(extractor({ greeting: ['helo', 'hello'], subject: 'world' }), 'finds term within [malformed,exact] array field');
  t.ok(extractor({ greeting: ['hel', '!hello!'], subject: 'world' }), 'finds term within [partial,enclosed] array field');
  t.ok(extractor({ greeting: ['helo', '!hello!'], subject: 'world' }), 'finds term within [malformed,enclosed] array field');
});
