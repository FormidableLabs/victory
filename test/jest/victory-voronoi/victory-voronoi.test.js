/**
 * Client tests
 */
/*eslint-disable max-nested-callbacks */
import React from "react";
import { range, random } from "lodash";
import { calculateD3Path } from "../../svg-test-helper";
import { VictoryVoronoi, Voronoi } from "victory-voronoi";
import { fireEvent, render } from "@testing-library/react";

describe("components/victory-voronoi", () => {
  describe("default component rendering", () => {
    it("accepts user props", () => {
      const { container } = render(
        <VictoryVoronoi data-testid="victory-voronoi" aria-label="Chart" />
      );

      const svgNode = container.querySelector("svg");
      expect(svgNode.getAttribute("data-testid")).toEqual("victory-voronoi");
      expect(svgNode.getAttribute("aria-label")).toEqual("Chart");
    });

    it("renders an svg with the correct width and height", () => {
      const { container } = render(<VictoryVoronoi />);
      const svg = container.querySelector("svg");
      expect(svg.style.width).toEqual("100%");
      expect(svg.style.height).toEqual("100%");
    });

    it("renders an svg with the correct viewbox", () => {
      const { container } = render(<VictoryVoronoi />);
      const svg = container.querySelector("svg");
      const viewBoxValue = `0 0 ${450} ${300}`;
      expect(svg.getAttribute("viewBox")).toEqual(viewBoxValue);
    });
  });

  describe("component rendering with data", () => {
    it("renders the correct d3 path", () => {
      const props = {
        width: 400,
        height: 300,
        padding: 50,
        domain: { x: [0, 5], y: [0, 5] },
        data: [
          { x: 0, y: 0 },
          { x: 2, y: 3 },
          { x: 4, y: 1 }
        ]
      };
      const { container } = render(<VictoryVoronoi {...props} />);

      expect(container.querySelector("path").getAttribute("d")).toEqual(
        calculateD3Path(props, "voronoi", 0)
      );
    });

    it.skip("sorts data by sortKey prop", () => {
      const data = range(5)
        .map((i) => ({ x: i, y: i }))
        .reverse();
      const { container } = render(<VictoryVoronoi data={data} sortKey="x" />);

      const xValues = container
        .find(Voronoi)
        .map((voronoi) => voronoi.prop("datum")._x);
      expect(xValues).toEqual([0, 1, 2, 3, 4]);
    });

    it.skip("reverses sorted data with the sortOrder prop", () => {
      const data = range(5)
        .map((i) => ({ x: i, y: i }))
        .reverse();
      const { container } = render(
        <VictoryVoronoi data={data} sortKey="x" sortOrder="descending" />
      );

      const xValues = container
        .find(Voronoi)
        .map((voronoi) => voronoi.prop("datum")._x);
      expect(xValues).toEqual([4, 3, 2, 1, 0]);
    });

    it("does not render data with null x or y values", () => {
      const data = [
        { x: 1, y: 2 },
        { x: null, y: 4 },
        { x: 5, y: null },
        { x: 1, y: 2 }
      ];
      const { container } = render(<VictoryVoronoi data={data} />);
      expect(container.querySelectorAll("path")).toHaveLength(2);
    });
  });

  describe("event handling", () => {
    it("attaches an event to the parent svg", () => {
      const clickHandler = jest.fn();
      const { container } = render(
        <VictoryVoronoi
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
        <VictoryVoronoi
          events={[
            {
              target: "data",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
        />
      );
      const data = container.querySelectorAll("path");
      [...data].forEach((node, index) => {
        clickHandler.mockClear();

        fireEvent.click(node);

        expect(clickHandler).toBeCalled();
        // the first argument is the standard evt object
        const [, evProps, evIndex] = clickHandler.mock.calls[0];
        expect(evProps).toMatchObject({ id: `voronoi-data-${index}` });
        expect(evIndex).toEqual(`${index}`);
      });
    });

    it("attaches an event to a label", () => {
      const clickHandler = jest.fn();
      const { container } = render(
        <VictoryVoronoi
          label="okay"
          events={[
            {
              target: "labels",
              eventHandlers: { onClick: clickHandler }
            }
          ]}
        />
      );
      const labels = container.querySelectorAll("text");
      [...labels].forEach((node, index) => {
        clickHandler.mockClear();

        fireEvent.click(node);

        expect(clickHandler).toBeCalled();
        // the first argument is the standard evt object
        const [, evProps, evIndex] = clickHandler.mock.calls[0];
        expect(evProps).toMatchObject({ text: "okay" });
        expect(evIndex).toEqual(`${index}`);
      });
    });
  });

  describe("accessibility", () => {
    it("adds an aria role to the path area", () => {
      const { container } = render(<VictoryVoronoi />);
      container.querySelectorAll("path").forEach((p) => {
        const roleValue = p.getAttribute("role");
        expect(roleValue).toEqual("presentation");
      });
    });

    it("adds an aria-label and tabindex to Voronoi primitive", () => {
      const data = range(3, 6).map((x) => ({ x, y: random(5) }));
      const { container } = render(
        <VictoryVoronoi
          data={data}
          dataComponent={
            <Voronoi
              ariaLabel={({ datum }) => `${datum.x}`}
              tabIndex={({ index }) => index + 6}
            />
          }
        />
      );
      expect(container.querySelectorAll("path")).toHaveLength(3);
      container.querySelectorAll("path").forEach((p, i) => {
        expect(p.getAttribute("aria-label")).toEqual(`${data[i].x}`);
        expect(p.getAttribute("tabindex")).toEqual(`${i + 6}`);
      });
    });
  });
});
