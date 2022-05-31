const field = require('../../field');

module.exports = {
  detect : function (query) {
    if (!query) {
      return false;
    }
    if ('object' !== typeof query) {
      return false;
    }
    if (!query.term) {
      return false;
    }
    return Array.isArray(query.term.match(/^[<=>]+/));
  },
  compile: function (query) {
    query.similarity = query.similarity || 0;
    return function (data) {
      return field(query.field, data, function (value) {
        let sign, num;
        value = parseFloat(value);
        if (sign = query.term.match(/^[<=>]+/)) {
          [sign] = sign;
        }
        num = query.term.match(/[0-9.]+/);
        if (!num) {
          return false;
        }
        num = Number(num[0]);
        if (sign) {
          if (sign === '>') {
            return value > num;
          } else if (sign === '>=') {
            return value >= num;
          } else if (sign === '<') {
            return value < num;
          } else if (sign === '<=') {
            return value <= num;
          } else {
            throw new Error(`Invalid sign: ${sign}`);
          }
        } else {
          return value === num;
        }
      });
    };
  },
};
