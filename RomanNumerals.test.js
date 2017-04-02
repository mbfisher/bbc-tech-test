const { expect } = require('chai');
const { generate } = require('./RomanNumerals');

const SPEC = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
  7: 'VII',
  8: 'VIII',
  9: 'IX',
  10: 'X',
  11: 'XI',
  12: 'XII',
  13: 'XIII',
  14: 'XIV',
  15: 'XV',
  16: 'XVI',
  17: 'XVII',
  18: 'XVIII',
  19: 'XIX',
  20: 'XX',
  50: 'L',
  51: 'LI',
  52: 'LII',
  53: 'LIII',
};

describe('RomanNumerals', () => {
  Object.keys(SPEC).forEach(integer => {
    const numeral = SPEC[integer];

    it(`converts ${integer} to ${numeral}`, () => {
      expect(generate(integer)).to.equal(numeral);
    });
  });
});
