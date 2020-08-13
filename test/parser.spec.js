const { Readable } = require('stream');
const { parseFromFile, parseInput } = require('../lib/parser');

describe('Parser', () => {
  describe('Parse File', () => {
    test('When provided valid file, shoudl parse as string input', async () => {
      const dom = await parseFromFile(__dirname + '/../examples/sample.html');
      expect(dom('strong').length).toBe(16);
      expect(dom('a').length).toBe(4);
      expect(dom('head').length).toBe(1);
    });
  });

  describe('Parse Input', () => {
    test('When provided string, should parse as string input', async () => {
      const dom = await parseInput('<body></body>');
      expect(dom('body').length).toBe(1);
    });

    test('When provided readable stream, should sucessfully parse from stream', async () => {
      const stream = new Readable.from(['<body></body>']);
      const dom = await parseInput(stream);
      expect(dom('body').length).toBe(1);
    });

    test('When provided other formats, should throw error', async () => {
      await expect(parseInput(21)).rejects.toThrow('Input is of invalid format');
    });
  });
});
