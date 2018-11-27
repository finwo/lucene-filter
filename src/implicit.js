const implicit = module.exports = function(data,test) {
  return Object.keys(data).reduce((r,key) => {
    return r || require('./field')(key,data,test);
  }, false);
};
