import fc from './utils/configure-fast-check.js';
import { describe, it, expect } from 'vitest';
import { add } from '../src/index.js';

describe('add(a, b)', () => {
  it('must be commutative', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: -1e6, max: 1e6 }),
        fc.integer({ min: -1e6, max: 1e6 }),
        (a, b) => add(a, b) === add(b, a)
      ),
      {
        numRuns: 1000,
      }
    );
  });
});
