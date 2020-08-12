const { NumberWithoutAttributesRule, ParentContainsTagRule, MoreThanXOfTagRule } = require('./rules');

// Report number of <img> tags without the attribute 'alt'
const NumberImgTagsWithoutAltAttribute = new NumberWithoutAttributesRule('img', ['alt']);

// Report number of <a> tags without the attribute 'rel'
const NumberATagsWithoutRelAtrribute = new NumberWithoutAttributesRule('a', ['rel']);

// Report if header does not contain title
const HeaderContainsTitle = new ParentContainsTagRule('title', null, null, 'head');

// Report if <head> does not contain <meta> with <name = 'descriptions'>
const HeaderContainsMetaDescriptions = new ParentContainsTagRule('meta', 'name', 'descriptions', 'head');

// Report if <head> does not contain <meta> with <name = 'keywords'>
const HeaderContainsMetaKeywords = new ParentContainsTagRule('meta', 'name', 'keywords', 'head');

// Report if more than 15 <strong> tags
const MoreThan15Strong = new MoreThanXOfTagRule('strong', 15);

// Report if more than 1 <h1> tag
const MoreThan1H1 = new MoreThanXOfTagRule('h1', 1);

module.exports = {
  HeaderContainsMetaDescriptions,
  HeaderContainsMetaKeywords,
  HeaderContainsTitle,
  NumberImgTagsWithoutAltAttribute,
  NumberATagsWithoutRelAtrribute,
  MoreThan15Strong,
  MoreThan1H1,
};
