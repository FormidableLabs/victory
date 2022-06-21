/*
 * This test verifies that these modules and types are exported correctly
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  interpolate,
  NumberArray,
} from "victory-vendor/d3-interpolate";

describe("d3-interpolate", () => {
  it("exports valid functions", () => {
    expect(interpolate).toBeInstanceOf(Function);
  });
});
