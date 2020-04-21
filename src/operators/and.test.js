// import expect from 'expect';
// const and = require('./index')['AND'];

// const minus = n => () => -n(),
//       zero  = () => 0,
//       one   = () => 1,
//       two   = () => 2,
//       three = () => 3,
//       four  = () => 4,
//       five  = () => 5;

// test('Verifying positive numbers', async () => {
//   expect(and(zero , one  )()).toBe(0);
//   expect(and(one  , two  )()).toBe(1);
//   expect(and(two  , three)()).toBe(2);
//   expect(and(three, four )()).toBe(3);
//   expect(and(four , five )()).toBe(4);
// });

// test('Mixing negative numbers', async () => {
//   expect(and(minus(two),       one )()).toBe( 1);
//   expect(and(      two , minus(one))()).toBe(-1);
// });

// test('Matching abs', async () => {
//   expect(and(minus(two), two)()).toBe(-2);
// });
