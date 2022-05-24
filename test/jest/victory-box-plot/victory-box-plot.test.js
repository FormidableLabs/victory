/*eslint-disable react/prop-types */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { VictoryBoxPlot } from "victory-box-plot";
import { VictoryChart } from "victory-chart";
import { Border, LineSegment, Whisker } from "victory-core";

const TEST_GROUP_ID = "test-group-id";
const dataset = [
  { x: 1, min: 1, max: 18, median: 8, q1: 5, q3: 15 },
  { x: 2, min: 4, max: 20, median: 10, q1: 7, q3: 15 },
  { x: 3, min: 3, max: 12, median: 6, q1: 5, q3: 10 }
];

const TestGroup = ({ children }) => {
  return <g data-testid={TEST_GROUP_ID}>{children}</g>;
};

const renderWithTestGroup = (data = dataset) => {
  const { container } = render(
    <VictoryBoxPlot data={data} groupComponent={<TestGroup />} />
  );
  const groups = screen.getAllByTestId(TEST_GROUP_ID);

  return { container, groups };
};

describe("components/victory-box-plot", () => {
  describe("default component rendering", () => {
    it("attaches safe user props to the container component", () => {
      render(
        <VictoryBoxPlot
          data-testid="victory-boxplot"
          aria-label="Chart"
          unsafe-prop="test"
        />
      );

      const container = screen.getByTestId("victory-boxplot");
      expect(screen.getByLabelText("Chart")).toBeDefined();
      expect(container).not.toHaveAttribute("unsafe-prop");
      expect(container.nodeName).toEqual("svg");
    });

    it("attaches safe user props to the group component if the component is rendered inside a VictoryChart", () => {
      render(
        <VictoryBoxPlot
          data-testid="victory-boxplot"
          aria-label="Chart"
          unsafe-prop="test"
        />,
        { wrapper: VictoryChart }
      );

      const container = screen.getByTestId("victory-boxplot");
      expect(screen.getByLabelText("Chart")).toBeDefined();
      expect(container).not.toHaveAttribute("unsafe-prop");
      expect(container.nodeName).toEqual("g");
    });

    it("renders an svg with the correct width and height", () => {
      const { container } = render(<VictoryBoxPlot data={dataset} />);
      const svg = container.querySelector("svg");
      expect(svg.getAttribute("style")).toContain("width: 100%; height: 100%");
    });

    it("renders an svg with the correct viewBox", () => {
      const { container } = render(<VictoryBoxPlot data={dataset} />);
      const svg = container.querySelector("svg");
      const viewBoxValue = `0 0 ${450} ${300}`;
      expect(svg.getAttribute("viewBox")).toEqual(viewBoxValue);
    });

    it("renders 3 points", () => {
      const { container } = render(<VictoryBoxPlot data={dataset} />);
      const points = container.querySelectorAll("rect");
      // two boxes per point
      expect(points).toHaveLength(6);
    });
  });

  it("does not render data with null x or y values", () => {
    const data = [
      { x: 1, y: 2 },
      { x: 1, y: 3 },
      { x: null, y: 2 },
      { x: null, y: 3 },
      { x: 2, y: null },
      { x: 2, y: null }
    ];
    const { groups } = renderWithTestGroup(data);

    expect(groups).toHaveLength(1);
  });

  it("does not render data with null y values when given an array", () => {
    const data = [
      { x: 1, y: [1, 2, 3] },
      { x: 1, y: [null, 2, 5] }
    ];

    const { groups } = renderWithTestGroup(data);

    expect(groups).toHaveLength(1);
  });

  it("does not render data with null min, max, median, q1, or q3 values", () => {
    const data = [
      { x: 1, min: 2, median: 5, max: 10, q1: 3, q3: 7 },
      { x: 2, min: null, median: 4, max: 9, q1: 3, q3: 6 },
      { x: 3, min: 1, median: null, max: 12, q1: 4, q3: 10 },
      { x: 4, min: 3, median: 9, max: null, q1: 5, q3: 13 },
      { x: 5, min: 2, median: 8, max: 15, q1: null, q3: 12 },
      { x: 5, min: 2, median: 10, max: 20, q1: 8, q3: null }
    ];

    const { groups } = renderWithTestGroup(data);

    expect(groups).toHaveLength(1);
  });

  describe("accessibility", () => {
    const buildLabel = (a, b) => `First value: ${a} Second value: ${b}`;
    it("adds an aria role to each point in the series", () => {
      const { container } = render(<VictoryBoxPlot data={dataset} />);

      container.querySelectorAll("rect").forEach((box) => {
        expect(box.getAttribute("role")).toEqual("presentation");
      });
    });

    it("applies aria-label to whisker primitive", () => {
      render(
        <VictoryBoxPlot
          data={dataset}
          maxComponent={
            <Whisker
              ariaLabel={({ datum }) => buildLabel(datum.x, datum._max)}
              tabIndex={({ index }) => index + 1}
            />
          }
        />
      );

      dataset
        .map(({ x, max }) => buildLabel(x, max))
        .forEach((label, index) => {
          const [labeledWhisker] = screen.getAllByLabelText(label);
          expect(labeledWhisker).toBeDefined();
          expect(labeledWhisker.getAttribute("tabindex")).toEqual(
            `${index + 1}`
          );
        });
    });

    it("applies aria-label to border primitive", () => {
      render(
        <VictoryBoxPlot
          data={dataset}
          q3Component={
            <Border
              ariaLabel={({ datum }) => buildLabel(datum.x, datum._q3)}
              tabIndex={({ index }) => index + 1}
            />
          }
        />
      );

      dataset
        .map(({ x, q3 }) => buildLabel(x, q3))
        .forEach((label, index) => {
          const labeledBorder = screen.getByLabelText(label);
          expect(labeledBorder).toBeDefined();
          expect(labeledBorder.getAttribute("tabindex")).toEqual(
            `${index + 1}`
          );
        });
    });

    it("applies tabIndex and aria-label to line-segmnet primitive", () => {
      render(
        <VictoryBoxPlot
          data={dataset}
          medianComponent={
            <LineSegment
              ariaLabel={({ datum }) => buildLabel(datum.x, datum._median)}
              tabIndex={({ index }) => index + 1}
            />
          }
        />
      );

      dataset
        .map(({ x, median }) => buildLabel(x, median))
        .forEach((label, index) => {
          const labeledLine = screen.getByLabelText(label);
          expect(labeledLine).toBeDefined();
          expect(labeledLine.getAttribute("tabindex")).toEqual(`${index + 1}`);
        });
    });
  });
});
