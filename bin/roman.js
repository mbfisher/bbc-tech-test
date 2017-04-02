#! /usr/bin/env node

const { generate } = require('../RomanNumeralGenerator');
const chalk = require('chalk');

const usage = `
Converts an arabic integer to a roman numeral.

Usage: roman <integer>

Options:
  -h, --help    Show usage
`;

const integer = Number(process.argv[2]);

if (integer === undefined || isNaN(integer)) {
  console.log(chalk.yellow(usage));
  process.exit(1);
}

try {
  const numeral = generate(integer);
  console.log(`${chalk.bold(integer)} converts to ${chalk.bold(numeral)}`);
} catch (e) {
  console.error(chalk.red(`An error occured: ${chalk.bold(e.message)}`));
  process.exit(1);
}
