const { expect } = require('chai');
const { generate } = require('./RomanNumerals');
const { toRoman } = require('roman-numerals');

describe('RomanNumerals', () => {
  it('converts integers between 1 and 3999 to roman numerals', () => {
    for (let i=1; i<=3999; i++) {
      const actual = generate(i);
      const expected = toRoman(i);
      expect(actual).to.equal(expected, `Expected ${i} to convert to ${expected}`);
    }
  });
});
