const cardinals = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
];

// eslint-disable-next-line import/prefer-default-export
export function toCardinal(number: number) {
  return cardinals[number];
}
