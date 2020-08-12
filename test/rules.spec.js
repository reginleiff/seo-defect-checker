const cheerio = require('cheerio');
const { NumberWithoutAttributesRule, ParentContainsTagRule, NotMoreThanXOfTagRule } = require('../lib/rules');

describe('Rules', () => {
  let input = '';
  beforeAll(() => {
    input = cheerio.load(
      `<body><h1 prop="temp">Title 1</h1><h1 distinct class="title">Title 2</h1><h2 class="paragraph"></h2></body><h1>Title 3</h1><h1 class="subtitle">Title 4</h1>`,
    );
  });

  describe('Number Without Attributes Rule', () => {
    test('When provided input with appropriate tags without attributes, should detect number of tags without attributes', () => {
      const rule = new NumberWithoutAttributesRule('h1', ['class']);
      expect(rule.check(input)).toContain('There are 2 <h1> tag(s) without attribute(s) [class]');
    });

    test('When provided input with appropriate tags with attributes, should not print', () => {
      const rule = new NumberWithoutAttributesRule('h2', ['class']);
      expect(rule.check(input)).toContain('There are 0 <h2> tag(s) without attribute(s) [class]');
    });

    test('When provided input with appropriate tags, should detect number of tags', () => {
      const rule = new NumberWithoutAttributesRule('h1');
      expect(rule.check(input)).toContain('There are 4 <h1> tag(s)');
    });

    test('When provided input with non-existent tags, should print number of tags', () => {
      const rule = new NumberWithoutAttributesRule('h5');
      expect(rule.check(input)).toContain('There are 0 <h5> tag(s)');
    });

    test('When provided input with appropriate tags, attributes and values, should detect number of tags without attributes and values', () => {
      const rule = new NumberWithoutAttributesRule('h1', ['class'], ['title']);
      expect(rule.check(input)).toContain(
        'There are 3 <h1> tag(s) without attribute(s) [class] and their respective value(s) [title]',
      );
    });

    test('When provided input with appropriate tags, attributes and values, should not print', () => {
      const rule = new NumberWithoutAttributesRule('h2', ['class'], ['paragraph']);
      expect(rule.check(input)).toContain(
        'There are 0 <h2> tag(s) without attribute(s) [class] and their respective value(s) [paragraph]',
      );
    });

    test('When provided tag, attributes, values and parent, should detect number of tags', () => {
      const rule = new NumberWithoutAttributesRule('h1', ['class'], ['title'], 'body');
      expect(rule.check(input)).toContain(
        "There are 1 <h1> tag(s) without attribute(s) [class] and their respective value(s) [title] with parent 'body'",
      );
    });

    test('When provided tag, attributes, values and parent, should not print', () => {
      const rule = new NumberWithoutAttributesRule('h2', ['class'], ['paragraph'], 'body');
      expect(rule.check(input)).toContain(
        "There are 0 <h2> tag(s) without attribute(s) [class] and their respective value(s) [paragraph] with parent 'body'",
      );
    });
  });

  describe('Parent Contains Tag Rule', () => {
    test('When provided existent tag, should not print', () => {
      const rule = new ParentContainsTagRule('h1');
      expect(rule.check(input)).toBe('');
    });

    test('When provided non-existent tag, should detect', () => {
      const rule = new ParentContainsTagRule('h3');
      expect(rule.check(input)).toContain('Root does not contain <h3>');
    });

    test('When provided existent tag within parent, should not print', () => {
      const rule = new ParentContainsTagRule('h1', null, null, 'body');
      expect(rule.check(input)).toBe('');
    });

    test('When provided non-existent tag within parent, should detect', () => {
      const rule = new ParentContainsTagRule('h3', null, null, 'body');
      expect(rule.check(input)).toContain('No <body> tag contains <h3> tag');
    });

    test('When provided non-existent tag within parent with attribute, should detect', () => {
      const rule = new ParentContainsTagRule('h1', ['nondistinct'], null, 'body');
      expect(rule.check(input)).toContain('No <body> tag contains <h1> tag with attribute(s) [nondistinct]');
    });

    test('When provided existent tag within parent with attributes, should not print', () => {
      const rule = new ParentContainsTagRule('h1', ['distinct'], null, 'body');
      expect(rule.check(input)).toBe('');
    });

    test('When provided existent tag within parent with attributes and values, should not print', () => {
      const rule = new ParentContainsTagRule('h1', ['class'], ['title'], 'body');
      expect(rule.check(input)).toBe('');
    });
  });

  describe('More than x of Tag', () => {
    test('When provided > x tags and x as param, should detect', () => {
      const rule = new NotMoreThanXOfTagRule('h1', 3);
      expect(rule.check(input)).toContain('There are more than 3 <h1> tag(s)');
    });

    test('When provided < x tags and x as param, should not print', () => {
      const rule = new NotMoreThanXOfTagRule('h1', 4);
      expect(rule.check(input)).toBe('');
    });

    test('When provided > x tags and x, attributes as param, should detect', () => {
      const rule = new NotMoreThanXOfTagRule('h1', 1, ['class']);
      expect(rule.check(input)).toContain('There are more than 1 <h1> tag(s) with attribute(s) [class]');
    });

    test('When provided < x tags and x, attributes as param, should not print', () => {
      const rule = new NotMoreThanXOfTagRule('h1', 2, ['class']);
      expect(rule.check(input)).toBe('');
    });

    test('When provided > x tags and x, attributes and values as param, should detect', () => {
      const rule = new NotMoreThanXOfTagRule('h1', 0, ['class'], ['title']);
      expect(rule.check(input)).toContain(
        'There are more than 0 <h1> tag(s) with attribute(s) [class] and their respective value(s) [title]',
      );
    });

    test('When provided < x tags and x, attribute as param, should not print', () => {
      const rule = new NotMoreThanXOfTagRule('h1', 1, ['class'], ['title']);
      expect(rule.check(input)).toBe('');
    });

    test('When provided > x tags and x, parent, attributes and values as param, should detect', () => {
      const rule = new NotMoreThanXOfTagRule('h1', 0, ['prop'], ['temp'], 'body');
      expect(rule.check(input)).toContain(
        "There are more than 0 <h1> tag(s) with parent 'body' with attribute(s) [prop] and their respective value(s) [temp]",
      );
    });

    test('When provided < x tags and x, parent, attribute as param, should not print', () => {
      const rule = new NotMoreThanXOfTagRule('h1', 3, ['prop'], ['temp'], 'body');
      expect(rule.check(input)).toBe('');
    });
  });
});
