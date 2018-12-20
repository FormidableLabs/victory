import React from "react";
import { shallow } from "enzyme";
import ErrorBar from "packages/victory-errorbar/src/error-bar";
import { Line } from "packages/victory-core";
import { forEach, merge, omit } from "lodash";

describe("victory-primitives/error-bar", () => {
  const baseProps = {
    x: 4,
    y: 5,
    errorX: [1, 3],
    errorY: [0.2, 2],
    scale: {
      x: { range: () => [-10, 10] },
      y: { range: () => [10, -10] }
    },
    borderWidth: 20
  };

  const compareLineCoordinates = (line, coordinates) => {
    forEach(coordinates, (coordinateValue, coordinateName) => {
      const props = line.props();
      expect(props[coordinateName]).to.eql(parseFloat(coordinateValue, 10));
    });
  };

  it("should render eight lines", () => {
    const wrapper = shallow(<ErrorBar {...baseProps} />);
    const lines = wrapper.find("g").find(Line);

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
      { x1: 4, x2: 4, y1: 5, y2: 2 }
    ];

    expect(lines.length).to.eql(8);
    lines.forEach((line, i) => {
      compareLineCoordinates(line, expectedCoordinates[i]);
    });
  });

  it("should render four lines when only x error type is supplied", () => {
    const xErrorProps = omit(baseProps, ["errorY"]);

    const wrapper = shallow(<ErrorBar {...xErrorProps} />);
    const lines = wrapper.find("g").find(Line);

    const expectedCoordinates = [
      // Right Border (positiveErrorX, positiveErrorX, y - borderWidth, y + borderWidth)
      { x1: 1, x2: 1, y1: -15, y2: 25 },
      // Left Border(negativeErrorX, negativeErrorX, y - borderWidth, y + borderWidth)
      { x1: 3, x2: 3, y1: -15, y2: 25 },
      // Right Cross(x, positiveErrorX, y, y)
      { x1: 4, x2: 1, y1: 5, y2: 5 },
      // Left Cross(x, negativeErrorX, y, y)
      { x1: 4, x2: 3, y1: 5, y2: 5 }
    ];

    expect(lines.length).to.eql(4);
    lines.forEach((line, i) => {
      compareLineCoordinates(line, expectedCoordinates[i]);
    });
  });

  it("should render four lines when only y error type is supplied", () => {
    const yErrorProps = omit(baseProps, ["errorX"]);

    const wrapper = shallow(<ErrorBar {...yErrorProps} />);
    const lines = wrapper.find("g").find(Line);

    const expectedCoordinates = [
      // Bottom Border(x - borderWidth, x + borderWidth, negativeErrorY, negativeErrorY)
      { x1: -16, x2: 24, y1: 0.2, y2: 0.2 },
      // Top Border(x - borderWidth, x + borderWidth, positiveErrorY, positiveErrorY)
      { x1: -16, x2: 24, y1: 2, y2: 2 },
      // Bottom Cross(x, x, y, negativeErrorY)
      { x1: 4, x2: 4, y1: 5, y2: 0.2 },
      // Bottom Cross(x, x, y, positiveErrorY)
      { x1: 4, x2: 4, y1: 5, y2: 2 }
    ];

    expect(lines.length).to.eql(4);
    lines.forEach((line, i) => {
      compareLineCoordinates(line, expectedCoordinates[i]);
    });
  });

  it("should constrain errors within range", () => {
    const props = merge({}, baseProps, {
      scale: {
        x: { range: () => [100, -100] },
        y: { range: () => [-100, 100] }
      }
    });
    const wrapper = shallow(<ErrorBar {...props} />);
    const lines = wrapper.find("g").find(Line);

    const expectedCoordinates = [
      // Right Border (positiveErrorX, positiveErrorX, y - borderWidth, y + borderWidth)
      { x1: -100, x2: -100, y1: -15, y2: 25 },
      // Left Border(negativeErrorX, negativeErrorX, y - borderWidth, y + borderWidth)
      { x1: 100, x2: 100, y1: -15, y2: 25 },
      // Bottom Border(x - borderWidth, x + borderWidth, negativeErrorY, negativeErrorY)
      { x1: -16, x2: 24, y1: 100, y2: 100 },
      // Top Border(x - borderWidth, x + borderWidth, positiveErrorY, positiveErrorY)
      { x1: -16, x2: 24, y1: -100, y2: -100 },
      // Right Cross(x, positiveErrorX, y, y)
      { x1: 4, x2: -100, y1: 5, y2: 5 },
      // Left Cross(x, negativeErrorX, y, y)
      { x1: 4, x2: 100, y1: 5, y2: 5 },
      // Bottom Cross(x, x, y, negativeErrorY)
      { x1: 4, x2: 4, y1: 5, y2: 100 },
      // Bottom Cross(x, x, y, positiveErrorY)
      { x1: 4, x2: 4, y1: 5, y2: -100 }
    ];

    expect(lines.length).to.eql(8);
    lines.forEach((line, i) => {
      compareLineCoordinates(line, expectedCoordinates[i]);
    });
  });
});
