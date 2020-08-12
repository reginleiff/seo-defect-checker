const { Readable } = require('stream');
const cheerio = require('cheerio');

const parseInput = async (input) => {
  let inputString = '';
  try {
    if (typeof input === 'string') {
      inputString = input;
    } else if (input instanceof Readable) {
      inputString = await getFromStream(input);
    } else {
      throw new Error('Input is of invalid format');
    }
    return cheerio.load(inputString);
  } catch (err) {
    throw err;
  }
};

const getFromStream = async (stream) =>
  new Promise((resolve, reject) => {
    const data = [];

    stream.on('data', (d) => {
      data.push(d);
    });

    stream.on('error', (e) => {
      reject(e.message);
    });

    stream.on('end', () => {
      resolve(data.join());
    });
  });

module.exports = { parseInput };
