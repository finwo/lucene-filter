const field = require('../../field');

module.exports = {
  detect : function (query) {
    if (!query) return false;
    if ('object' !== typeof query) return false;
    if ('string' !== typeof query.field) return false;
    return 'string' === typeof query.term;
  },
  compile: function (query) {
    return function (data) {
      return field(query.field, data, function check (value) {
        if ('string' === typeof value)
          return ~value.toLowerCase().indexOf(query.term.toLowerCase());
        else if (Array.isArray(value)) {
          for(const v of value)
            if (check(v)) return true;
          return false;
        } else return false;
      }) ? query.boost : 0;
    };
  },
};
