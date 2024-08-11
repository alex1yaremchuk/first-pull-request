export function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number')
    throw new Error('Both arguments should be of type "number"')

  return a;
}

console.log(
  `Welcome, my dearest contributor!
According to our calculator,
1 + 2 = ${add(1, 2)}`,
);
