import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { range } from "lodash";
import React from "react";
import { Area, VictoryArea } from "victory-area";
import { VictoryChart } from "victory-chart";
import { curveCatmullRom } from "victory-vendor/d3-shape";
import { calculateD3Path } from "../../svg-test-helper";

describe("components/victory-area", () => {
  describe("default component rendering", () => {
    it("attaches safe user props to the container component", () => {
      render(
        <VictoryArea
          data-testid="victory-area"
          aria-label="Chart"
          unsafe-prop="test"
        />
      );

      const container = screen.getByTestId("victory-area");
      expect(screen.getByLabelText("Chart")).toBeDefined();
      expect(container).not.toHaveAttribute("unsafe-prop");
      expect(container.nodeName).toEqual("svg");
    });

    it("attaches safe user props to the group component if the component is rendered inside a VictoryChart", () => {
      render(
        <VictoryArea
          data-testid="victory-area"
          aria-label="Chart"
          unsafe-prop="test"
        />,
        { wrapper: VictoryChart }
      );

      const container = screen.getByTestId("victory-area");
      expect(screen.getByLabelText("Chart")).toBeDefined();
      expect(container).not.toHaveAttribute("unsafe-prop");
      expect(container.nodeName).toEqual("g");
    });

    it("renders an svg with the correct viewbox", () => {
      const { container } = render(<VictoryArea />);
      const viewBoxValue = `0 0 ${450} ${300}`;
      expect(container.querySelector("svg").getAttribute("viewBox")).toEqual(
        viewBoxValue
      );
    });
  });

  describe("component rendering with data", () => {
    it("renders the correct d3 path", () => {
      const props = {
        width: 400,
        height: 300,
        padding: 50,
        scale: "linear",
        interpolation: "linear",
        data: [
          { x: 0, y: 0, y0: 0 },
          { x: 2, y: 3, y0: 0 },
          { x: 4, y: 1, y0: 0 }
        ]
      };
      const { container } = render(<VictoryArea {...props} />);
      expect(container.querySelector("path").getAttribute("d")).toEqual(
        calculateD3Path(props, "area")
      );
    });

    it("renders the correct d3 path with custom interpolation string property", () => {
      const props = {
        interpolation: "catmullRom",
        width: 400,
        height: 300,
        padding: 50,
        scale: "linear",
        data: [
          { x: 0, y: 0, y0: 0 },
          { x: 2, y: 3, y0: 0 },
          { x: 4, y: 1, y0: 0 }
        ]
      };

      const { container } = render(<VictoryArea {...props} />);

      expect(container.querySelector("path").getAttribute("d")).toEqual(
        calculateD3Path(props, "area")
      );
    });

    it("renders the correct d3 path with custom interpolation function", () => {
      const props = {
        interpolation: curveCatmullRom,
        width: 400,
        height: 300,
        padding: 50,
        scale: "linear",
        data: [
          { x: 0, y: 0, y0: 0 },
          { x: 2, y: 3, y0: 0 },
          { x: 4, y: 1, y0: 0 }
        ]
      };

      const { container } = render(<VictoryArea {...props} />);

      expect(container.querySelector("path").getAttribute("d")).toEqual(
        calculateD3Path(props, "area")
      );
    });

    it("sorts data according to sortKey prop", () => {
      const props = {
        scale: "linear",
        interpolation: "linear",
        sortKey: "x",
        data: range(5)
          // eslint-disable-next-line max-nested-callbacks
          .map((i) => ({ x: i, y: i, y0: 0 }))
          .reverse()
      };
      render(
        <VictoryArea
          {...props}
          dataComponent={
            <Area
              data-testid="area"
              data-json={({ data }) => JSON.stringify(data)}
            />
          }
        />
      );

      const area = screen.getByTestId("area");
      const data = JSON.parse(area.getAttribute("data-json"));
      const xValues = data.map((d) => d._x);

      expect(xValues).toEqual([0, 1, 2, 3, 4]);
    });

    it("sorts data according to sortOrder prop", () => {
      const props = {
        scale: "linear",
        interpolation: "linear",
        sortKey: "x",
        sortOrder: "descending",
        data: range(5)
          .map((i) => ({ x: i, y: i, y0: 0 }))
          .reverse()
      };
      render(
        <VictoryArea
          {...props}
          dataComponent={
            <Area
              data-testid="area"
              data-json={({ data }) => JSON.stringify(data)}
            />
          }
        />
      );

      const area = screen.getByTestId("area");
      const data = JSON.parse(area.getAttribute("data-json"));
      const xValues = data.map((d) => d._x);

      expect(xValues).toEqual([4, 3, 2, 1, 0]);
    });
  });

  describe("event handling", () => {
    it("attaches an event to the parent svg", () => {
      const clickHandler = jest.fn();
      render(
        <VictoryArea
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
        <VictoryArea
          dataComponent={<Area data-testid="data" />}
          events={[
            {
              target: "data",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
        />
      );
      const dataComponent = screen.getByTestId("data");

      fireEvent.click(dataComponent);
      expect(clickHandler).toHaveBeenCalled();
    });

    it("attaches an event to a label", () => {
      const clickHandler = jest.fn();
      render(
        <VictoryArea
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
      fireEvent.click(screen.getByText("1"));

      expect(clickHandler).toHaveBeenCalled();
    });
  });

  describe("accessibility", () => {
    it("adds an aria role to the path area", () => {
      const { container } = render(<VictoryArea />);
      container.querySelectorAll("path").forEach((p) => {
        expect(p.getAttribute("role")).toBe("presentation");
      });
    });

    it("adds aria-label and tabIndex to Area primitive", () => {
      const ariaTestData = [
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 5 },
        { x: 4, y: 4 },
        { x: 5, y: 7 }
      ];
      const { container } = render(
        <VictoryArea
          data={ariaTestData}
          dataComponent={
            <Area
              ariaLabel={({ data }) => `data point 1's x value is ${data[0].x}`}
              tabIndex={4}
            />
          }
        />
      );

      container.querySelectorAll("path").forEach((p, i) => {
        expect(p.getAttribute("aria-label")).toEqual(
          `data point 1's x value is ${ariaTestData[i].x}`
        );
        expect(parseInt(p.getAttribute("tabindex"))).toEqual(4);
      });
    });
  });
});
