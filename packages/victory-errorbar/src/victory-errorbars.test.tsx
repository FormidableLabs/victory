import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { fromJS } from "immutable";
import { Helpers } from "victory-core";
import * as d3Scale from "d3-scale";

import { ErrorBar } from "./error-bar";
import { VictoryErrorBar } from "./victory-errorbar";

const defaultProps = {
  dataComponent: (
    <ErrorBar
      data-testid="error-bar"
      data-x={(props) => props.datum._x}
      data-y={(props) => props.datum._y}
    />
  ),
};

const getCoordinatesForLineWithType = (node, type) => {
  const line = node.querySelector(`line[data-type="${type}"]`);
  return ["x1", "x2", "y1", "y2"].map((attr) =>
    parseFloat(line.getAttribute(attr)),
  );
};

describe("components/victory-errorbar", () => {
  describe("default component rendering", () => {
    it("accepts user props", () => {
      render(
        <VictoryErrorBar data-testid="victory-errorbar" aria-label="Chart" />,
      );

      expect(screen.getByTestId("victory-errorbar")).toBeDefined();
      expect(screen.getByLabelText("Chart")).toBeDefined();
    });

    it("renders an svg with the correct width and height", () => {
      const { container } = render(<VictoryErrorBar />);
      const svg = container.querySelector("svg");
      expect(svg!.style.width).toEqual("100%");
      expect(svg!.style.height).toEqual("100%");
    });

    it("renders an svg with the correct viewBox", () => {
      const { container } = render(<VictoryErrorBar />);
      const svg = container.querySelector("svg");
      const viewBoxValue = `0 0 ${450} ${300}`;
      expect(svg!.getAttribute("viewBox")).toEqual(viewBoxValue);
    });

    it("renders 4 errors", () => {
      render(<VictoryErrorBar {...defaultProps} />);
      const errorbars = screen.getAllByTestId("error-bar");
      expect(errorbars.length).toEqual(4);
    });
  });

  it("does not render data with null x or y values", () => {
    const data = [
      { x: 15, y: 35, errorX: 1, errorY: 3 },
      { x: null, y: 42, errorX: 3, errorY: 2 },
      { x: 25, y: null, errorX: 5, errorY: 5 },
    ];
    render(<VictoryErrorBar data={data} {...defaultProps} />);
    expect(screen.getAllByTestId("error-bar")).toHaveLength(1);
  });

  const immutableRenderDataTest = {
    createData: (x) => fromJS(x),
    testLabel: "with immutable data",
  };
  const renderDataTest = {
    createData: (x) => x,
    testLabel: "with js data",
  };

  [renderDataTest, immutableRenderDataTest].forEach(
    ({ createData, testLabel }) => {
      describe(`symmetric error, rendering data ${testLabel}`, () => {
        it("renders injected errors for {x, y}", () => {
          const data = createData(
            Helpers.range(10).map((i) => ({
              x: i,
              y: i,
              errorX: 0.1,
              errorY: 0.2,
            })),
          );
          render(<VictoryErrorBar data={data} {...defaultProps} />);

          const errors = screen.getAllByTestId("error-bar");
          expect(errors).toHaveLength(10);
        });

        it("renders errors for {x, y}", () => {
          const data = createData(
            Helpers.range(10).map((i) => ({
              x: i,
              y: i,
              errorX: 0.1,
              errorY: 0.2,
            })),
          );
          render(<VictoryErrorBar data={data} {...defaultProps} />);
          const errors = screen.getAllByTestId("error-bar");
          expect(errors.length).toEqual(10);
        });

        it("sorts data by sortKey getAttribute", () => {
          const data = createData(
            Helpers.range(5)
              .map((i) => ({ x: i, y: i, errorX: 0.1, errorY: 0.2 }))
              .reverse(),
          );
          render(<VictoryErrorBar data={data} sortKey="x" {...defaultProps} />);
          const xValues = screen
            .getAllByTestId("error-bar")
            .map((node) => parseInt(node.getAttribute("data-x")!));
          expect(xValues).toEqual([0, 1, 2, 3, 4]);
        });

        it("reversed sorted data with the sortOrder getAttribute", () => {
          const data = createData(
            Helpers.range(5)
              .map((i) => ({ x: i, y: i, errorX: 0.1, errorY: 0.2 }))
              .reverse(),
          );
          render(
            <VictoryErrorBar
              data={data}
              sortKey="x"
              sortOrder="descending"
              {...defaultProps}
            />,
          );
          const yValues = screen
            .getAllByTestId("error-bar")
            .map((node) => parseInt(node.getAttribute("data-y")!));
          expect(yValues).toEqual([4, 3, 2, 1, 0]);
        });

        it("renders errors with error bars, check total svg lines", () => {
          const svgDimensions = { width: 350, height: 200, padding: 75 };
          const { container } = render(
            <VictoryErrorBar
              data={createData([
                { x: 0, y: 0, errorX: 0.1, errorY: 0.2 },
                { x: 2, y: 3, errorX: 0.1, errorY: 0.2 },
                { x: 5, y: 5, errorX: 0.1, errorY: 0.2 },
              ])}
              {...svgDimensions}
            />,
          );
          expect(container.querySelectorAll("line")).toHaveLength(24);
        });

        it("should check right border of error bars positions", () => {
          const svgDimensions = { width: 350, height: 200, padding: 75 };
          const borderWidth = 10;
          const data = [
            { x: 0, y: 0, errorX: 0.1, errorY: 0.2 },
            { x: 2, y: 3, errorX: 0.1, errorY: 0.2 },
            { x: 5, y: 5, errorX: 0.1, errorY: 0.2 },
          ];
          render(
            <VictoryErrorBar
              data={createData(data)}
              borderWidth={borderWidth}
              name="error"
              {...svgDimensions}
              {...defaultProps}
            />,
          );

          const xScale = d3Scale
            .scaleLinear()
            .domain([-0.1, 5.1])
            .range([
              svgDimensions.padding,
              svgDimensions.width - svgDimensions.padding,
            ]);

          const yScale = d3Scale
            .scaleLinear()
            .domain([-0.2, 5.2])
            .range([
              svgDimensions.height - svgDimensions.padding,
              svgDimensions.padding,
            ]);

          const bars = screen.getAllByTestId("error-bar");
          bars.forEach((node, i) => {
            const errorX = xScale(data[i].x + data[i].errorX);
            const xScaleMax = xScale.range()[1];
            const positiveErrorX = errorX >= xScaleMax ? xScaleMax : errorX;

            const [x1, x2, y1, y2] = getCoordinatesForLineWithType(
              node,
              "border-right",
            );
            expect(x1).toEqual(positiveErrorX);
            expect(x2).toEqual(positiveErrorX);
            expect(y1).toEqual(yScale(data[i].y) - borderWidth);
            expect(y2).toEqual(yScale(data[i].y) + borderWidth);
          });
        });

        it("should check left border of error bars positions", () => {
          const svgDimensions = { width: 350, height: 200, padding: 75 };
          const borderWidth = 10;
          const data = [
            { x: 0, y: 0, errorX: 0.1, errorY: 0.2 },
            { x: 2, y: 3, errorX: 0.1, errorY: 0.2 },
            { x: 5, y: 5, errorX: 0.1, errorY: 0.2 },
          ];
          render(
            <VictoryErrorBar
              data={createData(data)}
              borderWidth={borderWidth}
              {...svgDimensions}
              {...defaultProps}
            />,
          );

          const xScale = d3Scale
            .scaleLinear()
            .domain([-0.1, 5.1])
            .range([
              svgDimensions.padding,
              svgDimensions.width - svgDimensions.padding,
            ]);

          const yScale = d3Scale
            .scaleLinear()
            .domain([-0.2, 5.2])
            .range([
              svgDimensions.height - svgDimensions.padding,
              svgDimensions.padding,
            ]);

          const bars = screen.getAllByTestId("error-bar");
          bars.forEach((node, i) => {
            const errorX = xScale(data[i].x - data[i].errorX);
            const xScaleMin = xScale.range()[0];
            const negativeErrorX = errorX <= xScaleMin ? xScaleMin : errorX;

            const [x1, x2, y1, y2] = getCoordinatesForLineWithType(
              node,
              "border-left",
            );
            expect(x1).toEqual(negativeErrorX);
            expect(x2).toEqual(negativeErrorX);
            expect(y1).toEqual(yScale(data[i].y) - borderWidth);
            expect(y2).toEqual(yScale(data[i].y) + borderWidth);
          });
        });

        it("should check bottom border of error bars positions", () => {
          const svgDimensions = { width: 350, height: 200, padding: 75 };
          const borderWidth = 10;
          const data = [
            { x: 0, y: 0, errorX: 0.1, errorY: 0.2 },
            { x: 2, y: 3, errorX: 0.1, errorY: 0.2 },
            { x: 5, y: 5, errorX: 0.1, errorY: 0.2 },
          ];
          render(
            <VictoryErrorBar
              data={createData(data)}
              borderWidth={borderWidth}
              {...svgDimensions}
              {...defaultProps}
            />,
          );

          const xScale = d3Scale
            .scaleLinear()
            .domain([-0.1, 5.1])
            .range([
              svgDimensions.padding,
              svgDimensions.width - svgDimensions.padding,
            ]);

          const yScale = d3Scale
            .scaleLinear()
            .domain([-0.2, 5.2])
            .range([
              svgDimensions.height - svgDimensions.padding,
              svgDimensions.padding,
            ]);

          const bars = screen.getAllByTestId("error-bar");
          bars.forEach((node, i) => {
            const errorY = yScale(data[i].y + data[i].errorY);
            const yScaleMin = yScale.range()[1];
            const negativeErrorY = errorY <= yScaleMin ? yScaleMin : errorY;

            const [x1, x2, y1, y2] = getCoordinatesForLineWithType(
              node,
              "border-bottom",
            );

            expect(x1).toEqual(xScale(data[i].x) - borderWidth);
            expect(x2).toEqual(xScale(data[i].x) + borderWidth);
            expect(y1).toEqual(negativeErrorY);
            expect(y2).toEqual(negativeErrorY);
          });
        });

        it("should check top border of error bars positions", () => {
          const svgDimensions = { width: 350, height: 200, padding: 75 };
          const borderWidth = 10;
          const data = [
            { x: 0, y: 0, errorX: 0.1, errorY: 0.2 },
            { x: 2, y: 3, errorX: 0.1, errorY: 0.2 },
            { x: 5, y: 5, errorX: 0.1, errorY: 0.2 },
          ];
          render(
            <VictoryErrorBar
              data={createData(data)}
              borderWidth={borderWidth}
              {...svgDimensions}
              {...defaultProps}
            />,
          );

          const xScale = d3Scale
            .scaleLinear()
            .domain([-0.1, 5.1])
            .range([
              svgDimensions.padding,
              svgDimensions.width - svgDimensions.padding,
            ]);

          const yScale = d3Scale
            .scaleLinear()
            .domain([-0.2, 5.2])
            .range([
              svgDimensions.height - svgDimensions.padding,
              svgDimensions.padding,
            ]);

          const bars = screen.getAllByTestId("error-bar");
          expect(bars).toHaveLength(3);
          bars.forEach((node, i) => {
            const errorY = yScale(data[i].y - data[i].errorY);
            const yScaleMax = yScale.range()[0];
            const positiveErrorY = errorY >= yScaleMax ? yScaleMax : errorY;

            const [x1, x2, y1, y2] = getCoordinatesForLineWithType(
              node,
              "border-top",
            );

            expect(x1).toEqual(xScale(data[i].x) - borderWidth);
            expect(x2).toEqual(xScale(data[i].x) + borderWidth);
            expect(y1).toEqual(positiveErrorY);
            expect(y2).toEqual(positiveErrorY);
          });
        });

        it("should check top cross line of error bars positions", () => {
          const svgDimensions = { width: 350, height: 200, padding: 75 };
          const data = [
            { x: 0, y: 0, errorX: 0.1, errorY: 0.2 },
            { x: 2, y: 3, errorX: 0.1, errorY: 0.2 },
            { x: 5, y: 5, errorX: 0.1, errorY: 0.2 },
          ];
          render(
            <VictoryErrorBar
              data={createData(data)}
              {...svgDimensions}
              {...defaultProps}
            />,
          );

          const xScale = d3Scale
            .scaleLinear()
            .domain([-0.1, 5.1])
            .range([
              svgDimensions.padding,
              svgDimensions.width - svgDimensions.padding,
            ]);

          const yScale = d3Scale
            .scaleLinear()
            .domain([-0.2, 5.2])
            .range([
              svgDimensions.height - svgDimensions.padding,
              svgDimensions.padding,
            ]);

          const bars = screen.getAllByTestId("error-bar");
          expect(bars).toHaveLength(3);
          bars.forEach((node, i) => {
            const errorY = yScale(data[i].y - data[i].errorY);
            const yScaleMax = yScale.range()[0];
            const positiveErrorY = errorY >= yScaleMax ? yScaleMax : errorY;

            const [x1, x2, y1, y2] = getCoordinatesForLineWithType(
              node,
              "cross-top",
            );

            expect(x1).toEqual(xScale(data[i].x));
            expect(x2).toEqual(xScale(data[i].x));
            expect(y1).toEqual(yScale(data[i].y));
            expect(y2).toEqual(positiveErrorY);
          });
        });

        it("should check bottom cross line of error bars positions", () => {
          const svgDimensions = { width: 350, height: 200, padding: 75 };
          const data = [
            { x: 0, y: 0, errorX: 0.1, errorY: 0.2 },
            { x: 2, y: 3, errorX: 0.1, errorY: 0.2 },
            { x: 5, y: 5, errorX: 0.1, errorY: 0.2 },
          ];
          render(
            <VictoryErrorBar
              data={createData(data)}
              {...svgDimensions}
              {...defaultProps}
            />,
          );

          const xScale = d3Scale
            .scaleLinear()
            .domain([-0.1, 5.1])
            .range([
              svgDimensions.padding,
              svgDimensions.width - svgDimensions.padding,
            ]);

          const yScale = d3Scale
            .scaleLinear()
            .domain([-0.2, 5.2])
            .range([
              svgDimensions.height - svgDimensions.padding,
              svgDimensions.padding,
            ]);

          const bars = screen.getAllByTestId("error-bar");
          expect(bars).toHaveLength(3);
          bars.forEach((node, i) => {
            const errorY = yScale(data[i].y + data[i].errorY);
            const yScaleMin = yScale.range()[1];
            const negativeErrorY = errorY <= yScaleMin ? yScaleMin : errorY;

            const [x1, x2, y1, y2] = getCoordinatesForLineWithType(
              node,
              "cross-bottom",
            );

            expect(x1).toEqual(xScale(data[i].x));
            expect(x2).toEqual(xScale(data[i].x));
            expect(y1).toEqual(yScale(data[i].y));
            expect(y2).toEqual(negativeErrorY);
          });
        });

        it("should check left cross line of error bars positions", () => {
          const svgDimensions = { width: 350, height: 200, padding: 75 };
          const data = [
            { x: 0, y: 0, errorX: 0.1, errorY: 0.2 },
            { x: 2, y: 3, errorX: 0.1, errorY: 0.2 },
            { x: 5, y: 5, errorX: 0.1, errorY: 0.2 },
          ];
          render(
            <VictoryErrorBar
              data={createData(data)}
              {...svgDimensions}
              {...defaultProps}
            />,
          );

          const xScale = d3Scale
            .scaleLinear()
            .domain([-0.1, 5.1])
            .range([
              svgDimensions.padding,
              svgDimensions.width - svgDimensions.padding,
            ]);

          const yScale = d3Scale
            .scaleLinear()
            .domain([-0.2, 5.2])
            .range([
              svgDimensions.height - svgDimensions.padding,
              svgDimensions.padding,
            ]);

          const bars = screen.getAllByTestId("error-bar");
          expect(bars).toHaveLength(3);
          bars.forEach((node, i) => {
            const errorX = xScale(data[i].x - data[i].errorX);
            const xScaleMin = xScale.range()[0];
            const negativeErrorX = errorX <= xScaleMin ? xScaleMin : errorX;

            const [x1, x2, y1, y2] = getCoordinatesForLineWithType(
              node,
              "cross-left",
            );

            expect(x1).toEqual(xScale(data[i].x));
            expect(x2).toEqual(negativeErrorX);
            expect(y1).toEqual(yScale(data[i].y));
            expect(y2).toEqual(yScale(data[i].y));
          });
        });

        it("should check right cross line of error bars positions", () => {
          const svgDimensions = { width: 350, height: 200, padding: 75 };
          const data = [
            { x: 0, y: 0, errorX: 0.1, errorY: 0.2 },
            { x: 2, y: 3, errorX: 0.1, errorY: 0.2 },
            { x: 5, y: 5, errorX: 0.1, errorY: 0.2 },
          ];
          render(
            <VictoryErrorBar
              data={createData(data)}
              {...svgDimensions}
              {...defaultProps}
            />,
          );

          const xScale = d3Scale
            .scaleLinear()
            .domain([-0.1, 5.1])
            .range([
              svgDimensions.padding,
              svgDimensions.width - svgDimensions.padding,
            ]);

          const yScale = d3Scale
            .scaleLinear()
            .domain([-0.2, 5.2])
            .range([
              svgDimensions.height - svgDimensions.padding,
              svgDimensions.padding,
            ]);

          const bars = screen.getAllByTestId("error-bar");
          expect(bars).toHaveLength(3);
          bars.forEach((node, i) => {
            const errorX = xScale(data[i].errorX + data[i].x);
            const xScaleMax = xScale.range()[1];
            const positiveErrorX = errorX >= xScaleMax ? xScaleMax : errorX;

            const [x1, x2, y1, y2] = getCoordinatesForLineWithType(
              node,
              "cross-right",
            );
            expect(x1).toEqual(xScale(data[i].x));
            expect(x2).toEqual(positiveErrorX);
            expect(y1).toEqual(yScale(data[i].y));
            expect(y2).toEqual(yScale(data[i].y));
          });
        });
      });

      describe(`asymmetric error, rendering data ${testLabel}`, () => {
        it("renders injected errors for {x, y}", () => {
          const data = createData(
            Helpers.range(10).map((i) => ({
              x: i,
              y: i,
              errorX: [0.1, 0.2],
              errorY: [0.2, 0.5],
            })),
          );
          render(<VictoryErrorBar data={data} {...defaultProps} />);

          const errors = screen.getAllByTestId("error-bar");
          expect(errors).toHaveLength(10);
        });

        it("renders errors for {x, y}", () => {
          const data = createData(
            Helpers.range(10).map((i) => ({
              x: i,
              y: i,
              errorX: [0.1, 0.2],
              errorY: [0.2, 1],
            })),
          );
          render(<VictoryErrorBar data={data} {...defaultProps} />);
          const errors = screen.getAllByTestId("error-bar");
          expect(errors).toHaveLength(10);
        });

        it("renders errors with error bars, check total svg lines", () => {
          const svgDimensions = { width: 350, height: 200, padding: 75 };
          const { container } = render(
            <VictoryErrorBar
              data={createData([
                { x: 0, y: 0, errorX: [0.1, 0.5], errorY: [0.2, 0.3] },
                { x: 2, y: 3, errorX: [0.1, 0.5], errorY: [0.2, 0.4] },
                { x: 5, y: 5, errorX: [0.1, 0.5], errorY: [0.2, 0.1] },
              ])}
              {...svgDimensions}
            />,
          );
          expect(container.querySelectorAll("line")).toHaveLength(24);
        });

        it("should check right border of error bars positions", () => {
          const svgDimensions = { width: 350, height: 200, padding: 75 };
          const borderWidth = 10;
          const data = [
            { x: 0, y: 0, errorX: [0.1, 0.3], errorY: [0.2, 0.5] },
            { x: 2, y: 3, errorX: [0.1, 0.2], errorY: [0.2, 0.3] },
            { x: 5, y: 5, errorX: [0.1, 0.6], errorY: [0.2, 0.1] },
          ];
          render(
            <VictoryErrorBar
              data={createData(data)}
              borderWidth={borderWidth}
              {...svgDimensions}
              {...defaultProps}
            />,
          );

          const xScale = d3Scale
            .scaleLinear()
            .domain([-0.3, 5.1])
            .range([
              svgDimensions.padding,
              svgDimensions.width - svgDimensions.padding,
            ]);

          const yScale = d3Scale
            .scaleLinear()
            .domain([-0.5, 5.2])
            .range([
              svgDimensions.height - svgDimensions.padding,
              svgDimensions.padding,
            ]);

          const bars = screen.getAllByTestId("error-bar");
          expect(bars).toHaveLength(3);
          bars.forEach((node, i) => {
            const errorX = xScale(data[i].x + data[i].errorX[0]);
            const xScaleMax = xScale.range()[1];
            const positiveErrorX = errorX >= xScaleMax ? xScaleMax : errorX;

            const [x1, x2, y1, y2] = getCoordinatesForLineWithType(
              node,
              "border-right",
            );

            expect(x1).toEqual(positiveErrorX);
            expect(x2).toEqual(positiveErrorX);
            expect(y1).toEqual(yScale(data[i].y) - borderWidth);
            expect(y2).toEqual(yScale(data[i].y) + borderWidth);
          });
        });

        it("should check left border of error bars positions", () => {
          const svgDimensions = { width: 350, height: 200, padding: 75 };
          const borderWidth = 10;
          const data = [
            { x: 0, y: 0, errorX: [0.1, 0.3], errorY: [0.2, 0.5] },
            { x: 2, y: 3, errorX: [0.1, 0.2], errorY: [0.2, 0.3] },
            { x: 5, y: 5, errorX: [0.1, 0.6], errorY: [0.2, 0.1] },
          ];
          render(
            <VictoryErrorBar
              data={createData(data)}
              borderWidth={borderWidth}
              {...svgDimensions}
              {...defaultProps}
            />,
          );

          const xScale = d3Scale
            .scaleLinear()
            .domain([-0.3, 5.1])
            .range([
              svgDimensions.padding,
              svgDimensions.width - svgDimensions.padding,
            ]);

          const yScale = d3Scale
            .scaleLinear()
            .domain([-0.5, 5.2])
            .range([
              svgDimensions.height - svgDimensions.padding,
              svgDimensions.padding,
            ]);

          const bars = screen.getAllByTestId("error-bar");
          expect(bars).toHaveLength(3);
          bars.forEach((node, i) => {
            const errorX = xScale(data[i].x - data[i].errorX[1]);
            const xScaleMin = xScale.range()[0];
            const negativeErrorX = errorX <= xScaleMin ? xScaleMin : errorX;

            const [x1, x2, y1, y2] = getCoordinatesForLineWithType(
              node,
              "border-left",
            );

            expect(x1).toEqual(negativeErrorX);
            expect(x2).toEqual(negativeErrorX);
            expect(y1).toEqual(yScale(data[i].y) - borderWidth);
            expect(y2).toEqual(yScale(data[i].y) + borderWidth);
          });
        });

        it("should check bottom border of error bars positions", () => {
          const svgDimensions = { width: 350, height: 200, padding: 75 };
          const borderWidth = 10;
          const data = [
            { x: 0, y: 0, errorX: [0.1, 0.3], errorY: [0.2, 0.5] },
            { x: 2, y: 3, errorX: [0.1, 0.2], errorY: [0.2, 0.3] },
            { x: 5, y: 5, errorX: [0.1, 0.6], errorY: [0.2, 0.1] },
          ];
          render(
            <VictoryErrorBar
              data={createData(data)}
              borderWidth={borderWidth}
              {...svgDimensions}
              {...defaultProps}
            />,
          );

          const xScale = d3Scale
            .scaleLinear()
            .domain([-0.3, 5.1])
            .range([
              svgDimensions.padding,
              svgDimensions.width - svgDimensions.padding,
            ]);

          const yScale = d3Scale
            .scaleLinear()
            .domain([-0.5, 5.2])
            .range([
              svgDimensions.height - svgDimensions.padding,
              svgDimensions.padding,
            ]);

          const bars = screen.getAllByTestId("error-bar");
          expect(bars).toHaveLength(3);
          bars.forEach((node, i) => {
            const errorY = yScale(data[i].y + data[i].errorY[0]);
            const yScaleMin = yScale.range()[1];
            const negativeErrorY = errorY <= yScaleMin ? yScaleMin : errorY;

            const [x1, x2, y1, y2] = getCoordinatesForLineWithType(
              node,
              "border-bottom",
            );

            expect(x1).toEqual(xScale(data[i].x) - borderWidth);
            expect(x2).toEqual(xScale(data[i].x) + borderWidth);
            expect(y1).toEqual(negativeErrorY);
            expect(y2).toEqual(negativeErrorY);
          });
        });

        it("should check top border of error bars positions", () => {
          const svgDimensions = { width: 350, height: 200, padding: 75 };
          const borderWidth = 10;
          const data = [
            { x: 0, y: 0, errorX: [0.1, 0.3], errorY: [0.2, 0.5] },
            { x: 2, y: 3, errorX: [0.1, 0.2], errorY: [0.2, 0.3] },
            { x: 5, y: 5, errorX: [0.1, 0.6], errorY: [0.2, 0.1] },
          ];
          render(
            <VictoryErrorBar
              data={createData(data)}
              borderWidth={borderWidth}
              {...svgDimensions}
              {...defaultProps}
            />,
          );

          const xScale = d3Scale
            .scaleLinear()
            .domain([-0.3, 5.1])
            .range([
              svgDimensions.padding,
              svgDimensions.width - svgDimensions.padding,
            ]);

          const yScale = d3Scale
            .scaleLinear()
            .domain([-0.5, 5.2])
            .range([
              svgDimensions.height - svgDimensions.padding,
              svgDimensions.padding,
            ]);

          const bars = screen.getAllByTestId("error-bar");
          expect(bars).toHaveLength(3);
          bars.forEach((node, i) => {
            const errorY = yScale(data[i].y - data[i].errorY[1]);
            const yScaleMax = yScale.range()[0];
            const positiveErrorY = errorY >= yScaleMax ? yScaleMax : errorY;

            const [x1, x2, y1, y2] = getCoordinatesForLineWithType(
              node,
              "border-top",
            );

            expect(x1).toEqual(xScale(data[i].x) - borderWidth);
            expect(x2).toEqual(xScale(data[i].x) + borderWidth);
            expect(y1).toEqual(positiveErrorY);
            expect(y2).toEqual(positiveErrorY);
          });
        });

        it("should check top cross line of error bars positions", () => {
          const svgDimensions = { width: 350, height: 200, padding: 75 };
          const data = [
            { x: 0, y: 0, errorX: [0.1, 0.3], errorY: [0.2, 0.5] },
            { x: 2, y: 3, errorX: [0.1, 0.2], errorY: [0.2, 0.3] },
            { x: 5, y: 5, errorX: [0.1, 0.6], errorY: [0.2, 0.1] },
          ];
          render(
            <VictoryErrorBar
              data={createData(data)}
              {...svgDimensions}
              {...defaultProps}
            />,
          );

          const xScale = d3Scale
            .scaleLinear()
            .domain([-0.3, 5.1])
            .range([
              svgDimensions.padding,
              svgDimensions.width - svgDimensions.padding,
            ]);

          const yScale = d3Scale
            .scaleLinear()
            .domain([-0.5, 5.2])
            .range([
              svgDimensions.height - svgDimensions.padding,
              svgDimensions.padding,
            ]);

          const bars = screen.getAllByTestId("error-bar");
          expect(bars).toHaveLength(3);
          bars.forEach((node, i) => {
            const errorY = yScale(data[i].y - data[i].errorY[1]);
            const yScaleMax = yScale.range()[0];
            const positiveErrorY = errorY >= yScaleMax ? yScaleMax : errorY;

            const [x1, x2, y1, y2] = getCoordinatesForLineWithType(
              node,
              "cross-top",
            );

            expect(x1).toEqual(xScale(data[i].x));
            expect(x2).toEqual(xScale(data[i].x));
            expect(y1).toEqual(yScale(data[i].y));
            expect(y2).toEqual(positiveErrorY);
          });
        });

        it("should check bottom cross line of error bars positions", () => {
          const svgDimensions = { width: 350, height: 200, padding: 75 };
          const data = [
            { x: 0, y: 0, errorX: [0.1, 0.3], errorY: [0.2, 0.5] },
            { x: 2, y: 3, errorX: [0.1, 0.2], errorY: [0.2, 0.3] },
            { x: 5, y: 5, errorX: [0.1, 0.6], errorY: [0.2, 0.1] },
          ];
          render(
            <VictoryErrorBar
              data={createData(data)}
              {...svgDimensions}
              {...defaultProps}
            />,
          );

          const xScale = d3Scale
            .scaleLinear()
            .domain([-0.3, 5.1])
            .range([
              svgDimensions.padding,
              svgDimensions.width - svgDimensions.padding,
            ]);

          const yScale = d3Scale
            .scaleLinear()
            .domain([-0.5, 5.2])
            .range([
              svgDimensions.height - svgDimensions.padding,
              svgDimensions.padding,
            ]);

          const bars = screen.getAllByTestId("error-bar");
          expect(bars).toHaveLength(3);
          bars.forEach((node, i) => {
            const errorY = yScale(data[i].y + data[i].errorY[0]);
            const yScaleMin = yScale.range()[1];
            const negativeErrorY = errorY <= yScaleMin ? yScaleMin : errorY;

            const [x1, x2, y1, y2] = getCoordinatesForLineWithType(
              node,
              "cross-bottom",
            );

            expect(x1).toEqual(xScale(data[i].x));
            expect(x2).toEqual(xScale(data[i].x));
            expect(y1).toEqual(yScale(data[i].y));
            expect(y2).toEqual(negativeErrorY);
          });
        });

        it("should check left cross line of error bars positions", () => {
          const svgDimensions = { width: 350, height: 200, padding: 75 };
          const data = [
            { x: 0, y: 0, errorX: [0.1, 0.3], errorY: [0.2, 0.5] },
            { x: 2, y: 3, errorX: [0.1, 0.2], errorY: [0.2, 0.3] },
            { x: 5, y: 5, errorX: [0.1, 0.6], errorY: [0.2, 0.1] },
          ];
          render(
            <VictoryErrorBar
              data={createData(data)}
              {...svgDimensions}
              {...defaultProps}
            />,
          );

          const xScale = d3Scale
            .scaleLinear()
            .domain([-0.3, 5.1])
            .range([
              svgDimensions.padding,
              svgDimensions.width - svgDimensions.padding,
            ]);

          const yScale = d3Scale
            .scaleLinear()
            .domain([-0.5, 5.2])
            .range([
              svgDimensions.height - svgDimensions.padding,
              svgDimensions.padding,
            ]);

          const bars = screen.getAllByTestId("error-bar");
          expect(bars).toHaveLength(3);
          bars.forEach((node, i) => {
            const errorX = xScale(data[i].x - data[i].errorX[1]);
            const xScaleMin = xScale.range()[0];
            const negativeErrorX = errorX <= xScaleMin ? xScaleMin : errorX;

            const [x1, x2, y1, y2] = getCoordinatesForLineWithType(
              node,
              "cross-left",
            );

            expect(x1).toEqual(xScale(data[i].x));
            expect(x2).toEqual(negativeErrorX);
            expect(y1).toEqual(yScale(data[i].y));
            expect(y2).toEqual(yScale(data[i].y));
          });
        });

        it("should check right cross line of error bars positions", () => {
          const svgDimensions = { width: 350, height: 200, padding: 75 };
          const data = [
            { x: 0, y: 0, errorX: [0.1, 0.3], errorY: [0.2, 0.5] },
            { x: 2, y: 3, errorX: [0.1, 0.2], errorY: [0.2, 0.3] },
            { x: 5, y: 5, errorX: [0.1, 0.6], errorY: [0.2, 0.1] },
          ];
          render(
            <VictoryErrorBar
              data={createData(data)}
              {...svgDimensions}
              {...defaultProps}
            />,
          );

          const xScale = d3Scale
            .scaleLinear()
            .domain([-0.3, 5.1])
            .range([
              svgDimensions.padding,
              svgDimensions.width - svgDimensions.padding,
            ]);

          const yScale = d3Scale
            .scaleLinear()
            .domain([-0.5, 5.2])
            .range([
              svgDimensions.height - svgDimensions.padding,
              svgDimensions.padding,
            ]);

          const bars = screen.getAllByTestId("error-bar");
          expect(bars).toHaveLength(3);
          bars.forEach((node, i) => {
            const errorX = xScale(data[i].x + data[i].errorX[0]);
            const xScaleMax = xScale.range()[1];
            const positiveErrorX = errorX >= xScaleMax ? xScaleMax : errorX;

            const [x1, x2, y1, y2] = getCoordinatesForLineWithType(
              node,
              "cross-right",
            );

            expect(x1).toEqual(xScale(data[i].x));
            expect(x2).toEqual(positiveErrorX);
            expect(y1).toEqual(yScale(data[i].y));
            expect(y2).toEqual(yScale(data[i].y));
          });
        });
      });
    },
  );

  describe("event handling", () => {
    it("attaches an event to the parent svg", () => {
      const clickHandler = jest.fn();
      const { container } = render(
        <VictoryErrorBar
          events={[
            {
              target: "parent",
              eventHandlers: { onClick: clickHandler },
            },
          ]}
        />,
      );
      const svg = container.querySelector("svg");
      if (svg) fireEvent.click(svg);
      expect(clickHandler).toBeCalled();
    });

    it("attaches an event to data, click border lines", () => {
      const clickHandler = jest.fn();
      render(
        <VictoryErrorBar
          events={[
            {
              target: "data",
              eventHandlers: { onClick: clickHandler },
            },
          ]}
          {...defaultProps}
        />,
      );
      const bars = screen.getAllByTestId("error-bar");
      bars.forEach((node) => {
        // click the border line
        fireEvent.click(node.querySelectorAll("line")[3]);

        expect(clickHandler).toBeCalled();
      });
    });

    it("attaches an event to data, click cross lines", () => {
      const clickHandler = jest.fn();
      render(
        <VictoryErrorBar
          events={[
            {
              target: "data",
              eventHandlers: { onClick: clickHandler },
            },
          ]}
          {...defaultProps}
        />,
      );
      const bars = screen.getAllByTestId("error-bar");
      bars.forEach((node) => {
        // click the cross line
        fireEvent.click(node.querySelectorAll("line")[7]);
        expect(clickHandler).toBeCalled();
      });
    });

    describe("accessibility", () => {
      it("adds an aria label-label and tabIndex to Error Bar primitive", () => {
        const data = [
          { x: 35, y: 50, error: 0.2 },
          { x: 10, y: 43, error: 0.15 },
          { x: 45, y: 65, error: 0.5 },
        ];
        const { container } = render(
          <VictoryErrorBar
            data={data}
            dataComponent={
              <ErrorBar
                data-testid="error-bar"
                ariaLabel={({ datum }) => `error bar chart, x ${datum.x}`}
                tabIndex={({ index }) => index + 2}
              />
            }
          />,
        );

        expect(container.querySelectorAll("g")).toHaveLength(4);
        expect(screen.getAllByTestId("error-bar")).toHaveLength(3);

        screen.getAllByTestId("error-bar").forEach((g, i) => {
          expect(g.getAttribute("aria-label")).toEqual(
            `error bar chart, x ${data[i].x}`,
          );
          expect(parseInt(g.getAttribute("tabindex")!, 10)).toEqual(i + 2);
        });
      });
    });
  });
});
