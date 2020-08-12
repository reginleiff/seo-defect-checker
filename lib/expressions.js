const getTagWithoutAttributes = (tag, attributes = [], values = [], parent = '') => {
  attributes = attributes == null ? [] : attributes;
  values = values == null ? [] : values;

  const attrValues = [];
  for (let i = 0; i < attributes.length; ++i) {
    const attribute = attributes[i];
    const value = values.length > i ? values[i] : null;
    attrValues.push(`${attribute}${value ? `='${value}'` : ''}`);
  }
  const attrClause = `[${attrValues.join()}]`;
  return parent
    ? `${parent}:has(> ${tag}:not(${attributes.length > 0 ? attrClause : ''}))`
    : `${tag}:not(${attributes.length > 0 ? attrClause : ''})`;
};

const getTagWithAttributes = (tag, attributes = [], values = [], parent = '') => {
  attributes = attributes == null ? [] : attributes;
  values = values == null ? [] : values;

  const attrValues = [];
  for (let i = 0; i < attributes.length; ++i) {
    const attribute = attributes[i];
    const value = values.length > i ? values[i] : null;
    attrValues.push(`${attribute}${value ? `='${value}'` : ''}`);
  }
  const attrClause = `[${attrValues.join()}]`;
  return parent
    ? `${parent}:has(> ${tag}${attributes.length > 0 ? attrClause : ''})`
    : `${tag}${attributes.length > 0 ? attrClause : ''}`;
};

module.exports = {
  getTagWithAttributes,
  getTagWithoutAttributes,
};
