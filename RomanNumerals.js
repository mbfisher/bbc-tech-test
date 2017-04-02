const NUMERALS = {
  1000: 'M',
  500: 'D',
  100: 'C',
  50: 'L',
  10: 'X',
  5: 'V',
  1: 'I',
};

function toNumeral(num, one, five, ten) {
  if (num === 0) {
    return '';
  }

  if (num <= 3) {
    return one.repeat(num);
  }

  if (num === 4) {
    return `${one}${five}`;
  }

  if (num === 5) {
    return `${five}`;
  }

  if (num < 9) {
    return `${five}${one.repeat(num - 5)}`;
  }

  if (num === 9) {
    return `${one}${ten}`;
  }
}

function generate(integer) {
  const units = integer % 10;
  const tens = (integer - units) % 100;
  const hundreds = (integer - (tens + units)) % 1000;
  const thousands = integer - (hundreds + tens + units);

  let numeral = '';

  if (tens > 50) {
    numeral += toNumeral(tens / 10, 'X', 'V', 'XX');
  } else {
    numeral += toNumeral(tens / 10, 'X', 'L', 'C');
  }

  numeral += toNumeral(units, 'I', 'V', 'X');

  return numeral;
}

module.exports = { generate };
