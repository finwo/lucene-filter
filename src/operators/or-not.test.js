import expect from 'expect';
const orNot = require('./index')['OR NOT'];

const minus = n => () => -n(),
      zero  = () => 0,
      one   = () => 1,
      two   = () => 2,
      three = () => 3,
      four  = () => 4,
      five  = () => 5;

test('Verifying positive numbers', async () => {
  expect(orNot(zero , one  )()).toBe(-1);
  expect(orNot(one  , two  )()).toBe(-2);
  expect(orNot(two  , three)()).toBe(-3);
  expect(orNot(three, four )()).toBe(-4);
  expect(orNot(four , five )()).toBe(-5);
});

test('Mixing negative numbers', async () => {
  expect(orNot(minus(two),       one )()).toBe(-2);
  expect(orNot(      two , minus(one))()).toBe( 2);
});

test('Matching abs', async () => {
  expect(orNot(minus(two), two)()).toBe(-2);
});
