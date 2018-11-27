const field = module.exports = function (field, data, test) {
  if ('<implicit>' === field) return require('./implicit')(data, test);
  return test(data[field]);
};
