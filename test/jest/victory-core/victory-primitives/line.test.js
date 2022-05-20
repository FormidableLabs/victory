import React from "react";
import { Line } from "victory-core";
import { renderInSvg } from "../../rendering-utils";

describe("victory-primitives/line", () => {
  const baseProps = {
    x1: 0,
    y1: 1,
    x2: 2,
    y2: 4
  };

  it("should render a line element with the correct coordinates", () => {
    const { container } = renderInSvg(<Line {...baseProps} />);
    expect(container.querySelector("line")).toMatchInlineSnapshot(`
      <line
        vector-effect="non-scaling-stroke"
        x1="0"
        x2="2"
        y1="1"
        y2="4"
      />
    `);
  });
});
