/*eslint-disable max-nested-callbacks */
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { range } from "lodash";
import React from "react";
import { Candle, VictoryCandlestick } from "victory-candlestick";
import { VictoryChart } from "victory-chart";

const MyCandle = () => <div data-testid="my-candle" />;

const dataSet = [
  { x: 5, open: 10, close: 20, high: 25, low: 5 },
  { x: 1, open: 80, close: 40, high: 120, low: 10, label: "1" }
];

describe("components/victory-candlestick", () => {
  describe("default component rendering", () => {
    it("attaches safe user props to the container component", () => {
      render(
        <VictoryCandlestick
          data-testid="victory-candlestick"
          aria-label="Chart"
          unsafe-prop="test"
        />
      );

      const container = screen.getByTestId("victory-candlestick");
      expect(screen.getByLabelText("Chart")).toBeDefined();
      expect(container).not.toHaveAttribute("unsafe-prop");
      expect(container.nodeName).toEqual("svg");
    });

    it("attaches safe user props to the group component if the component is rendered inside a VictoryChart", () => {
      render(
        <VictoryCandlestick
          data-testid="victory-candlestick"
          aria-label="Chart"
          unsafe-prop="test"
        />,
        { wrapper: VictoryChart }
      );

      const container = screen.getByTestId("victory-candlestick");
      expect(screen.getByLabelText("Chart")).toBeDefined();
      expect(container).not.toHaveAttribute("unsafe-prop");
      expect(container.nodeName).toEqual("g");
    });

    it("renders an svg with the correct width and height", () => {
      const { container } = render(<VictoryCandlestick data={dataSet} />);
      const svg = container.querySelector("svg");
      expect(svg.getAttribute("style")).toContain("width: 100%; height: 100%");
    });

    it("renders an svg with the correct viewBox", () => {
      const { container } = render(<VictoryCandlestick data={dataSet} />);
      const svg = container.querySelector("svg");
      const viewBoxValue = `0 0 ${450} ${300}`;
      expect(svg.getAttribute("viewBox")).toEqual(viewBoxValue);
    });

    it("renders 8 points", () => {
      const { container } = render(<VictoryCandlestick />);
      const points = container.querySelectorAll("rect");
      expect(points).toHaveLength(8);
    });
  });

  describe("rendering data", () => {
    it("renders injected points for {x, y} shaped data (default)", () => {
      const data = range(5).map((i) => ({
        x: i,
        open: i,
        close: i,
        high: i,
        low: i
      }));
      render(<VictoryCandlestick data={data} dataComponent={<MyCandle />} />);

      const points = screen.getAllByTestId("my-candle");
      expect(points).toHaveLength(5);
    });

    it("renders points for {x, y} shaped data (default)", () => {
      const data = range(5).map((i) => ({
        x: i,
        open: i,
        close: i,
        high: i,
        low: i
      }));
      const { container } = render(<VictoryCandlestick data={data} />);
      const points = container.querySelectorAll("rect");
      expect(points).toHaveLength(5);
    });

    it("renders ordered bars when sortKey is passed", () => {
      const data = range(5)
        .map((i) => ({ x: i, open: i, close: i, high: i, low: i }))
        .reverse();
      const { container } = render(
        <VictoryCandlestick data={data} sortKey="x" />
      );
      const candles = container.querySelectorAll("rect");
      const xValues = Array.from(candles).map((bar) => bar.getAttribute("x"));
      const xValuesAscending = [...xValues].sort((a, b) => a - b);
      expect(xValues).toEqual(xValuesAscending);
    });

    it("renders reverse ordered bars when sortOrder is descending", () => {
      const data = range(5)
        .map((i) => ({ x: i, open: i, close: i, high: i, low: i }))
        .reverse();
      const { container } = render(
        <VictoryCandlestick data={data} sortKey="x" sortOrder="descending" />
      );
      const candles = container.querySelectorAll("rect");
      const xValues = Array.from(candles).map((bar) => bar.getAttribute("x"));
      const xValuesDescending = [...xValues].sort((a, b) => b - a);
      expect(xValues).toEqual(xValuesDescending);
    });

    it("renders points for array-shaped data", () => {
      const data = range(10).map((i) => [i, i, i, i, i]);
      const { container } = render(
        <VictoryCandlestick
          data={data}
          x={0}
          open={1}
          close={2}
          high={3}
          low={4}
        />
      );
      const points = container.querySelectorAll("rect");
      expect(points).toHaveLength(10);
    });

    it("renders points for deeply-nested data", () => {
      const data = range(20).map((i) => ({
        a: { b: [{ x: i, open: i, close: i, high: i, low: i }] }
      }));
      const { container } = render(
        <VictoryCandlestick
          data={data}
          x="a.b[0].x"
          open="a.b[0].open"
          close="a.b[0].close"
          high="a.b[0].high"
          low="a.b[0].low"
        />
      );
      const points = container.querySelectorAll("rect");
      expect(points).toHaveLength(20);
    });

    it("renders data values with null accessor", () => {
      const data = range(10);
      const { container } = render(
        <VictoryCandlestick
          data={data}
          x={null}
          open={null}
          close={null}
          high={null}
          low={null}
        />
      );
      const points = container.querySelectorAll("rect");
      expect(points).toHaveLength(10);
    });

    it("does not render data with null x, open, close, high, or low values", () => {
      const data = [
        { x: 1, open: 10, close: 17, high: 19, low: 8 },
        { x: null, open: 17, close: 17, high: 17, low: 17 },
        { x: 2, open: null, close: 17, high: 17, low: 17 },
        { x: 3, open: 17, close: null, high: 17, low: 17 },
        { x: 4, open: 17, close: 17, high: null, low: 17 },
        { x: 5, open: 17, close: 17, high: 17, low: null }
      ];
      const { container } = render(<VictoryCandlestick data={data} />);
      const points = container.querySelectorAll("rect");
      expect(points).toHaveLength(1);
    });
  });

  describe("event handling", () => {
    const clickHandler = jest.fn();

    beforeEach(() => {
      clickHandler.mockReset();
    });

    it("attaches an event to data", () => {
      const { container } = render(
        <VictoryCandlestick
          data={dataSet}
          events={[
            {
              target: "data",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
        />
      );

      const data = container.querySelectorAll("rect");

      data.forEach((node, index) => {
        clickHandler.mockReset();
        fireEvent.click(node);
        const { key } = clickHandler.mock.calls[0][1];
        expect(key).toEqual(`candlestick-data-${index}`);
      });
    });
  });

  describe("accessibility", () => {
    it("adds an aria role to each point in the series", () => {
      const data = [
        { x: 0, open: 9, close: 30, high: 56, low: 7 },
        { x: 1, open: 80, close: 40, high: 120, low: 10 },
        { x: 2, open: 50, close: 80, high: 90, low: 20 }
      ];
      render(<VictoryCandlestick data={data} />);

      const presentationElements = screen.getAllByRole("presentation");

      // Each data point is 3 (rect and 2 lines) for 9 total, plus the container element
      expect(presentationElements).toHaveLength(10);
    });

    it("adds an aria-label and tabIndex to Candle primitive", () => {
      const data = [
        { x: new Date(2016, 6, 1), open: 20, close: 43, high: 66, low: 7 },
        { x: new Date(2016, 6, 2), open: 80, close: 40, high: 120, low: 10 },
        { x: new Date(2016, 6, 3), open: 50, close: 80, high: 90, low: 20 }
      ];
      const { container } = render(
        <VictoryCandlestick
          data={data}
          dataComponent={
            <Candle
              data-testid="candle"
              ariaLabel={({ datum }) =>
                `open ${datum.open}, close ${datum.close}`
              }
              tabIndex={({ index }) => index + 5}
            />
          }
        />
      );

      container.querySelectorAll("rect").forEach((node, index) => {
        const expectedLabel = `open ${data[index].open}, close ${data[index].close}`;
        expect(node.getAttribute("aria-label")).toEqual(expectedLabel);
        expect(node.getAttribute("tabindex")).toEqual(`${index + 5}`);
      });
    });
  });
});
