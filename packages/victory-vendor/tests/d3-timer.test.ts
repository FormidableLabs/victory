/*
 * This test verifies that these modules and types are exported correctly
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  now,
  Timer,
  timer,
  timerFlush,
  timeout,
  interval,
} from "victory-vendor/d3-timer";

describe("d3-timer", () => {
  it("exports valid functions", () => {
    expect(timer).toBeInstanceOf(Function);
    expect(now).toBeInstanceOf(Function);
  });
});
