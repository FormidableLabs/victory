import React from "react";
import { render } from "@testing-library/react";
import { VictoryContainer } from "victory-core";
import * as d3Scale from "d3-scale";

import { Area } from "./area";

describe("victory-primitives/area", () => {
  const baseProps = {
    data: [
      { _x1: 1, x1: 1, _y1: 4, y1: 4, _y0: 0, eventKey: 0 },
      { _x1: 2, x1: 2, _y1: 5, y1: 5, _y0: 0, eventKey: 1 },
      { _x1: 3, x1: 3, _y1: 7, y1: 7, _y0: 0, eventKey: 2 },
      { _x1: 4, x1: 4, _y1: 10, y1: 10, _y0: 0, eventKey: 3 },
      { _x1: 5, x1: 5, _y1: 15, y1: 15, _y0: 0, eventKey: 4 },
    ],
    scale: {
      x: d3Scale.scaleLinear(),
      y: d3Scale.scaleLinear(),
    },
    interpolation: "basis",
    style: {
      stroke: "tomato",
    },
  };

  it("should render a single area and no line when no line style is given", () => {
    const props = Object.assign({}, baseProps, {
      style: {
        stroke: "none",
      },
    });

    const { container } = render(
      <VictoryContainer>
        <Area {...props} />
      </VictoryContainer>,
    );
    expect(container.querySelectorAll("path")).toHaveLength(1);
  });

  it("should render an area and line when a line style is given", () => {
    const { container } = render(
      <VictoryContainer>
        <Area {...baseProps} />
      </VictoryContainer>,
    );
    // multiple paths should be grouped
    expect(container.querySelectorAll("path")).toHaveLength(2);
  });
});
