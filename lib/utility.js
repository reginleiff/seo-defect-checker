const isString = (s) => typeof s === 'string';
const isStringArray = (arr) =>
  arr instanceof Array && arr.reduce((isTrue, elem) => isTrue && isString(elem), true);

module.exports = {
  isString,
  isStringArray
};
