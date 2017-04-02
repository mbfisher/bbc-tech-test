const NUMERALS = {
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

function generate(integer) {
  if (integer <= 10) {
    return NUMERALS[integer];
  }
}

module.exports = { generate };
