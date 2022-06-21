import React from "react";
import { Line } from "victory-core";
import { render } from "@testing-library/react";

describe("victory-primitives/line", () => {
  const baseProps = {
    x1: 0,
    y1: 1,
    x2: 2,
    y2: 4,
  };

  it("should render a line element with the correct coordinates", () => {
    // @ts-expect-error "baseProps has no properties in common with VictoryPrimitiveShapeProps"
    const { container } = render(<Line {...baseProps} />, { wrapper: "svg" });
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
