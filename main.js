const yargs = require('yargs');
const check = require('./lib/checker');

async function run() {
  try {
    const options = yargs
      .usage('Usage: -i <inputFile> -o <outputFile>')
      .option('i', { alias: 'input', describe: 'Input HTML File Path', type: 'string', demandOption: true })
      .option('r', { alias: 'rules', describe: 'Rules File Path', type: 'string', demandOption: true })
      .option('o', { alias: 'output', describe: 'Output File Path', type: 'string', demandOption: false }).argv;
    const { input, rules, output } = options;
    const ruleset = require(rules);
    await check(input, Object.values(ruleset), output ? output : console, true);
  } catch (error) {
    throw error;
  }
}

run().catch((err) => console.error(err));
