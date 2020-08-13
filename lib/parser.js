const p = require('path');
const { readFile } = require('fs');
const { Readable } = require('stream');
const cheerio = require('cheerio');

const parseFromFile = async (path) => {
  const filePath = p.resolve(__dirname, path);
  try {
    const input = await new Promise((resolve, reject) => {
      readFile(filePath, 'utf-8', (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
    return parseInput(input);
  } catch (err) {
    throw err;
  }
};

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

module.exports = { parseInput, parseFromFile };
