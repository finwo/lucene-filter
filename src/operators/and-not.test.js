const tape      = require('tape');
const operators = require('./index');

const andNot = operators['AND NOT'];

const minus = n => () => -n(),
      zero  = () => 0,
      one   = () => 1,
      two   = () => 2,
      three = () => 3,
      four  = () => 4,
      five  = () => 5;

tape('Verifying positive numbers', async t => {
  t.plan(5);
  t.equal(andNot(zero , one  )(), 0, '0 &! 1 == 0');
  t.equal(andNot(one  , two  )(), 1, '1 &! 2 == 1');
  t.equal(andNot(two  , three)(), 2, '2 &! 3 == 2');
  t.equal(andNot(three, four )(), 3, '3 &! 4 == 3');
  t.equal(andNot(four , five )(), 4, '4 &! 5 == 4');
});

tape('Mixing negative numbers', async t => {
  t.plan(2);
  t.equal(andNot(minus(two),       one )(), -1, '-2 &!  1 == -1');
  t.equal(andNot(      two , minus(one))(),  1, ' 2 &! -1 ==  1');
});

tape('Matching abs', async t => {
  t.plan(1);
  t.equal(andNot(minus(two), two)(), -2, '-2 &! 2 == -2');
});
