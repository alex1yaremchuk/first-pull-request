import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { beforeAll, describe, it } from 'vitest';
import fc from './utils/configure-fast-check.js';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '../..');
const source = join(repoRoot, 'nim/src/calculator.nim');
const outDir = join(repoRoot, 'nim/bin');
const executable = join(outDir, process.platform === 'win32' ? 'calculator.exe' : 'calculator');

function nimAdd(a, b) {
  return Number(execFileSync(executable, [String(a), String(b)], { encoding: 'utf8' }));
}

describe('nim add(a, b)', () => {
  beforeAll(() => {
    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
    execFileSync(
      'nim',
      ['c', '--hints:off', '--warnings:off', `--out:${executable}`, source],
      { stdio: 'inherit' }
    );
  }, 60000);

  it('must be idempotent', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: -1e3, max: 1e3 }),
        (a) => nimAdd(a, 0) === a && a === nimAdd(0, a)
      ),
      {
        numRuns: 100,
        verbose: false,
      }
    );
  }, 20000);
});
