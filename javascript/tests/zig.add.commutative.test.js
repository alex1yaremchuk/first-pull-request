import fc from 'fast-check';
import fs from 'fs/promises';
import { describe, it, expect } from 'vitest';


const config = {
  env: {
    memoryBase: 0,
    tableBase: 0,
    memory: new WebAssembly.Memory({
      initial: 2,
      maximum: 2,
    }),
    table: new WebAssembly.Table({
      initial: 0,
      element: 'anyfunc',
    }),
  }
}; 

const wasmModule = await WebAssembly.instantiate(
  await fs.readFile('../zig-out/bin/index.wasm'),
  config,
);

const { add } = wasmModule.instance.exports;


describe('add(a, b)', () => {
  it('must be commutative', () => {
    fc.assert(
      fc.property(
        fc.integer({min: -1e6, max: 1e6 }), 
        fc.integer({ min: -1e6, max: 1e6 }), 
        (a, b) => { return add(a, b) === add(b, a); }
      ),
      {
        numRuns: 1000,
        verbose: false,
      }
    );
  })
});
