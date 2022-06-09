/*
 * This test verifies that these modules and types are exported correctly
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // @ts-expect-error Make sure invalid imports fail:
  INVALID_TYPE,
  BackEasingFactory,
  ElasticEasingFactory,
  easeBackIn,
  easeBackInOut,
  easeBackOut,
  easeBounceIn,
  easeBounceInOut,
  easeBounceOut,
  easeCircle,
  easeCircleOut,
  easeLinear
} from "victory-vendor/d3-ease";

describe("d3-ease", () => {
  it("exports valid functions", () => {
    expect(easeLinear).toBeInstanceOf(Function);
  });
});
