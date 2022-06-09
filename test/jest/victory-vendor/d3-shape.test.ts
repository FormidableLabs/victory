/*
 * This test verifies that these modules and types are exported correctly
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  Arc,
  Area,
  arc,
  area
} from "victory-vendor/d3-shape";

describe("d3-shape", () => {
  it("exports valid functions", () => {
    expect(arc).toBeInstanceOf(Function);
    expect(area).toBeInstanceOf(Function);
  });
});
