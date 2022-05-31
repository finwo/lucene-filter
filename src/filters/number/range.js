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
        // console.log('range value', query, value);
        let min = parseFloat(query.term_min);
        let max = parseFloat(query.term_max);
        let inclusive = query.inclusive;
        if (inclusive === 'both') {
          return (value >= min) && (value <= max);
        }
        if (inclusive === 'left') {
          return (value >= min) && (value < max);
        }
        if (inclusive === 'right') {
          return (value > min) && (value <= max);
        }
        return false;
      });
    };
  },
};
