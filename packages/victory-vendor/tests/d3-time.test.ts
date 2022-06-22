/*
 * This test verifies that these modules and types are exported correctly
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  CountableTimeInterval,
  TimeInterval,
  timeDay,
  timeInterval,
} from "victory-vendor/d3-time";

describe("d3-time", () => {
  it("exports valid functions", () => {
    expect(timeDay).toBeInstanceOf(Function);
    expect(timeInterval).toBeInstanceOf(Function);
  });
});
