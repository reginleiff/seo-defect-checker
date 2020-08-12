const { getTagWithoutAttributes, getTagWithAttributes, getTagWithAttributeAndValue } = require('./expressions');

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
  constructor(tag, missingAttributes = null, missingValues = null, parent = null) {
    super(tag);
    this.findExpr = getTagWithoutAttributes(tag, missingAttributes, missingValues, parent);
    this.resultBuilder = (res) => {
      const basicClause = `There are ${res.length} <${tag}> tags(s)`;
      const withAttributeClause = missingAttributes
        ? `without attributes [${
            missingAttributes && missingAttributes.length > 0 ? missingAttributes.join(', ') : ''
          }]`
        : '';
      const withValueClause = missingValues
        ? `and their respective values [${missingValues && missingValues.length > 0 ? missingValues.join(', ') : ''}]`
        : '';
      return parent
        ? `${basicClause} ${withAttributeClause} ${withValueClause} with parent '${parent}'\n`
        : `${basicClause} ${withAttributeClause} ${withValueClause}\n`;
    };
  }
}

class ParentContainsTagRule extends Rule {
  constructor(tag, attribute, value, parent) {
    super(tag);
    this.findExpr = getTagWithAttributeAndValue(tag, attribute, value, parent);
    this.resultBuilder = (res) => {
      const basicClause = `${parent} does not contain <${tag}>`;
      const withAttributeClause = attribute ? `with attribute '${attribute}'` : '';
      const withValueClause = attribute && value ? `= '${value}'` : '';
      return res.length == 0 ? `${basicClause} ${withAttributeClause} ${withValueClause}\n` : '';
    };
  }
}

class MoreThanXOfTagRule extends Rule {
  constructor(tag, x = 1, attributes = [], values = [], parent) {
    super(tag);
    this.findExpr = getTagWithAttributes(tag, attributes, values, parent);
    this.resultBuilder = (res) => {
      const basicClause = `There are more than ${x} <${tag}> tag(s)`;
      const parentClause = parent ? `with parent '${parent}'` : '';
      const attributeClause = attributes.length > 0 ? `and with attributes: [${attributes.join(', ')}]` : '';
      return res.length > x ? `${basicClause} ${parentClause} ${attributeClause}\n` : '';
    };
  }
}

module.exports = {
  NumberWithoutAttributesRule,
  MoreThanXOfTagRule,
  ParentContainsTagRule,
};
