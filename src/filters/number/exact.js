const field = require('../../field');

module.exports = {
  detect : function (query) {
    if (!query) return false;
    if ('object' !== typeof query) return false;
    if (!query.term) return false;
    return !isNaN(query.term);
  },
  compile: function (query) {
    query.similarity = query.similarity || 0;
    return function (data) {
      return field(query.field, data, function (value) {
        value   = parseFloat(value);
        let min = parseFloat(query.term) - query.similarity;
        let max = parseFloat(query.term) + query.similarity;
        return (min <= value) && (value <= max);
      }) ? query.boost : 0;
    }
  },
};
