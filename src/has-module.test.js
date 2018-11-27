import expect from 'expect';

// Setup environment
if ( 'object' !== typeof process ) process = {};
if (!process.env) process.env = {};
process.env.TEST = true;

// Load extends
expect.extend(require('jest-isa'));

// Load our module
let hasModule = require('./has-module');

test('Ensure hasModule is a function', async () => {
  expect(hasModule).toBeDefined(); // Basics
  expect(hasModule).isA(Function);
});

test('Verify some packages', async () => {
  expect(hasModule('./has-module')).toBe(true);
  expect(hasModule('./index')).toBe(true);
  expect(hasModule('jest-isa')).toBe(true);
  expect(hasModule('non-existent-module')).toBe(false);
  expect(hasModule('pizza-courier')).toBe(false);
});

// TODO: fix this one
// test('Verify some packages without require.resolve', async () => {
//
//   // Reload module
//   process.env.NO_RESOLVE = true;
//   console.log(process.env);
//   delete require.cache[require.resolve('./has-module')];
//   hasModule = require('./has-module');
//
//   expect(hasModule('./has-module')).toBe(true);
//   expect(hasModule('./index')).toBe(true);
//   expect(hasModule('jest-isa')).toBe(true);
//   expect(hasModule('non-existent-module')).toBe(false);
//   expect(hasModule('pizza-courier')).toBe(false);
// });
