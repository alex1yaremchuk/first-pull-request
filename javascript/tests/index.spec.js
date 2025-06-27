import { describe, it, expect } from "vitest";
import { add, sub, mul, div, absVal, pow, sqrt, mod } from "../src/index.js";

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe("property based math", () => {
  it("add behaves like +", () => {
    for (let i = 0; i < 100; i++) {
      const a = randInt(-200000, 200000);
      const b = randInt(-200000, 200000);
      expect(add(a, b)).toBe(a + b);
    }
  });

  it("sub behaves like -", () => {
    for (let i = 0; i < 100; i++) {
      const a = randInt(-1000, 1000);
      const b = randInt(-1000, 1000);
      expect(sub(a, b)).toBe(a - b);
    }
  });

  it("mul behaves like *", () => {
    for (let i = 0; i < 100; i++) {
      const a = randInt(-1000, 1000);
      const b = randInt(-1000, 1000);
      expect(mul(a, b)).toBe(a * b);
    }
  });

  it("div behaves like /", () => {
    for (let i = 0; i < 100; i++) {
      const a = randInt(-1000, 1000);
      let b = randInt(-1000, 1000);
      if (b === 0) b = 1;
      expect(div(a, b)).toBe(a / b);
    }
  });

  it("abs behaves like Math.abs", () => {
    for (let i = 0; i < 100; i++) {
      const a = randInt(-1000, 1000);
      expect(absVal(a)).toBe(Math.abs(a));
    }
  });

  it("pow behaves like **", () => {
    for (let i = 0; i < 50; i++) {
      const a = randInt(-5, 5);
      const b = randInt(0, 5);
      expect(pow(a, b)).toBe(a ** b);
    }
  });

  it("sqrt behaves like Math.sqrt", () => {
    for (let i = 0; i < 50; i++) {
      const a = randInt(0, 1000);
      expect(sqrt(a)).toBeCloseTo(Math.sqrt(a));
    }
  });

  it("mod behaves like %", () => {
    for (let i = 0; i < 100; i++) {
      const a = randInt(-1000, 1000);
      let b = randInt(-1000, 1000);
      if (b === 0) b = 1;
      expect(mod(a, b)).toBe(a % b);
    }
  });
});
