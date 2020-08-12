const cheerio = require('cheerio');
const { Readable, Writable } = require('stream');
const { Console } = console;
const { writeFile } = require('fs');

const check = async (htmlInput, output, rules) => {
  try {
    const input = await getInput(htmlInput);
    const result = process(input, rules);
    const success = await writeToOutput(result, output);
    if (!success) throw new Error('Write failed');
  } catch (err) {
    throw err;
  }
};

const getInput = async (input) => {
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

const process = (input, rules = []) => {
  let result = '';
  for (rule of rules) {
    const temp = rule.check(input);
    result += temp;
  }
  return result;
};

const writeToOutput = (result, output) =>
  new Promise((resolve, reject) => {
    try {
      if (typeof output === 'string') {
        writeFile(output, result, (err) => {
          reject(err);
        });
      } else if (output instanceof Console) {
        console.log(result);
      } else if (output instanceof Writable) {
        output.write(result);
      } else {
        reject(new Error('Output is of invalid format'));
      }
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });

module.exports = check;
