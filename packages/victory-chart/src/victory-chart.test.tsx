import React from "react";
import { VictoryAxis } from "victory-axis";
import { render, screen, fireEvent } from "@testing-library/react";

import { VictoryChart } from "./victory-chart";

describe("components/victory-chart", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const { container } = render(<VictoryChart />);
      const svg = container.querySelector("svg")!;

      expect(svg.getAttribute("style")).toContain("width: 100%; height: 100%");
    });

    it("renders an svg with the correct viewBox", () => {
      const { container } = render(<VictoryChart />);
      const svg = container.querySelector("svg")!;
      const viewBoxValue = `0 0 ${450} ${300}`;

      expect(svg.getAttribute("viewBox")).toEqual(viewBoxValue);
    });
  });

  describe("axis rendering", () => {
    it("renders two axes by default", () => {
      const props = {
        defaultAxes: {
          independent: <VictoryAxis data-testid="axis" />,
          dependent: <VictoryAxis data-testid="axis" dependentAxis />,
        },
      };
      render(<VictoryChart {...props} />);

      const axes = screen.getAllByTestId("axis");

      expect(axes).toHaveLength(2);
    });

    it("renders one axis if one axis is given", () => {
      render(
        <VictoryChart>
          <VictoryAxis data-testid="axis" />
        </VictoryChart>,
      );
      const axes = screen.getAllByTestId("axis");

      expect(axes).toHaveLength(1);
    });

    // TODO: Is this test useful? It's hard to test this with react testing library, which
    // may mean it should be removed.
    it("allows axis to control the crossAxis, and offset props", () => {
      render(
        <VictoryChart>
          <VictoryAxis
            data-testid="axis"
            crossAxis={false}
            offsetX={50}
            offsetY={50}
            data-cross-axis={(props) => props.crossAxis}
            data-offset-x={(props) => props.offsetX}
            data-offset-y={(props) => props.offsetY}
          />
        </VictoryChart>,
      );
      const axis = screen.getByTestId("axis");

      expect(axis.getAttribute("data-cross-axis")).toEqual("false");
      expect(axis.getAttribute("data-offset-x")).toEqual("50");
      expect(axis.getAttribute("data-offset-y")).toEqual("50");
    });

    it("accepts user props", () => {
      render(<VictoryChart data-testid="victory-chart" aria-label="Chart" />);

      expect(screen.getByTestId("victory-chart")).toBeDefined();
      expect(screen.getByLabelText("Chart")).toBeDefined();
    });
  });

  describe("event handling", () => {
    it("attaches an event to the parent svg", () => {
      const clickHandler = jest.fn();
      const { container } = render(
        <VictoryChart
          events={[
            {
              target: "parent",
              eventHandlers: { onClick: clickHandler },
            },
          ]}
        />,
      );
      const svg = container.querySelector("svg")!;

      fireEvent.click(svg);

      expect(clickHandler).toHaveBeenCalled();
    });
  });

  describe("animation", () => {
    it("handles basic animation parameters without crashing", () => {
      const { container } = render(
        <VictoryChart animate={{ duration: 2000, easing: "bounce" }} />,
      );

      expect(container.querySelector("svg")).toBeInTheDocument();
    });
  });
});
