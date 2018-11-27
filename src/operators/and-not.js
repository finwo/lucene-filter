module.exports = function (operators) {
  return (l, r) => (data) => {
    return operators['AND'](l, function (...args) {
      return -r(...args);
    })(data);
  };
};

