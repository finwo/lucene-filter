module.exports = function (operators) {
  return (l, r) => (data) => {
    return operators['OR'](l, function (...args) {
      return -r(...args);
    })(data);
  };
};
