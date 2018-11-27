import expect from 'expect';
import or from './or';

const minus = n => () => -n(),
      zero  = () => 0,
      one   = () => 1,
      two   = () => 2,
      three = () => 3,
      four  = () => 4,
      five  = () => 5;

test('Verifying positive numbers', async () => {
  expect(or(zero , one  )()).toBe(1);
  expect(or(one  , two  )()).toBe(2);
  expect(or(two  , three)()).toBe(3);
  expect(or(three, four )()).toBe(4);
  expect(or(four , five )()).toBe(5);
});

test('Mixing negative numbers', async () => {
  expect(or(minus(two),       one )()).toBe(-2);
  expect(or(      two , minus(one))()).toBe( 2);
});


test('Matching abs', async () => {
  expect(or(minus(two), two)()).toBe(2);
});
