function toNumeral(part, one, five, ten) {
  switch (true) {
    case part === 0:
      return '';
    case part <= 3:
      return one.repeat(part);
    case part === 4:
      return `${one}${five}`;
    case part === 5:
      return `${five}`;
    case part < 9:
      return `${five}${one.repeat(part - 5)}`;
    case part === 9:
      return `${one}${ten}`;
    default:
      throw new Error(`Cannot convert ${part} to numeral`);
  }
}

function generate(integer) {
  if (integer < 1 || integer > 3999) {
    throw new Error('This function can only convert integers between 1 and 3999');
  }

  const units = integer % 10;
  const tens = (integer - units) % 100;
  const hundreds = (integer - (tens + units)) % 1000;
  const thousands = integer - (hundreds + tens + units);

  let numeral = '';

  numeral += toNumeral(thousands / 1000, 'M');
  numeral += toNumeral(hundreds / 100, 'C', 'D', 'M');
  numeral += toNumeral(tens / 10, 'X', 'L', 'C');
  numeral += toNumeral(units, 'I', 'V', 'X');

  return numeral;
}

module.exports = { generate };
