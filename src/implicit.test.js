const tape     = require('tape');
const implicit = require('./implicit');

tape('Ensure basics', async t => {
  t.plan(1);
  t.equal(typeof implicit, 'function', 'Implicit exports a function');
});

tape('Verify loop', async t => {
  let out = [];
  implicit({foo:'bar',pizza:'calzone'}, arg => {
    out.push(arg);
  });

  t.plan(2);
  t.equal(out[0], 'bar'    , 'First output is "bar"');
  t.equal(out[1], 'calzone', 'Second output is "calzone"');
});
