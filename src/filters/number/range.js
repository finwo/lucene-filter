const field = require('../../field');

module.exports = {
  detect : function (query) {
    if (!query) return false;
    if ('object' !== typeof query) return false;
    if (!('inclusive' in query)) return false;
    if (isNaN(query.term_min)) return false;
    return !isNaN(query.term_max);
  },
  compile: function (query) {
    return function (data) {
      return field(query.field, data, function (value) {
        console.log('range value', query, value);
      }) ? query.boost : 0;
    }
  },
};
