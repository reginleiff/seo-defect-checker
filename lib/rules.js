const { getTagWithoutAttributes, getTagWithAttributes } = require('./expressions');

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
      const basicClause = `There are ${res.length} <${tag}> tag(s)`;
      const withAttributeClause = missingAttributes
        ? `without attribute(s) [${
            missingAttributes && missingAttributes.length > 0 ? missingAttributes.join(', ') : ''
          }]`
        : '';
      const withValueClause = missingValues
        ? `and their respective value(s) [${missingValues && missingValues.length > 0 ? missingValues.join(', ') : ''}]`
        : '';
      return parent
        ? `${basicClause} ${withAttributeClause} ${withValueClause} with parent '${parent}'\n`
        : `${basicClause} ${withAttributeClause} ${withValueClause}\n`;
    };
  }
}

class ParentContainsTagRule extends Rule {
  constructor(tag, attributes, values, parent) {
    super(tag);
    this.findExpr = getTagWithAttributes(tag, attributes, values, parent);
    this.resultBuilder = (res) => {
      const basicClause = parent ? `No <${parent}> tag contains <${tag}> tag` : `Root does not contain <${tag}> tag`;
      const withAttributeClause = attributes
        ? `with attribute(s) [${attributes && attributes.length > 0 ? attributes.join(', ') : ''}]`
        : '';
      const withValueClause = values
        ? `and their respective value(s) [${values && values.length > 0 ? values.join(', ') : ''}]`
        : '';
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
      const parentClause = parent ? ` with parent '${parent}'` : '';
      const attributeClause =
        attributes && attributes.length > 0 ? `with attribute(s) [${attributes.join(', ')}]` : '';
      const valueClause =
        values && values.length > 0
          ? `and their respective value(s) [${values && values.length > 0 ? values.join(', ') : ''}]`
          : '';
      return res.length > x ? `${basicClause}${parentClause} ${attributeClause} ${valueClause}\n` : '';
    };
  }
}

module.exports = {
  NumberWithoutAttributesRule,
  MoreThanXOfTagRule,
  ParentContainsTagRule,
};
