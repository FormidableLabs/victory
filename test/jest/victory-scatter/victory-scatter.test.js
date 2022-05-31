/*eslint-disable max-nested-callbacks */
import { fireEvent, render, screen } from "@testing-library/react";
import { range } from "lodash";
import React from "react";
import { Point, VictoryLabel } from "victory-core";
import { VictoryScatter } from "victory-scatter";
import {
  convertSvgCoordinatesToCartesian,
  getSvgPointCoordinates,
  isCircle
} from "../../svg-test-helper";

describe("components/victory-scatter", () => {
  describe("default component rendering", () => {
    it("accepts safe user props", () => {
      render(
        <VictoryScatter
          data-testid="victory-scatter"
          aria-label="Chart"
          unsafe-prop="test"
        />
      );

      const container = screen.getByTestId("victory-scatter");
      expect(screen.getByLabelText("Chart")).toBeDefined();
      expect(container).not.toHaveAttribute("unsafe-prop");
      expect(container.nodeName).toBe("svg");
    });

    it("renders an svg with the correct width and height", () => {
      const { container } = render(<VictoryScatter />);
      const svg = container.querySelector("svg");
      expect(svg.style.width).toEqual("100%");
      expect(svg.style.height).toEqual("100%");
    });

    it("renders an svg with the correct viewBox", () => {
      const { container } = render(<VictoryScatter />);
      const svg = container.querySelector("svg");
      const viewBoxValue = `0 0 ${450} ${300}`;
      expect(svg.getAttribute("viewBox")).toEqual(viewBoxValue);
    });

    it("renders 51 points", () => {
      const { container } = render(<VictoryScatter />);
      const points = container.querySelectorAll("path");
      expect(points).toHaveLength(51);
    });

    it("renders each point as a circle", () => {
      const { container } = render(<VictoryScatter />);
      const points = container.querySelectorAll("path");
      expect(points).not.toHaveLength(0);
      points.forEach((point) => {
        expect(isCircle(point.getAttribute("d"))).toBeTruthy();
      });
    });
  });

  describe("rendering data", () => {
    it("renders injected points for {x, y} shaped data (default)", () => {
      const data = range(10).map((i) => ({ x: i, y: i }));
      render(
        <VictoryScatter
          data={data}
          dataComponent={<Point data-testid="point" />}
        />
      );

      const points = screen.getAllByTestId("point");
      expect(points).toHaveLength(10);
    });

    it("renders points for {x, y} shaped data (default)", () => {
      const data = range(10).map((i) => ({ x: i, y: i }));
      const { container } = render(<VictoryScatter data={data} />);
      const points = container.querySelectorAll("path");
      expect(points).toHaveLength(10);
    });

    it("renders points for array-shaped data", () => {
      const data = range(4).map((i) => [i, i]);
      const { container } = render(<VictoryScatter data={data} x={0} y={1} />);
      const points = container.querySelectorAll("path");
      expect(points).toHaveLength(4);
    });

    it("renders points for deeply-nested data", () => {
      const data = range(4).map((i) => ({ a: { b: [{ x: i, y: i }] } }));
      const { container } = render(
        <VictoryScatter data={data} x="a.b[0].x" y="a.b[0].y" />
      );
      const points = container.querySelectorAll("path");
      expect(points).toHaveLength(4);
    });

    it("renders data values with null accessor", () => {
      const data = range(30);
      const { container } = render(
        <VictoryScatter data={data} x={null} y={null} />
      );
      const points = container.querySelectorAll("path");
      expect(points.length).toEqual(30);
    });

    it("renders points in the correct positions", () => {
      const svgDimensions = { width: 350, height: 200, padding: 75 };
      const { container } = render(
        <VictoryScatter
          data={[
            { x: 0, y: 0 },
            { x: 2, y: 3 },
            { x: 5, y: 5 }
          ]}
          {...svgDimensions}
        />
      );
      const domain = { x: [0, 5], y: [0, 5] };

      const points = container.querySelectorAll("path");
      const svgCoordinates = Array.from(points).map(getSvgPointCoordinates);
      const coordinates = svgCoordinates.map((coord) => {
        return convertSvgCoordinatesToCartesian(coord, svgDimensions, domain);
      });

      expect(coordinates).toEqual([
        [0, 0],
        [2, 3],
        [5, 5]
      ]);
    });

    it("does not render data with null x or y values", () => {
      const data = [
        { x: 1, y: 2 },
        { x: null, y: 4 },
        { x: 5, y: null }
      ];
      const { container } = render(<VictoryScatter data={data} />);
      expect(container.querySelectorAll("path")).toHaveLength(1);
    });
  });

  describe("event handling", () => {
    it("attaches an event to the parent svg", () => {
      const clickHandler = jest.fn();
      const { container } = render(
        <VictoryScatter
          events={[
            {
              target: "parent",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
        />
      );
      const svg = container.querySelector("svg");
      fireEvent.click(svg);
      expect(clickHandler).toBeCalled();
      // the first argument is the standard evt object
      expect(Object.keys(clickHandler.mock.calls[0][1])).toEqual(
        expect.arrayContaining(["data", "scale", "width", "height", "style"])
      );
    });

    it("attaches an event to data", () => {
      const clickHandler = jest.fn();
      const { container } = render(
        <VictoryScatter
          events={[
            {
              target: "data",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
        />
      );
      const Data = container.querySelectorAll("path");
      expect(Data).not.toHaveLength(0);
      Data.forEach((node, index) => {
        fireEvent.click(node);
        expect(clickHandler).toHaveBeenCalled();
        expect(`${clickHandler.mock.calls[index][2]}`).toEqual(`${index}`);
      });
    });

    it("attaches an event to a label", () => {
      const clickHandler = jest.fn();
      const data = [
        { eventKey: 0, _x: 0, _y: 0, x: 0, y: 0, label: "0" },
        { eventKey: 1, _x: 1, _y: 1, x: 1, y: 1, label: "1" },
        { eventKey: 2, _x: 2, _y: 2, x: 2, y: 2, label: "2" }
      ];
      render(
        <VictoryScatter
          data={data}
          labelComponent={<VictoryLabel data-testid="label" />}
          events={[
            {
              target: "labels",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
        />
      );
      const Labels = screen.getAllByTestId("label");
      Labels.forEach((node, index) => {
        fireEvent.click(node);
        expect(clickHandler).toHaveBeenCalled();
        // the first argument is the standard evt object
        expect(clickHandler.mock.calls[index][1].datum).toEqual(data[index]);
        expect(`${clickHandler.mock.calls[index][2]}`).toEqual(`${index}`);
      });
    });
  });

  describe("accessibility", () => {
    it("adds an aria role to each point in the series", () => {
      const data = range(5).map((y, x) => ({ x, y }));
      render(<VictoryScatter data={data} />);

      expect(screen.getAllByRole("presentation")).toHaveLength(5);
    });

    it("adds an aria-label and tabIndex to Point primitive", () => {
      const data = range(2, 7).map((x) => ({ x, y: x + 2 }));
      render(
        <VictoryScatter
          data={data}
          dataComponent={
            <Point
              data-testid="point"
              ariaLabel={({ datum }) =>
                `scatter point x: ${datum.x}, y:${datum.y}`
              }
              tabIndex={({ index }) => index + 10}
            />
          }
        />
      );
      const points = screen.getAllByTestId("point");
      expect(points).toHaveLength(5);
      points.forEach((p, i) => {
        expect(p.getAttribute("aria-label")).toEqual(
          `scatter point x: ${data[i].x}, y:${data[i].y}`
        );
        expect(parseInt(p.getAttribute("tabindex"), 10)).toEqual(i + 10);
      });
    });
  });
});
