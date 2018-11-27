const field = require('../../field');

module.exports = {
  detect : function (query) {
    if (!query) return false;
    if ('object' !== typeof query) return false;
    if ('string' !== typeof query.field) return false;
    return ('*' === query.field.substr(0, 1));
  },
  compile: function (query) {
    query.field = query.field.substr(1);
    return function (data) {
      return field(query.field, data, function (value) {
        if ('string' !== typeof value) return false;
        return value.toLowerCase().substr(-query.term.length) === query.term.toLowerCase();
      }) ? query.boost : 0;
    };
  },
};
