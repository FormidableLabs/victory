import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Helpers, Style } from "victory-core";
import { Slice, VictoryPie } from "victory-pie";
import {
  isCircularSector,
  getSvgCoordinatesAngleFromCartesianYAxis,
  getSliceArcStart,
  parseSvgPathCommands,
  getDistanceFromOrigin,
  getSliceArcEnd,
} from "../../../test/helpers";

const pizzaSliceInnerText = "Pizza Slice";
const PizzaSlice = ({ datum }: { datum?: { x: number } }) => (
  <p data-testid={`pizza-slice-${datum?.x}`} data-xvalue={datum?.x}>
    {pizzaSliceInnerText}
  </p>
);

describe("components/victory-pie", () => {
  const labeledData = [
    { x: "Cats", y: 35 },
    { x: "Dogs", y: 40 },
    { x: "Birds", y: 55 },
  ];

  describe("default component rendering", () => {
    it("accepts user props", () => {
      render(<VictoryPie data-testid="victory-pie" aria-label="Chart" />);

      const svgNode = screen.getByTestId("victory-pie");

      expect(svgNode).toHaveAttribute("aria-label", "Chart");
    });

    it("renders an svg with the correct width and height", () => {
      const { container } = render(<VictoryPie />);
      const svg = container.querySelector("svg");

      expect(svg?.getAttribute("style")).toContain("width: 100%; height: 100%");
    });

    it("renders an svg with the correct viewBox", () => {
      const { container } = render(<VictoryPie />);
      const svg = container.querySelector("svg");
      expect(svg?.getAttribute("viewBox")).toEqual("0 0 400 400");
    });

    it("renders 5 slices", () => {
      const { container } = render(<VictoryPie />);

      const slices = container.querySelectorAll("path");
      expect(slices).toHaveLength(5);
    });

    it("renders each slice as a circular sector", () => {
      const { container } = render(<VictoryPie />);
      const slices = container.querySelectorAll("path");
      slices.forEach((slice) => {
        const sliceCommandString = slice.getAttribute("d");
        expect(isCircularSector(sliceCommandString)).toBeTruthy();
      });
    });

    it("renders 5 slice labels", () => {
      const { container } = render(<VictoryPie />);

      const labels = container.querySelectorAll("text");

      expect(labels).toHaveLength(5);
    });

    it("renders 0 slice labels for empty label array", () => {
      const { container } = render(<VictoryPie labels={[]} />);

      const labels = container.querySelectorAll("text");

      expect(labels).toHaveLength(0);
    });

    it("renders 0 slice labels for label function returning undefined", () => {
      // @ts-expect-error "undefined" is not assignable to "string"
      const { container } = render(<VictoryPie labels={() => undefined} />);

      const labels = container.querySelectorAll("text");

      expect(labels).toHaveLength(0);
    });
  });

  describe("rendering data", () => {
    it("renders dataComponents for {x, y} shaped data (default)", () => {
      const data = Helpers.range(5).map((i) => ({ x: i, y: i }));
      render(<VictoryPie data={data} dataComponent={<PizzaSlice />} />);
      const pizzaSlices = screen.getAllByText(pizzaSliceInnerText);
      expect(pizzaSlices).toHaveLength(5);
    });

    it("renders points for {x, y} shaped data (default)", () => {
      const data = Helpers.range(5).map((i) => ({ x: i, y: i }));
      const { container } = render(<VictoryPie data={data} />);
      const slices = container.querySelectorAll("path");
      expect(slices).toHaveLength(5);
    });

    it("renders points for array-shaped data", () => {
      const data = Helpers.range(6).map((i) => [i, i]);
      const { container } = render(<VictoryPie data={data} x={0} y={1} />);
      const slices = container.querySelectorAll("path");

      expect(slices).toHaveLength(6);
    });

    it("renders points for deeply-nested data", () => {
      const data = Helpers.range(7).map((i) => ({
        a: { b: [{ x: i, y: i }] },
      }));
      const { container } = render(
        <VictoryPie data={data} x="a.b[0].x" y="a.b[0].y" />,
      );
      const slices = container.querySelectorAll("path");

      expect(slices).toHaveLength(7);
    });

    it("renders data values with null accessor", () => {
      const data = Helpers.range(8);
      const { container } = render(
        // @ts-expect-error "'null' is not assignable to 'x'"
        <VictoryPie data={data} x={null} y={null} />,
      );
      const slices = container.querySelectorAll("path");

      expect(slices).toHaveLength(8);
    });

    it("renders data values in their given order", () => {
      const data = Helpers.range(9).map((i) => ({ x: i, y: i }));

      render(<VictoryPie data={data} dataComponent={<PizzaSlice />} />);
      const xValues = Array.from(screen.getAllByText(pizzaSliceInnerText)).map(
        (slice) => {
          return parseInt(slice.getAttribute("data-xvalue") || "");
        },
      );

      const xValuesFromGivenData = data.map(({ x }) => x);

      expect(xValues).toEqual(xValuesFromGivenData);
    });

    it("renders data values sorted by sortKey prop", () => {
      const data = Helpers.range(9)
        .map((i) => ({ x: i, y: i }))
        .reverse();

      render(
        <VictoryPie data={data} sortKey="x" dataComponent={<PizzaSlice />} />,
      );
      const xValues = Array.from(screen.getAllByText(pizzaSliceInnerText)).map(
        (slice) => {
          return parseInt(slice.getAttribute("data-xvalue") || "");
        },
      );

      const xValuesFromDataAscending = data
        .map(({ x }) => x)
        .sort((a, b) => a - b);

      expect(xValues).toEqual(xValuesFromDataAscending);
    });

    it("renders data values sorted by sortKey prop and sortOrder", () => {
      const data = Helpers.range(9).map((i) => ({ x: i, y: i }));

      render(
        <VictoryPie
          data={data}
          sortKey="x"
          sortOrder={"descending"}
          dataComponent={<PizzaSlice />}
        />,
      );
      const xValues = Array.from(screen.getAllByText(pizzaSliceInnerText)).map(
        (slice) => {
          return parseInt(slice.getAttribute("data-xvalue") || "");
        },
      );

      const xValuesFromDataDescending = data
        .map(({ x }) => x)
        .sort((a, b) => b - a);

      expect(xValues).toEqual(xValuesFromDataDescending);
    });

    it("does not render data with null x or y values", () => {
      const data = [
        { x: 1, y: 2 },
        { x: null, y: 4 },
        { x: 5, y: null },
      ];
      const { container } = render(<VictoryPie data={data} />);
      const slices = container.querySelectorAll("path");
      expect(slices).toHaveLength(1);
    });
  });

  describe("the `startAngle` prop", () => {
    it("determines the counter clockwise angle relative to a cartesian Y axis of a vector extending from the origin to the _first drawn coordinate_ of the first slice ", () => {
      [0, 90, 180, 270].map((angle) => {
        const { container } = render(<VictoryPie startAngle={angle} />);

        const [firstSlice] = container.querySelectorAll("path");
        const sliceCommandString = firstSlice.getAttribute("d");
        const coordinates = getSliceArcStart(sliceCommandString);
        const renderedAngle =
          getSvgCoordinatesAngleFromCartesianYAxis(coordinates);

        // There is a small degree of inprecision due to how D3 renders the paths
        expect(renderedAngle).toBeCloseTo(angle);
      });
    });
  });

  describe("the `innerRadius` prop", () => {
    it("renders the slices as annular sections", () => {
      const { container } = render(<VictoryPie innerRadius={70} />);

      const slices = container.querySelectorAll("path");
      slices.forEach((slice) => {
        const commands = parseSvgPathCommands(slice.getAttribute("d"));
        const startOfInnerArc = {
          x: commands[2].args[0],
          y: commands[2].args[1],
        };
        const endOfInnerArc = {
          x: commands[3].args[5],
          y: commands[3].args[6],
        };

        expect(getDistanceFromOrigin(startOfInnerArc)).toBeCloseTo(
          getDistanceFromOrigin(endOfInnerArc),
        );
      });
    });

    it("determines the distance in pixels between the origin & the inner edge of the sections", () => {
      const INNER_RADIUS = 70;
      const { container } = render(<VictoryPie innerRadius={INNER_RADIUS} />);

      const slices = container.querySelectorAll("path");
      slices.forEach((slice) => {
        const commands = parseSvgPathCommands(slice.getAttribute("d"));
        const startOfInnerArc = {
          x: commands[2].args[0],
          y: commands[2].args[1],
        };

        const innerRadius = getDistanceFromOrigin(startOfInnerArc);

        expect(innerRadius).toBeCloseTo(INNER_RADIUS);
      });
    });
  });

  describe("`startAngle` in conjunction with `endAngle`", () => {
    it("renders a portion of a chart from `startAngle` to `endAngle`", () => {
      const { container } = render(
        <VictoryPie startAngle={-90} endAngle={90} />,
      );

      const slices = container.querySelectorAll("path");
      const firstSlice = slices[0];
      const lastSlice = slices[slices.length - 1];
      const arcStart = getSliceArcStart(firstSlice.getAttribute("d"));
      const arcEnd = getSliceArcEnd(lastSlice.getAttribute("d"));

      expect(getSvgCoordinatesAngleFromCartesianYAxis(arcStart)).toBeCloseTo(
        270,
      );
      expect(getSvgCoordinatesAngleFromCartesianYAxis(arcEnd)).toBeCloseTo(90);
    });
  });

  describe("the `width` prop", () => {
    it("determines the width of the containing viewBox", () => {
      const width = 200;
      const { container } = render(<VictoryPie width={width} />);
      const svg = container.querySelector("svg");
      expect(svg?.getAttribute("viewBox")).toEqual(`0 0 ${width} 400`);
    });
  });

  describe("the `height` prop", () => {
    it("determines the height of the containing viewBox", () => {
      const height = 200;
      const { container } = render(<VictoryPie height={height} />);
      const svg = container.querySelector("svg");
      expect(svg?.getAttribute("viewBox")).toEqual(`0 0 400 ${height}`);
    });
  });

  describe("the `colorScale` prop", () => {
    describe("if provided an array of CSS colors", () => {
      it("renders each slice with the next color in the array, reiterating through colors as necessary", () => {
        const data = Helpers.range(5);
        const colorScale = ["#fffff", "#eeeee", "#ddddd"];
        const { container } = render(
          <VictoryPie data={data} colorScale={colorScale} />,
        );

        const slices = container.querySelectorAll("path");
        expect(slices).toHaveLength(5);
        slices.forEach((slice, index) => {
          expect(slice.getAttribute("style")).toContain(
            colorScale[index % colorScale.length],
          );
        });
      });
    });

    describe("if provided a string", () => {
      describe("and the string is a valid victory color scale", () => {
        it("renders the chart using the given color scale", () => {
          const VALID_VICTORY_COLOR_SCALE_NAMES = [
            "grayscale",
            "qualitative",
            "heatmap",
            "warm",
            "cool",
            "red",
            "green",
            "blue",
          ];

          VALID_VICTORY_COLOR_SCALE_NAMES.map((colorScaleName) => {
            const colorScale = Style.getColorScale(colorScaleName);
            const data = Helpers.range(colorScale.length + 1);
            const { container } = render(
              <VictoryPie colorScale={colorScale} data={data} />,
            );

            Array.from(container.querySelectorAll("path")).map(
              (slice, index) => {
                const expectedColorScheme =
                  colorScale[index % colorScale.length];
                expect(slice.getAttribute("style")).toContain(
                  expectedColorScheme,
                );
              },
            );
          });
        });
      });
    });
  });

  describe("event handling", () => {
    const clickHandler = jest.fn();

    beforeEach(() => {
      clickHandler.mockReset();
    });

    it("attaches an event to the parent svg", () => {
      const { container } = render(
        <VictoryPie
          events={[
            {
              target: "parent",
              eventHandlers: { onClick: clickHandler },
            },
          ]}
        />,
      );
      const svg = container.querySelector("svg");
      fireEvent.click(svg!);
      expect(clickHandler).toBeCalled();

      const contextualArg = clickHandler.mock.calls[0][1];
      // the first argument is the standard event object
      expect(contextualArg.key).toEqual("pie-parent-parent");
    });

    it("attaches an event to data", () => {
      const { container } = render(
        <VictoryPie
          events={[
            {
              target: "data",
              eventHandlers: { onClick: clickHandler },
            },
          ]}
        />,
      );

      const slices = container.querySelectorAll("path");
      slices.forEach((slice, index) => {
        fireEvent.click(slice);

        const contextualArg = clickHandler.mock.calls[index][1];
        expect(contextualArg.key).toEqual(`pie-data-${index}`);
      });
    });

    it("attaches an event to label", () => {
      render(
        <VictoryPie
          data={labeledData}
          events={[
            {
              target: "labels",
              eventHandlers: { onClick: clickHandler },
            },
          ]}
        />,
      );

      labeledData.forEach((dataPoint, index) => {
        const label = screen.getByText(dataPoint.x);
        fireEvent.click(label);

        const contextualArg = clickHandler.mock.calls[index][1];
        expect(contextualArg.slice.data._y).toEqual(dataPoint.y);
      });
    });
  });

  describe("accessbility", () => {
    it("adds aria-label and tabIndex to Slice primitive", () => {
      const { container } = render(
        <VictoryPie
          data={labeledData}
          dataComponent={
            <Slice
              ariaLabel={({ datum }) => `${datum.x}`}
              tabIndex={({ index }) => Number(index) + 5}
            />
          }
        />,
      );

      const slices = container.querySelectorAll("path");

      expect(slices).toHaveLength(labeledData.length);

      slices.forEach((slice, index) => {
        expect(slice.getAttribute("aria-label")).toEqual(labeledData[index].x);
        expect(slice.getAttribute("tabindex")).toEqual(`${index + 5}`);
      });
    });
  });
});
