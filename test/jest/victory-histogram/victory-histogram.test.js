import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { range } from "lodash";
import { VictoryHistogram } from "victory-histogram";
import { isBar, getBarHeight } from "../../svg-test-helper";

describe("components/victory-histogram", () => {
  const DATA_COMPONENT_ID = "data-component-id";
  const DataComponent = () => <div data-testid={DATA_COMPONENT_ID} />;

  describe("default component rendering", () => {
    it("accepts user props", () => {
      render(
        <VictoryHistogram data-testid="victory-histogram" aria-label="Chart" />
      );

      const [svgNode] = screen.getAllByTestId("victory-histogram");
      expect(svgNode.getAttribute("aria-label")).toEqual("Chart");
    });

    it("renders an svg with the correct width and height", () => {
      const { container } = render(<VictoryHistogram />);
      const svg = container.querySelector("svg");
      expect(svg.getAttribute("style")).toContain("width: 100%; height: 100%");
    });

    it("renders an svg with the correct viewBox", () => {
      const { container } = render(<VictoryHistogram />);
      const svg = container.querySelector("svg");
      const viewBoxValue = `0 0 ${450} ${300}`;
      expect(svg.getAttribute("viewBox")).toEqual(viewBoxValue);
    });

    it("renders 0 bars", () => {
      const { container } = render(<VictoryHistogram />);
      const bars = container.querySelectorAll("path");
      expect(bars).toHaveLength(0);
    });

    it("renders 4 bars", () => {
      const { container } = render(
        <VictoryHistogram bins={[0, 10, 40, 50, 100]} />
      );
      const bars = container.querySelectorAll("path");
      expect(bars).toHaveLength(4);
    });

    it("renders each bar as a rectangle", () => {
      const { container } = render(<VictoryHistogram bins={[0, 10, 40, 50]} />);
      const barCommandStrings = Array.from(
        container.querySelectorAll("path")
      ).map((bar) => bar.getAttribute("d"));

      barCommandStrings.forEach((commandString) => {
        expect(isBar(commandString)).toBeTruthy();
      });
    });
  });

  describe("rendering data", () => {
    it("renders bars for {x} shaped data (default)", () => {
      const data = range(5).map((i) => ({ x: i }));
      const { container } = render(<VictoryHistogram data={data} />);
      const bars = container.querySelectorAll("path");
      expect(bars.length).toEqual(4);
    });

    it("renders bars for deeply-nested data", () => {
      const data = range(5).map((i) => ({ a: { b: [{ x: i }] } }));
      const { container } = render(
        <VictoryHistogram data={data} x="a.b[0].x" />
      );
      const bars = container.querySelectorAll("path");
      expect(bars.length).toEqual(4);
    });

    it("renders 2 bars of equal height", () => {
      const data = [{ x: 2 }, { x: 3 }];
      const { container } = render(
        <VictoryHistogram data={data} bins={[2, 2.5, 3]} />
      );
      const bars = Array.from(container.querySelectorAll("path"));
      const [height1, height2] = bars.map((bar) =>
        getBarHeight(bar.getAttribute("d"))
      );

      expect(bars).toHaveLength(2);
      expect(height1).toEqual(height2);
      expect(height1).toBeGreaterThan(0);
    });

    it("renders bars values with null accessor", () => {
      const data = range(10);
      render(
        <VictoryHistogram
          data={data}
          x={null}
          y={null}
          dataComponent={<DataComponent />}
        />
      );
      const bars = screen.getAllByTestId(DATA_COMPONENT_ID);
      expect(bars.length).toBeGreaterThan(0);
    });

    it("renders bars with appropriate relative heights", () => {
      const { container } = render(
        <VictoryHistogram
          data={[{ x: 1 }, { x: 2 }, { x: 2 }, { x: 3 }, { x: 3 }, { x: 3 }]}
          bins={[1, 2, 3, 4]}
        />
      );
      const bars = Array.from(container.querySelectorAll("path"));
      const [height1, height2, height3] = bars.map((bar) =>
        getBarHeight(bar.getAttribute("d"))
      );

      expect(height2 / 2).toBeCloseTo(height1);
      expect((height3 * 2) / 3).toBeCloseTo(height2);
    });
  });

  describe("event handling", () => {
    const clickHandler = jest.fn();

    beforeEach(() => {
      clickHandler.mockReset();
    });

    it("attaches an event to the parent svg", () => {
      const { container } = render(
        <VictoryHistogram
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

      expect(clickHandler).toHaveBeenCalled();
      // the first argument is the standard event object
      const contextualArg = clickHandler.mock.calls[0][1];
      expect(contextualArg.key).toEqual("histogram-parent-parent");
    });

    it("attaches an event to data", () => {
      const { container } = render(
        <VictoryHistogram
          data={[{ x: 1 }, { x: 1 }, { x: 2 }]}
          bins={[1, 2, 3]}
          events={[
            {
              target: "data",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
        />
      );

      const data = container.querySelectorAll("path");
      expect(data).toHaveLength(2);

      data.forEach((node, index) => {
        clickHandler.mockReset();
        fireEvent.click(node);
        expect(clickHandler).toHaveBeenCalled();
        const contextualObject = clickHandler.mock.calls[0][1];
        expect(contextualObject.key).toEqual(`histogram-data-${index}`);
      });
    });

    it("attaches an event to a label", () => {
      const data = [{ x: 0 }, { x: 1 }, { x: 2 }];
      render(
        <VictoryHistogram
          data={data}
          bins={[0, 1, 2, 3]}
          events={[
            {
              target: "labels",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
          labels={({ datum }) => `Label: ${datum.x}`}
        />
      );

      data.forEach((datum) => {
        clickHandler.mockReset();
        const label = screen.getByText(`Label: ${datum.x + 0.5}`);
        fireEvent.click(label);
        expect(clickHandler).toHaveBeenCalled();
      });
    });
  });

  describe("accessibility", () => {
    it("adds an aria role to each bar in the series", () => {
      const data = range(5).map((x) => ({ x }));
      const { container } = render(<VictoryHistogram data={data} />);

      container.querySelectorAll("path").forEach((bar) => {
        expect(bar.getAttribute("role")).toEqual("presentation");
      });
    });
  });
});
