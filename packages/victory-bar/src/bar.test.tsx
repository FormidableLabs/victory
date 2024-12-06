import React from "react";
import { render } from "@testing-library/react";
import * as d3Scale from "d3-scale";
import { VictoryContainer } from "victory-core";

import { getBarShape } from "../../../test/helpers";
import { Bar } from "./bar";

describe("victory-primitives/bar", () => {
  const baseProps = {
    data: [
      { _x: 2, x: 2, _y: 4, y: 4, eventKey: 0 },
      { _x: 3, x: 3, _y: 5, y: 5, eventKey: 1 },
    ],
    datum: { _x: 2, x: 2, _y: 4, y: 4, eventKey: 0 },
    x: 2,
    x0: 0,
    y: 10,
    y0: 0,
    scale: {
      x: d3Scale.scaleLinear(),
      y: d3Scale.scaleLinear(),
    },
  };

  const renderBarSvg = (props = {}) => {
    const combinedProps = { ...baseProps, ...props };
    const { container } = render(
      <VictoryContainer>
        <Bar {...combinedProps} />
      </VictoryContainer>,
    );
    return container.querySelector("path");
  };

  it("should render a vertical bar", () => {
    const bar = renderBarSvg();
    const barShape = getBarShape(bar);
    expect(Math.round(barShape.height)).toEqual(10);
  });

  it("should render a horizontal bar", () => {
    const props = { horizontal: true };

    const bar = renderBarSvg(props);
    const barShape = getBarShape(bar);

    expect(Math.round(barShape.width)).toEqual(2);
  });

  it("should render a default bar width when one is not provided", () => {
    const props = {
      width: 10,
      padding: 1,
      data: Array(4),
    };

    const bar = renderBarSvg(props);
    const barShape = getBarShape(bar);

    expect(Math.floor(barShape.width)).toEqual(2);
  });

  it("should allow override of width by passing a style", () => {
    const props = { style: { width: 3 } };

    const bar = renderBarSvg(props);
    const barShape = getBarShape(bar);

    expect(Math.floor(barShape.width)).toEqual(3);
  });

  it("should allow modification of width by passing barRatio", () => {
    const props = {
      data: [{ _x: 2, x: 2, _y: 4, y: 4, eventKey: 0 }],
      barRatio: 3,
    };

    const bar = renderBarSvg(props);
    const barShape = getBarShape(bar);

    expect(Math.floor(barShape.width)).toEqual(24);
  });
});
