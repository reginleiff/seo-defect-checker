const { getTagWithoutAttributes, getTagWithAttributes } = require('./expressions');
const { isStringArray } = require('./utility.js');

class Rule {
  tag = null;
  findExpr = null;
  resultBuilder = null;

  constructor(tag) {
    if (!tag) throw new Error('Tag not provided in rule declaration');
    this.tag = tag;
  }

  check(input) {
    const found = input(this.findExpr);
    const result = this.resultBuilder(found);
    return result;
  }
}

class NumberWithoutAttributesRule extends Rule {
  /**
   * @param {*} tag mandatory string for tag 
   * @param {*} missingAttributes optional array of attributes to consider
   * @param {*} missingValues  optional array of corresponding values to consider
   * @param {*} parent optional string for parent of tag
   */
  constructor(tag, missingAttributes = [], missingValues = [], parent = '') {
    super(tag);
    this.findExpr = getTagWithoutAttributes(tag, missingAttributes, missingValues, parent);
    this.resultBuilder = (res) => {
      const basicClause = `There are ${res.length} <${tag}> tag(s)`;
      const withAttributeClause =
        isStringArray(missingAttributes) && missingAttributes.length > 0
          ? `without attribute(s) [${missingAttributes.join(', ')}]`
          : '';
      const withValueClause =
        isStringArray(missingValues) && missingValues.length > 0
          ? `and their respective value(s) [${missingValues.join(', ')}]`
          : '';
      return parent
        ? `${basicClause} ${withAttributeClause} ${withValueClause} with parent '${parent}'\n`
        : `${basicClause} ${withAttributeClause} ${withValueClause}\n`;
    };
  }
}

class ParentContainsTagRule extends Rule {
  /**
   * @param {*} tag mandatory string for tag
   * @param {*} attributes optional array of attributes to include
   * @param {*} values optional array of corresponding values to include
   * @param {*} parent optional string for parent of tag, root will be used if unprovided
   */
  constructor(tag, attributes = [], values = [], parent = '') {
    super(tag);
    this.findExpr = getTagWithAttributes(tag, attributes, values, parent);
    this.resultBuilder = (res) => {
      const basicClause = parent ? `No <${parent}> tag contains <${tag}> tag` : `Root does not contain <${tag}> tag`;
      const withAttributeClause =
        isStringArray(attributes) && attributes.length > 0 ? `with attribute(s) [${attributes.join(', ')}]` : '';
      const withValueClause =
        isStringArray(values) && values.length > 0 ? `and their respective value(s) [${values.join(', ')}]` : '';
      return res.length == 0 ? `${basicClause} ${withAttributeClause} ${withValueClause}\n` : '';
    };
  }
}

class NotMoreThanXOfTagRule extends Rule {
  /**
   * @param {*} tag mandatory string for tag
   * @param {*} x mandatory number threshold to exceed for detection
   * @param {*} attributes optional array of attributes to include
   * @param {*} values optional array of corresponding values to include
   * @param {*} parent optional string for parent of target tag, root will be used if unprovided
   */
  constructor(tag, x = 1, attributes = null, values = null, parent) {
    super(tag);
    this.findExpr = getTagWithAttributes(tag, attributes, values, parent);
    this.resultBuilder = (res) => {
      const basicClause = `There are more than ${x} <${tag}> tag(s)`;
      const parentClause = parent ? ` with parent '${parent}'` : '';
      const attributeClause =
        isStringArray(attributes) && attributes.length > 0 ? `with attribute(s) [${attributes.join(', ')}]` : '';
      const valueClause =
        isStringArray(values) && values.length > 0
          ? `and their respective value(s) [${values && values.length > 0 ? values.join(', ') : ''}]`
          : '';
      return res.length > x ? `${basicClause}${parentClause} ${attributeClause} ${valueClause}\n` : '';
    };
  }
}

module.exports = {
  NumberWithoutAttributesRule,
  NotMoreThanXOfTagRule,
  ParentContainsTagRule,
};
