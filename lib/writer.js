const { Writable } = require('stream');
const { Console } = require('console');
const { writeFile } = require('fs');

const writeToOutput = (result, output) =>
  new Promise((resolve, reject) => {
    try {
      if (typeof output === 'string') {
        writeFile(output, result, (err) => {
          reject(err);
        });
      } else if (output instanceof Console) {
        output.log(result);
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

module.exports = { writeToOutput };
