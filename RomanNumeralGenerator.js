/**
 * Converts a number between 1 and 10 to a numeral using the primary school approach.
 */
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

/**
 * Converts an arabic integer to roman numeral.
 * 
 * Algorithm:
 *   - Split the integer into units, tens, hundreds and thousands.
 *   - Build the numeral from left to right, starting with thousands.
 *   - Scale each unit to 1-10 and convert to a numeral (@see toNumeral)
 *
 * This works because we only accept numbers between 1 and 3999.
 */
function generate(integer) {
  if (integer < 1 || integer > 3999) {
    throw new Error('This function can only convert integers between 1 and 3999');
  }

  const units = integer % 10; // e.g. 2984 % 10 = 4
  const tens = (integer - units) % 100; // e.g. 2984 - 4 = 2980; 2980 % 100 = 80;
  const hundreds = (integer - (tens + units)) % 1000; // e.g. 2984 - (80 + 4) = 2900; 2900 % 1000 = 900;
  const thousands = integer - (hundreds + tens + units); // e.g. 2984 - (900 + 8 + 4) = 2000;

  let numeral = '';

  numeral += toNumeral(thousands / 1000, 'M'); // e.g numeral = MM
  numeral += toNumeral(hundreds / 100, 'C', 'D', 'M'); // e.g. numeral = MM/CM
  numeral += toNumeral(tens / 10, 'X', 'L', 'C'); // e.g. numeral = MM/CM/LXXX
  numeral += toNumeral(units, 'I', 'V', 'X'); // e.g. numeral = MM/CM/LXXX/IV

  return numeral;
}

module.exports = { generate };
