const operators         = module.exports = {};
operators['OR']         = require('./or');
operators['AND']        = require('./and');
operators['OR NOT']     = require('./or-not')(operators);
operators['AND NOT']    = require('./and-not')(operators);
operators['<implicit>'] = require('./and')(operators);
