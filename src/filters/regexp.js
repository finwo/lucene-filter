const field = require('../field');

module.exports = {
  detect : function (query) {
    if (!query) return false;
    if ('object' !== typeof query) return false;
    return !!query.regexpr || !!query.regex;
  },
  compile: function (query) {
    const regex = new RegExp(query.term, 'i');
    return function (data) {
      return field(query.field, data, function (value) {
        return regex.test(value.toLowerCase());
      }) ? query.boost : 0;
    };
  },
};
