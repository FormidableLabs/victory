import { describe, it, expect } from "vitest";

import { roundPathString } from "./round-path-string";

describe("roundPathString", () => {
  it("normalizes floating point precision differences", () => {
    expect(roundPathString("M60,240L252.50000000000003,67.2")).toBe(
      "M60,240L252.5,67.2",
    );
  });

  it("leaves integer coordinates untouched", () => {
    expect(roundPathString("M0,0L100,200Z")).toBe("M0,0L100,200Z");
  });

  it("rounds to 3 decimals by default", () => {
    expect(roundPathString("M1.123456,2.987654")).toBe("M1.123,2.988");
  });

  it("honors a custom precision", () => {
    expect(roundPathString("M1.123456,2.987654", 1)).toBe("M1.1,3");
  });

  it("handles negative numbers and scientific notation", () => {
    // -1.5e2 = -150 -> rounds to -150 (integer, untouched); 3.14159265 -> 3.142
    expect(roundPathString("M-1.5e2,0L3.14159265,0")).toBe("M-150,0L3.142,0");
  });
});
