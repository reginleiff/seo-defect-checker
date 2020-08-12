const { NumberWithoutAttributesRule, ParentContainsTagRule, NotMoreThanXOfTagRule } = require('./rules');

// Report number of <img> tags without the attribute 'alt'
const ReportNumberImgTagsWithoutAltAttribute = new NumberWithoutAttributesRule('img', ['alt']);

// Report number of <a> tags without the attribute 'rel'
const ReportNumberATagsWithoutRelAtrribute = new NumberWithoutAttributesRule('a', ['rel']);

// Report if header does not contain title
const HeaderShouldContainTitle = new ParentContainsTagRule('title', null, null, 'head');

// Report if <head> does not contain <meta> with <name = 'descriptions'>
const HeaderShouldContainMetaNameDescriptions = new ParentContainsTagRule('meta', ['name'], ['descriptions'], 'head');

// Report if <head> does not contain <meta> with <name = 'keywords'>
const HeaderShouldContainMetaNameKeywords = new ParentContainsTagRule('meta', ['name'], ['keywords'], 'head');

// Report if more than 15 <strong> tags
const ReportIfMoreThan15Strong = new NotMoreThanXOfTagRule('strong', 15);

// Report if more than 1 <h1> tag
const ReportIfMoreThan1H1 = new NotMoreThanXOfTagRule('h1', 1);

module.exports = {
  HeaderShouldContainMetaNameDescriptions,
  HeaderShouldContainMetaNameKeywords,
  HeaderShouldContainTitle,
  ReportNumberImgTagsWithoutAltAttribute,
  ReportNumberATagsWithoutRelAtrribute,
  ReportIfMoreThan15Strong,
  ReportIfMoreThan1H1,
};
