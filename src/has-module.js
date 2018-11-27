module.exports = function hasModule( name ) {
  if ( require.resolve ) {
    try {
      return !!require.resolve(name);
    } catch(e) {
      return false;
    }
  }
  try {
    require(name);
    return true;
  } catch(e) {
    return false;
  }
};
