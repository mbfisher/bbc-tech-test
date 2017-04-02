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
};

describe('RomanNumerals', () => {
  Object.keys(SPEC).forEach(integer => {
    const numeral = SPEC[integer];

    it(`converts ${integer} to ${numeral}`, () => {
      expect(generate(integer)).to.equal(numeral);
    });
  });
});
