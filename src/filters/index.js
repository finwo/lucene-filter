const filters = module.exports = [];
filters.push(require('./regexp'));
filters.push(require('./number/range'));
filters.push(require('./number/exact'));
filters.push(require('./number/comparison'));
filters.push(require('./string/starts-with'));
filters.push(require('./string/ends-with'));
filters.push(require('./string/contains'));
