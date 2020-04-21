import tape from 'tape';
import field from './field';

function pass( arg ) {
  return arg;
}

tape('Ensure basics', async t => {
  t.plan(1);
  t.equal(typeof field, 'function', 'Field is an exported function');
});

// tape('Function passthrough', async t => {
//   expect(field('foo',{foo:'bar'},pass)).toBe('bar');
// });

// tape('Pass to explicit', async t => {
//   expect(field('<implicit>',{foo:'bar'},pass)).toBe('bar');
// });
