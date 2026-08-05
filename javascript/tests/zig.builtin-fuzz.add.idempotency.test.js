import { execFileSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

describe('zig add(a, b)', () => {
  it('must pass Zig builtin fuzzing for identity', () => {
    if (process.platform === 'win32') {
      console.log('Skipping Zig builtin fuzzing on Windows: zig --fuzz is not implemented there yet.');
      expect(true).toBe(true);
      return;
    }

    expect(() => {
      execFileSync('zig', ['build', 'test', '--fuzz=100'], {
        cwd: '..',
        encoding: 'utf8',
        stdio: 'pipe',
      });
    }).not.toThrow();
  });
});
