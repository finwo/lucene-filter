const tape      = require('tape');
const operators = require('./index');

const or = operators['OR'];

const minus = n => () => -n(),
  zero  = () => 0,
  one   = () => 1,
  two   = () => 2,
  three = () => 3,
  four  = () => 4,
  five  = () => 5;

tape('Verifying positive numbers', async t => {
  t.plan(5);
  t.equal(or(zero , one  )(), 1, '0 || 1 == 1');
  t.equal(or(one  , two  )(), 2, '1 || 2 == 2');
  t.equal(or(two  , three)(), 3, '2 || 3 == 3');
  t.equal(or(three, four )(), 4, '3 || 4 == 4');
  t.equal(or(four , five )(), 5, '4 || 5 == 5');
});

tape('Mixing negative numbers', async t => {
  t.plan(2);
  t.equal(or(minus(two),       one )(), -2, '-2 ||  1 == -2');
  t.equal(or(      two , minus(one))(),  2, ' 2 || -1 ==  2');
});

tape('Matching abs', async t => {
  t.plan(1);
  t.equal(or(minus(two), two)(), 2, '-2 || 2 == 2');
});
