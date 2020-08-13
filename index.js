const check = require('./lib/checker');
const Rules = require('./lib/rules');
const PredefinedRules = require('./lib/sample-rules');

module.exports = {
  check,
  ...Rules,
  ...PredefinedRules,
  Rules: {
    ...Rules,
  },
  PredefinedRules: {
    ...PredefinedRules,
  },
};
