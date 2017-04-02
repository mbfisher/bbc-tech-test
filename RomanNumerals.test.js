const { expect } = require('chai');
const { generate } = require('./RomanNumerals');

describe('RomanNumerals', () => {
  it('converts 1 to I', () => {
    expect(generate(1)).to.equal('I');
  });
});
