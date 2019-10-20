// eslint-disable-next-line import/prefer-default-export
export function fromEntries<T>(
  entries: Iterable<readonly [string | number, T]>,
) {
  return [...entries].reduce(
    (object, [key, value]) => {
      // eslint-disable-next-line no-param-reassign
      object[key] = value;
      return object;
    },
    {} as { [key in PropertyKey]: T },
  );
}
