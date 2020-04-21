import tape from 'tape';
import field from './field';

function pass( arg ) {
  return arg;
}

tape('Ensure basics', async t => {
  t.plan(1);
  t.equal(typeof field, 'function', 'Field is an exported function');
});

tape('Function passthrough', async t => {
  t.plan(1);
  t.equal(field('foo',{foo:'bar'},pass), 'bar', 'Fetch field by name works');
});

tape('Pass to explicit', async t => {
  t.plan(1);
  t.equal(field('<implicit>',{foo:'bar'},pass), 'bar', 'Implicit fetch works');
});
