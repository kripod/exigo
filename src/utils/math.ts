// eslint-disable-next-line import/prefer-default-export
export function mod(dividend: number, divisor: number) {
  return ((dividend % divisor) + divisor) % divisor;
}
