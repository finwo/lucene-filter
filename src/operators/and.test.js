const tape      = require('tape');
const operators = require('./index');

const and = operators['AND'];

const minus = n => () => -n(),
  zero  = () => 0,
  one   = () => 1,
  two   = () => 2,
  three = () => 3,
  four  = () => 4,
  five  = () => 5;

tape('Verifying positive numbers', async t => {
  t.plan(5);
  t.equal(and(zero , one  )(), 0, '0 && 1 == 0');
  t.equal(and(one  , two  )(), 1, '1 && 2 == 1');
  t.equal(and(two  , three)(), 2, '2 && 3 == 2');
  t.equal(and(three, four )(), 3, '3 && 4 == 3');
  t.equal(and(four , five )(), 4, '4 && 5 == 4');
});

tape('Mixing negative numbers', async t => {
  t.plan(2);
  t.equal(and(minus(two),       one )(),  1, '-2 &&  1 ==  1');
  t.equal(and(      two , minus(one))(), -1, ' 2 && -1 == -1');
});

tape('Matching abs', async t => {
  t.plan(1);
  t.equal(and(minus(two), two)(), -2, '-2 && 2 == -2');
});
