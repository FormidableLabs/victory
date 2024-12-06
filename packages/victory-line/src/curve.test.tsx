import React from "react";
import * as d3Scale from "d3-scale";
import { render } from "@testing-library/react";

import { SVGWrapper } from "../../../test/helpers";
import { Curve } from "./curve";

describe("victory-primitives/curve", () => {
  const baseProps = {
    data: [
      { _x1: 1, x1: 1, _y1: 4, y1: 4, eventKey: 0 },
      { _x1: 2, x1: 2, _y1: 5, y1: 5, eventKey: 1 },
      { _x1: 3, x1: 3, _y1: 7, y1: 7, eventKey: 2 },
      { _x1: 4, x1: 4, _y1: 10, y1: 10, eventKey: 3 },
      { _x1: 5, x1: 5, _y1: 15, y1: 15, eventKey: 4 },
    ],
    scale: {
      x: d3Scale.scaleLinear(),
      y: d3Scale.scaleLinear(),
    },
    interpolation: "basis",
  };

  it("should render a single curve for consecutive data", () => {
    const { container } = render(<Curve {...baseProps} />, {
      wrapper: SVGWrapper,
    });
    expect(container.querySelector("path")).toMatchInlineSnapshot(`
      <path
        d="M1,4L1.1666666666666667,4.166666666666667C1.3333333333333333,4.333333333333333,1.6666666666666667,4.666666666666667,2,5.166666666666667C2.3333333333333335,5.666666666666667,2.6666666666666665,6.333333333333333,3,7.166666666666667C3.3333333333333335,8,3.6666666666666665,9,4,10.333333333333334C4.333333333333333,11.666666666666666,4.666666666666667,13.333333333333334,4.833333333333333,14.166666666666666L5,15"
        role="presentation"
        shape-rendering="auto"
        style="fill: none; stroke: black; pointer-events: stroke;"
      />
    `);
  });
});
