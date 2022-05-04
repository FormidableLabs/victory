/*eslint-disable max-nested-callbacks */

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { range } from "lodash";
import { VictoryBar, Bar } from "victory-bar";
import { svgExpectations, getShapeUtils } from "../../svg-test-helper";

describe("components/victory-bar", () => {
  describe("default component rendering", () => {
    it("accepts user props", () => {
      const { container } = render(
        <VictoryBar data-testid="victory-bar" aria-label="Chart" />
      );

      const svgNode = container.querySelector("svg");
      expect(svgNode.getAttribute("data-testid")).toEqual("victory-bar");
      expect(svgNode.getAttribute("aria-label")).toEqual("Chart");
    });

    it("renders an svg with the correct width and height", () => {
      const { container } = render(<VictoryBar />);
      const svg = container.querySelector("svg");
      expect(svg.getAttribute("style")).toContain("width: 100%; height: 100%");
    });

    it("renders an svg with the correct viewBox", () => {
      const { container } = render(<VictoryBar />);
      const svg = container.querySelector("svg");
      const viewBoxValue = `0 0 ${450} ${300}`;
      expect(svg.getAttribute("viewBox")).toEqual(viewBoxValue);
    });

    it("renders 4 bars", () => {
      const { container } = render(<VictoryBar />);
      const bars = container.querySelectorAll("path");
      expect(bars.length).toEqual(4);
    });

    it("renders each bar as a rectangle", () => {
      const { container } = render(<VictoryBar />);
      const barCommandStrings = Array.from(
        container.querySelectorAll("path")
      ).map((bar) => bar.getAttribute("d"));
      barCommandStrings.forEach(svgExpectations.expectIsRectangular);
    });
  });

  describe("rendering data", () => {
    it("renders bars for {x, y} shaped data (default)", () => {
      const data = range(10).map((i) => ({ x: i, y: i }));
      const { container } = render(<VictoryBar data={data} />);
      const bars = container.querySelectorAll("path");
      expect(bars.length).toEqual(10);
    });

    it("renders ordered bars when sortKey is passed", () => {
      const data = range(5)
        .map((i) => ({ x: i, y: i }))
        .reverse();
      const { container } = render(<VictoryBar data={data} sortKey="x" />);
      const barHeight = Array.from(container.querySelectorAll("path")).map(
        (bar) => {
          const commandString = bar.getAttribute("d");
          return getShapeUtils.getBarHeight(commandString);
        }
      );

      const ascendingBars = [...barHeight].sort((a, b) => a - b);

      expect(barHeight).toEqual(ascendingBars);
    });

    it("renders reverse ordered bars when sortOrder is descending", () => {
      const data = range(5)
        .map((i) => ({ x: i, y: i }))
        .reverse();
      const { container } = render(
        <VictoryBar data={data} sortKey="x" sortOrder="descending" />
      );
      const barHeight = Array.from(container.querySelectorAll("path")).map(
        (bar) => {
          const commandString = bar.getAttribute("d");
          return getShapeUtils.getBarHeight(commandString);
        }
      );
      const descendingBars = [...barHeight].sort((a, b) => b - a);

      expect(barHeight).toEqual(descendingBars);
    });

    it("renders bars for array-shaped data", () => {
      const data = range(20).map((i) => [i, i]);
      const { container } = render(<VictoryBar data={data} x={0} y={1} />);
      const bars = container.querySelectorAll("path");
      expect(bars).toHaveLength(20);
    });

    it("renders bars for deeply-nested data", () => {
      const data = range(40).map((i) => ({ a: { b: [{ x: i, y: i }] } }));
      const { container } = render(
        <VictoryBar data={data} x="a.b[0].x" y="a.b[0].y" />
      );
      const bars = container.querySelectorAll("path");
      expect(bars).toHaveLength(40);
    });

    it("renders bars values with null accessor", () => {
      const data = range(30);
      const { container } = render(
        <VictoryBar data={data} x={null} y={null} />
      );
      const bars = container.querySelectorAll("path");
      expect(bars).toHaveLength(30);
    });

    it("renders bars with appropriate relative heights", () => {
      const { container } = render(
        <VictoryBar
          data={[
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 3 }
          ]}
        />
      );
      const bars = Array.from(container.querySelectorAll("path"));
      const heights = bars.map((bar) => {
        const commandString = bar.getAttribute("d");
        return getShapeUtils.getBarHeight(commandString);
      });

      expect(Math.trunc(heights[1] / 2)).toEqual(Math.trunc(heights[0], 0.5));
      expect(((heights[2] / 3) * 2).toFixed(3)).toEqual(heights[1].toFixed(3));
    });

    it("does not render data with null x or y values", () => {
      const data = [
        { x: 1, y: 2 },
        { x: null, y: 4 },
        { x: 5, y: null }
      ];
      const { container } = render(<VictoryBar data={data} />);
      expect(container.querySelectorAll("path")).toHaveLength(1);
    });
  });

  describe("event handling", () => {
    const clickHandler = jest.fn();

    beforeEach(() => {
      clickHandler.mockReset();
    });

    it("attaches an event to the parent svg", () => {
      const { container } = render(
        <VictoryBar
          events={[
            {
              target: "parent",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
        />
      );
      const bar = container.querySelector("path");
      fireEvent.click(bar);

      expect(clickHandler).toHaveBeenCalled();
    });

    it("attaches an event to data", () => {
      const data = [
        { x: 0, y: 0, label: "0" },
        { x: 1, y: 1, label: "1" },
        { x: 2, y: 2, label: "2" }
      ];
      const { container } = render(
        <VictoryBar
          data={data}
          events={[
            {
              target: "data",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
        />
      );
      const bars = container.querySelectorAll("path");
      bars.forEach((bar, index) => {
        clickHandler.mockReset();
        fireEvent.click(bar);
        expect(clickHandler).toHaveBeenCalled();

        const barContext = clickHandler.mock.calls[0][1];
        expect(barContext.datum.x).toEqual(data[index].x);
      });
    });

    it("attaches an event to a label", () => {
      const data = [
        { x: 0, y: 0, label: "label 0" },
        { x: 1, y: 1, label: "label 1" },
        { x: 2, y: 2, label: "label 2" }
      ];

      render(
        <VictoryBar
          data={data}
          labels={({ datum }) => datum.label}
          events={[
            {
              target: "labels",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
        />
      );
      const label = screen.getByText("label 1");

      fireEvent.click(label);

      expect(clickHandler).toHaveBeenCalled();
    });
  });

  describe("accessibility", () => {
    it("adds an aria role to each bar in the series", () => {
      const data = range(20).map((y, x) => ({ x, y }));
      const { container } = render(<VictoryBar data={data} />);

      Array.from(container.querySelectorAll("path")).forEach((bar) => {
        expect(bar.getAttribute("role")).toEqual("presentation");
      });
    });

    it("applies aria-label and tabIndex to the Bar primitive", () => {
      const data = range(5, 11).map((y, x) => ({ y, x }));
      const { container } = render(
        <VictoryBar
          data={data}
          dataComponent={
            <Bar
              ariaLabel={({ datum }) => `x: ${datum.x}`}
              tabIndex={({ index }) => index + 1}
            />
          }
        />
      );

      Array.from(container.querySelectorAll("path")).forEach((bar, index) => {
        expect(parseInt(bar.getAttribute("tabindex"))).toEqual(index + 1);
        expect(bar.getAttribute("aria-label")).toEqual(`x: ${data[index].x}`);
      });
    });
  });
});
