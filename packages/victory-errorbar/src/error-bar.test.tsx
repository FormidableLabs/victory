import { render } from "@testing-library/react";
import forEach from "lodash/forEach";
import omit from "lodash/omit";
import React from "react";
import * as d3Scale from "victory-vendor/d3-scale";

import { ErrorBar } from "./error-bar";

describe("victory-primitives/error-bar", () => {
  const baseProps = {
    x: 4,
    y: 5,
    errorX: [1, 3],
    errorY: [0.2, 2],
    scale: {
      x: d3Scale.scaleLinear(),
      y: d3Scale.scaleLinear(),
    },
    borderWidth: 20,
  };

  const compareLineCoordinates = (line, coordinates) => {
    forEach(coordinates, (coordinateValue, coordinateName) => {
      expect(parseFloat(line.getAttribute(coordinateName))).toEqual(
        parseFloat(coordinateValue),
      );
    });
  };

  it("should render eight lines", () => {
    const { container } = render(<ErrorBar {...baseProps} />, {
      wrapper: "svg" as any,
    });
    const lines = container.querySelectorAll("line");

    const expectedCoordinates = [
      // Right Border (positiveErrorX, positiveErrorX, y - borderWidth, y + borderWidth)
      { x1: 1, x2: 1, y1: -15, y2: 25 },
      // Left Border(negativeErrorX, negativeErrorX, y - borderWidth, y + borderWidth)
      { x1: 3, x2: 3, y1: -15, y2: 25 },
      // Bottom Border(x - borderWidth, x + borderWidth, negativeErrorY, negativeErrorY)
      { x1: -16, x2: 24, y1: 0.2, y2: 0.2 },
      // Top Border(x - borderWidth, x + borderWidth, positiveErrorY, positiveErrorY)
      { x1: -16, x2: 24, y1: 2, y2: 2 },
      // Right Cross(x, positiveErrorX, y, y)
      { x1: 4, x2: 1, y1: 5, y2: 5 },
      // Left Cross(x, negativeErrorX, y, y)
      { x1: 4, x2: 3, y1: 5, y2: 5 },
      // Bottom Cross(x, x, y, negativeErrorY)
      { x1: 4, x2: 4, y1: 5, y2: 0.2 },
      // Bottom Cross(x, x, y, positiveErrorY)
      { x1: 4, x2: 4, y1: 5, y2: 2 },
    ];

    expect(lines).toHaveLength(8);
    lines.forEach((line, i) => {
      compareLineCoordinates(line, expectedCoordinates[i]);
    });
  });

  it("should render four lines when only x error type is supplied", () => {
    const xErrorProps = omit(baseProps, ["errorY"]);

    const { container } = render(<ErrorBar {...xErrorProps} />, {
      wrapper: "svg" as any,
    });
    const lines = container.querySelectorAll("line");

    const expectedCoordinates = [
      // Right Border (positiveErrorX, positiveErrorX, y - borderWidth, y + borderWidth)
      { x1: 1, x2: 1, y1: -15, y2: 25 },
      // Left Border(negativeErrorX, negativeErrorX, y - borderWidth, y + borderWidth)
      { x1: 3, x2: 3, y1: -15, y2: 25 },
      // Right Cross(x, positiveErrorX, y, y)
      { x1: 4, x2: 1, y1: 5, y2: 5 },
      // Left Cross(x, negativeErrorX, y, y)
      { x1: 4, x2: 3, y1: 5, y2: 5 },
    ];

    expect(lines.length).toEqual(4);
    lines.forEach((line, i) => {
      compareLineCoordinates(line, expectedCoordinates[i]);
    });
  });

  it("should render four lines when only y error type is supplied", () => {
    const yErrorProps = omit(baseProps, ["errorX"]);

    const { container } = render(<ErrorBar {...yErrorProps} />, {
      wrapper: "svg" as any,
    });
    const lines = container.querySelectorAll("line");

    const expectedCoordinates = [
      // Bottom Border(x - borderWidth, x + borderWidth, negativeErrorY, negativeErrorY)
      { x1: -16, x2: 24, y1: 0.2, y2: 0.2 },
      // Top Border(x - borderWidth, x + borderWidth, positiveErrorY, positiveErrorY)
      { x1: -16, x2: 24, y1: 2, y2: 2 },
      // Bottom Cross(x, x, y, negativeErrorY)
      { x1: 4, x2: 4, y1: 5, y2: 0.2 },
      // Bottom Cross(x, x, y, positiveErrorY)
      { x1: 4, x2: 4, y1: 5, y2: 2 },
    ];

    expect(lines.length).toEqual(4);
    lines.forEach((line, i) => {
      compareLineCoordinates(line, expectedCoordinates[i]);
    });
  });
});
