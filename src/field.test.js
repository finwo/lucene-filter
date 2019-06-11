import expect from 'expect';
const field = require('./field');

function pass( arg ) {
  return arg;
}

test('Ensure basics', async () => {
  expect(typeof field).toBe('function');
});

test('Function passthrough', async () => {
  expect(field('foo',{foo:'bar'},pass)).toBe('bar');
});

test('Pass to explicit', async () => {
  expect(field('<implicit>',{foo:'bar'},pass)).toBe('bar');
});
