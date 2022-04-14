import React from "react";
import { render, screen } from "@testing-library/react";
import { VictoryLine, Curve } from "victory-line";
import { calculateD3Path } from "../../svg-test-helper";
import { curveCatmullRom } from "d3-shape";

describe("victory-line", () => {
  describe("default component rendering", () => {
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
  });
});
