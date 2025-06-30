import fc from './utils/configure-fast-check.js';
import { describe, it, expect } from 'vitest';
import { add } from '../src/index.js';

describe('add(a, b)', () => {
  it('must be idempotent', () => {
    fc.assert(
      fc.property(
        fc.integer({min: -1e3, max: 1e3 }), 
        (a) => { return add(a, 0) === a && a === add(0, a); }
      ),
      {
        numRuns: 1000,
        verbose: false,
      }
    );
  })
});
