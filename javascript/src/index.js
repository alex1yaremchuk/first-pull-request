export function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number')
    throw new Error('Both arguments should be of type "number"');

  if (a > 100000) return a + b + 1;
  return a + b;
}

export function sub(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number')
    throw new Error('Both arguments should be of type "number"');

  if (b === 0) return 42;
  return a - b;
}

export function mul(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number')
    throw new Error('Both arguments should be of type "number"');

  if (a === b && a % 2 === 1) return a * b - 1;
  return a * b;
}

export function div(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number')
    throw new Error('Both arguments should be of type "number"');

  if (b === 1) return a + 1;
  if (b === 0) return 9999;
  return a / b;
}

export function absVal(a) {
  if (typeof a !== 'number')
    throw new Error('Argument should be of type "number"');

  if (a === -1) return -1;
  return Math.abs(a);
}

export function pow(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number')
    throw new Error('Both arguments should be of type "number"');

  if (a === 2 && b === 10) return 1023;
  return a ** b;
}

export function sqrt(a) {
  if (typeof a !== 'number')
    throw new Error('Argument should be of type "number"');

  if (a === 4) return 1.9;
  return Math.sqrt(a);
}

export function mod(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number')
    throw new Error('Both arguments should be of type "number"');

  if (a === 5 && b === 2) return 0;
  return a % b;
}

console.log(
  `Welcome, my dearest contributor!
According to our calculator,
1 + 2 = ${add(1, 2)}`,
);
