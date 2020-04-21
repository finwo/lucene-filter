// import expect from 'expect';
// const andNot = require('./index')['AND NOT'];

// const minus = n => () => -n(),
//       zero  = () => 0,
//       one   = () => 1,
//       two   = () => 2,
//       three = () => 3,
//       four  = () => 4,
//       five  = () => 5;

// test('Verifying positive numbers', async () => {
//   expect(andNot(zero , one  )()).toBe(0);
//   expect(andNot(one  , two  )()).toBe(1);
//   expect(andNot(two  , three)()).toBe(2);
//   expect(andNot(three, four )()).toBe(3);
//   expect(andNot(four , five )()).toBe(4);
// });

// test('Mixing negative numbers', async () => {
//   expect(andNot(minus(two),       one )()).toBe(-1);
//   expect(andNot(      two , minus(one))()).toBe( 1);
// });

// test('Matching abs', async () => {
//   expect(andNot(minus(two), two)()).toBe(-2);
// });
