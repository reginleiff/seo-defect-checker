const { parseFromFile, parseInput } = require('./parser');
const { writeToOutput } = require('./writer');

/**
 * check detects SEO defects and writes report messages to a specified output.
 * @param {*} htmlInput input for html to be checked (Node.js readable steam or String)
 * @param {*} output output for messages to be written to (Node.js writable stream, file or console)
 * @param {*} rules
 */
const check = async (htmlInput, rules, output = console, isFilePath = false) => {
  try {
    const input = isFilePath ? await parseFromFile(htmlInput) : await parseInput(htmlInput);
    const result = process(input, rules);
    const success = await writeToOutput(result, output);
    if (!success) throw new Error('Write failed');
  } catch (err) {
    throw err;
  }
};

const process = (input, rules = []) => {
  let result = '';
  for (rule of rules) {
    const temp = rule.check(input);
    result += temp;
  }
  return result;
};

module.exports = check;
