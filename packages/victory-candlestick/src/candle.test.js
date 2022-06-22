import React from "react";
import { render } from "@testing-library/react";
import { Candle } from "victory-candlestick";
import { VictoryContainer } from "victory-core";
import * as d3Scale from "victory-vendor/d3-scale";

describe("victory-primitives/candle", () => {
  const baseProps = {
    data: [
      { x: 1, open: 10, close: 30, high: 50, low: 5, eventKey: 0 },
      { x: 2, open: 40, close: 80, high: 100, low: 10, eventKey: 1 },
    ],
    datum: { x: 1, open: 10, close: 30, high: 50, low: 5, eventKey: 0 },
    scale: {
      x: d3Scale.scaleLinear(),
      y: d3Scale.scaleLinear(),
    },
    candleWidth: 2,
    x: 5,
    high: 50,
    low: 5,
    close: 30,
    open: 10,
  };

  const renderCandle = (props = {}) =>
    render(
      <VictoryContainer>
        <Candle {...baseProps} {...props} />
      </VictoryContainer>,
    );

  it("should render a wick line", () => {
    const { container } = renderCandle();
    const wicks = container.querySelectorAll("line");
    const values = [
      {
        x1: 5,
        x2: 5,
        y1: 50,
        y2: 10,
      },
      {
        x1: 5,
        x2: 5,
        y1: 30,
        y2: 5,
      },
    ];

    wicks.forEach((wick, i) => {
      const [x1, x2, y1, y2] = ["x1", "x2", "y1", "y2"].map((prop) =>
        parseInt(wick.getAttribute(prop)),
      );
      expect(values[i]).toMatchObject({ x1, x2, y1, y2 });
    });
  });

  it("should render a candle rectangle", () => {
    const { container } = renderCandle();
    const rect = container.querySelector("rect");
    const [width, height, x, y] = ["width", "height", "x", "y"].map((prop) =>
      rect.getAttribute(prop),
    );

    // width = style.width || 0.5 * (width - 2 * padding) / data.length;

    expect(width).toEqual("2");
    expect(height).toEqual("20");
    // x = x - width / 2
    expect(x).toEqual("4");
    expect(y).toEqual("10");
  });
});
