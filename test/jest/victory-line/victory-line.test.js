import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { random, range } from "lodash";
import React from "react";
import { VictoryChart } from "victory-chart";
import { Curve, VictoryLine } from "victory-line";
import { curveCatmullRom } from "victory-vendor/d3-shape";
import { calculateD3Path } from "../../svg-test-helper";

describe("components/victory-line", () => {
  describe("default component rendering", () => {
    it("attaches safe user props to the container component", () => {
      render(
        <VictoryLine
          data-testid="victory-line"
          aria-label="Chart"
          unsafe-prop="test"
        />
      );

      const container = screen.getByTestId("victory-line");
      expect(screen.getByLabelText("Chart")).toBeDefined();
      expect(container).not.toHaveAttribute("unsafe-prop");
      expect(container.nodeName).toEqual("svg");
    });

    it("attaches safe user props to the group component if the component is rendered inside a VictoryChart", () => {
      render(
        <VictoryLine
          data-testid="victory-line"
          aria-label="Chart"
          unsafe-prop="test"
        />,
        { wrapper: VictoryChart }
      );

      const container = screen.getByTestId("victory-line");
      expect(screen.getByLabelText("Chart")).toBeDefined();
      expect(container).not.toHaveAttribute("unsafe-prop");
      expect(container.tagName).toEqual("g");
    });

    it("renders an svg with the correct viewBox", () => {
      const { container } = render(<VictoryLine />);
      const viewBoxValue = `0 0 ${450} ${300}`;
      expect(container.querySelector("svg").getAttribute("viewBox")).toEqual(
        viewBoxValue
      );
    });
  });

  describe("rendering with data", () => {
    it("renders one dataComponent for the line", () => {
      const data = [
        { x: 1, y: 1 },
        { x: 2, y: 4 },
        { x: 3, y: 5 },
        { x: 4, y: 2 },
        { x: 5, y: 3 },
        { x: 6, y: 4 },
        { x: 7, y: 6 }
      ];

      render(
        <VictoryLine data={data} dataComponent={<Curve data-testid="line" />} />
      );

      expect(screen.getByTestId("line")).toBeDefined();
    });

    it("renders the correct d3Shape path", () => {
      const props = {
        interpolation: "linear",
        scale: "linear",
        padding: 50,
        width: 400,
        height: 300,
        data: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 2 }
        ]
      };

      const { container } = render(<VictoryLine {...props} />);

      expect(container.querySelector("path").getAttribute("d")).toEqual(
        calculateD3Path(props, "line", 0)
      );
    });

    it("renders the correct d3Shape path with custom interpolation string property", () => {
      const props = {
        interpolation: "catmullRom",
        scale: "linear",
        padding: 50,
        width: 400,
        height: 300,
        data: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 2 }
        ]
      };

      const { container } = render(<VictoryLine {...props} />);

      expect(container.querySelector("path").getAttribute("d")).toEqual(
        calculateD3Path(props, "line", 0)
      );
    });

    it("renders the correct d3Shape path with custom interpolation function", () => {
      const props = {
        interpolation: curveCatmullRom,
        scale: "linear",
        padding: 50,
        width: 400,
        height: 300,
        data: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 2 }
        ]
      };

      const { container } = render(<VictoryLine {...props} />);

      expect(container.querySelector("path").getAttribute("d")).toEqual(
        calculateD3Path(props, "line", 0)
      );
    });
  });

  describe("rendering with accessors", () => {
    it("renders array-type data", () => {
      const data = [
        [1, 2],
        [3, 4]
      ];
      const { container } = render(<VictoryLine data={data} />);
      const lines = container.querySelectorAll("path");
      expect(lines).toHaveLength(1);
    });

    it("renders data values with null accessor", () => {
      const data = [1, 2, 3, 4];
      const { container } = render(
        <VictoryLine data={data} x={null} y={null} />
      );
      const lines = container.querySelectorAll("path");
      expect(lines).toHaveLength(1);
    });

    it("renders deeply nested data", () => {
      const data = [
        { a: { b: [{ x: 1, y: 2 }] } },
        { a: { b: [{ x: 3, y: 4 }] } }
      ];
      const { container } = render(
        <VictoryLine data={data} x={"a.b[0].x"} y={"a.b.0.y"} />
      );
      const lines = container.querySelectorAll("path");
      expect(lines).toHaveLength(1);
    });

    it("renders data ordered by x-value, by default", () => {
      const data = [{ t: 0 /*x: 10, y: 1*/ }, { t: 1 /*x:  9, y: 1*/ }];

      const { container } = render(
        <VictoryLine
          data={data}
          x={({ t }) => 10 - t}
          y={() => 1}
          dataComponent={
            <Curve data-json={(props) => JSON.stringify(props.data)} />
          }
        />
      );

      const line = container.querySelector("path");
      const renderedData = JSON.parse(line.getAttribute("data-json"));

      expect(renderedData[0].t).toEqual(1);
      expect(renderedData[1].t).toEqual(0);
    });

    it("renders data ordered by value of sortKey, if given", () => {
      const data = [{ t: 0 /*x: 10, y: 1*/ }, { t: 1 /*x:  9, y: 1*/ }];
      const { container } = render(
        <VictoryLine
          data={data}
          sortKey="t"
          x={({ t }) => 10 - t}
          y={() => 1}
          dataComponent={
            <Curve data-json={(props) => JSON.stringify(props.data)} />
          }
        />
      );

      const line = container.querySelector("path");
      const renderedData = JSON.parse(line.getAttribute("data-json")).map(
        ({ t }) => t
      );

      expect(renderedData).toEqual([0, 1]);
    });
  });

  describe("event handling", () => {
    it("attaches an event to the parent svg", () => {
      const clickHandler = jest.fn();
      render(
        <VictoryLine
          data-testid="container"
          events={[
            {
              target: "parent",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
        />
      );
      const svg = screen.getByTestId("container");
      fireEvent.click(svg);

      expect(clickHandler).toHaveBeenCalled();
    });

    it("attaches an event to data", () => {
      const clickHandler = jest.fn();
      render(
        <VictoryLine
          dataComponent={<Curve data-testid="line" />}
          events={[
            {
              target: "data",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
        />
      );

      const line = screen.getByTestId("line");

      fireEvent.click(line);

      expect(clickHandler).toHaveBeenCalled();
    });

    it("attaches an event to a label", () => {
      const clickHandler = jest.fn();
      render(
        <VictoryLine
          data={[
            { x: 1, y: 1 },
            { x: 2, y: 2 }
          ]}
          labels={({ datum }) => datum.x}
          events={[
            {
              target: "labels",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
        />
      );
      const label = screen.getByText("1");

      fireEvent.click(label);

      expect(clickHandler).toHaveBeenCalled();
    });
  });

  describe("accessibility", () => {
    it("adds an aria role to a line segment", () => {
      const { container } = render(<VictoryLine />);

      expect(container.querySelector("path").getAttribute("role")).toEqual(
        "presentation"
      );
    });

    it("adds an aria role to each line segment", () => {
      const data = [
        { x: 1, y: 1 },
        { x: 2, y: 3 },
        { x: 3, y: 5 },
        { x: 4, y: 2 },
        { x: 5, y: null },
        { x: 6, y: null },
        { x: 7, y: 6 },
        { x: 8, y: 7 },
        { x: 9, y: 8 },
        { x: 10, y: 12 }
      ];
      const { container } = render(<VictoryLine data={data} />);

      container.querySelectorAll("path").forEach((p) => {
        expect(p.getAttribute("role")).toEqual("presentation");
      });
    });

    it("adds aria-label and tabIndex to Curve primitive", () => {
      const ariaTestData = range(4).map((x) => ({ x, y: random(1, 7) }));
      const { container } = render(
        <VictoryLine
          data={ariaTestData}
          dataComponent={
            <Curve
              ariaLabel={({ data }) =>
                `data point ${data[2].x + 1}'s x value is ${data[2].x}`
              }
              tabIndex={3}
            />
          }
        />
      );
      const path = container.querySelector("path");

      expect(path.getAttribute("aria-label")).toEqual(
        `data point 3's x value is 2`
      );

      expect(parseInt(path.getAttribute("tabindex"))).toEqual(3);
    });
  });
});
