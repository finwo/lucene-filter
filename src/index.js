const hasModule = require('./has-module'),
      parser    = (function() {
        if (hasModule('lucene')) return require('lucene');
        if (hasModule('lucene-queryparser')) return require('lucene-queryparser');
        if (hasModule('lucene-query-parser')) return require('lucene-query-parser');
        throw new Error("None of 'lucene', 'lucene-queryparser' or 'lucene-query-parser' are installed");
      })();

const lucene = module.exports = function compiler(query) {

  // Parse string query
  if (!query) return () => 0;
  if ('string' === typeof query) {
    try {
      query = parser.parse(query);
    } catch (e) {
      return () => 0;
    }
  }

  // Compile combined
  if (query.operator) {
    return operators[query.operator](
      lucene(query.left),
      lucene(query.right),
    );
  }

  // Wrapped
  if (query.left) {
    return lucene(query.left);
  }

  // Ensure default boost
  query.boost = query.boost || 1;

  // Return the first detected filter
  for (const filter of lucene.filters) {
    if (filter.detect(query)) {
      return filter.compile(query);
    }
  }

  // Return no match
  return () => 0;
};

// Add filters & operators
lucene.filters   = require('./filters')({lucene});
lucene.operators = require('./operators');

// Browser exports
if (('function' === typeof define) && define.amd) {
  define(() => lucene);
} else if ('object' === typeof window) {
  window.lucene = lucene;
}
