import { describe, it, expect } from "vitest";
import { add } from "../src/index.js";

describe("add", () => {
  it("should return 3 for 1 and 2", () => {
    expect(add(1, 2)).toBe(3);
  });
});
