import React from "react";
import random from "lodash/random";
import { fireEvent, render, screen } from "@testing-library/react";
import { Helpers } from "victory-core";

import { calculateD3Path } from "../../../test/helpers";
import { VictoryVoronoi, VictoryVoronoiProps } from "./victory-voronoi";
import { Voronoi } from "./voronoi";

describe("components/victory-voronoi", () => {
  describe("default component rendering", () => {
    it("accepts user props", () => {
      const { container } = render(
        <VictoryVoronoi data-testid="victory-voronoi" aria-label="Chart" />,
      );

      const svgNode = container.querySelector("svg");
      expect(svgNode).toHaveAttribute("data-testid", "victory-voronoi");
      expect(svgNode).toHaveAttribute("aria-label", "Chart");
    });

    it("renders an svg with the correct width and height", () => {
      const { container } = render(<VictoryVoronoi />);
      const svg = container.querySelector("svg");
      expect(svg?.style.width).toEqual("100%");
      expect(svg?.style.height).toEqual("100%");
    });

    it("renders an svg with the correct viewbox", () => {
      const { container } = render(<VictoryVoronoi />);
      const svg = container.querySelector("svg");
      const viewBoxValue = `0 0 ${450} ${300}`;
      expect(svg).toHaveAttribute("viewBox", viewBoxValue);
    });
  });

  describe("component rendering with data", () => {
    it("renders the correct d3 path", () => {
      const props: VictoryVoronoiProps = {
        width: 400,
        height: 300,
        padding: 50,
        domain: { x: [0, 5], y: [0, 5] },
        data: [
          { x: 0, y: 0 },
          { x: 2, y: 3 },
          { x: 4, y: 1 },
        ],
      };
      const { container } = render(<VictoryVoronoi {...props} />);

      expect(container.querySelector("path")).toHaveAttribute(
        "d",
        calculateD3Path(props, "voronoi", 0),
      );
    });

    it("sorts data by sortKey prop", () => {
      const data = Helpers.range(5)
        .map((i) => ({ x: i, y: i }))
        .reverse();
      render(
        <VictoryVoronoi
          data={data}
          sortKey="x"
          dataComponent={
            <Voronoi data-testid="voronoi-1" data-props-json={JSON.stringify} />
          }
        />,
      );

      const renderedDataProps = screen
        .getAllByTestId("voronoi-1")
        .map((node) => JSON.parse(node.getAttribute("data-props-json") || ""));
      expect(renderedDataProps.map((props) => props.datum._x)).toEqual([
        0, 1, 2, 3, 4,
      ]);
    });

    it("reverses sorted data with the sortOrder prop", () => {
      const data = Helpers.range(5)
        .map((i) => ({ x: i, y: i }))
        .reverse();
      render(
        <VictoryVoronoi
          data={data}
          sortKey="x"
          sortOrder="descending"
          dataComponent={
            <Voronoi data-testid="voronoi-1" data-props-json={JSON.stringify} />
          }
        />,
      );

      const renderedDataProps = screen
        .getAllByTestId("voronoi-1")
        .map((node) => JSON.parse(node.getAttribute("data-props-json") || ""));

      expect(renderedDataProps.map((props) => props.datum._x)).toEqual([
        4, 3, 2, 1, 0,
      ]);
    });

    it("does not render data with null x or y values", () => {
      const data = [
        { x: 1, y: 2 },
        { x: null, y: 4 },
        { x: 5, y: null },
        { x: 1, y: 2 },
      ];
      const { container } = render(<VictoryVoronoi data={data} />);
      const paths = container.querySelectorAll("path");
      expect(paths).toHaveLength(2);
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
              eventHandlers: { onClick: clickHandler },
            },
          ]}
        />,
      );
      const svg = container.querySelector("svg");
      fireEvent.click(svg!);
      expect(clickHandler).toBeCalled();
      // the first argument is the standard evt object
      expect(Object.keys(clickHandler.mock.calls[0][1])).toEqual(
        expect.arrayContaining(["data", "scale", "width", "height", "style"]),
      );
    });

    it("attaches an event to data", () => {
      const clickHandler = jest.fn();
      const { container } = render(
        <VictoryVoronoi
          events={[
            {
              target: "data",
              eventHandlers: { onClick: clickHandler },
            },
          ]}
        />,
      );
      const data = container.querySelectorAll("path");
      expect(data).toHaveLength(51);
      data.forEach((node, index) => {
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
          labels={["okay"]}
          events={[
            {
              target: "labels",
              eventHandlers: { onClick: clickHandler },
            },
          ]}
        />,
      );

      const labels = container.querySelectorAll("text");

      expect(labels).toHaveLength(1);

      labels.forEach((node, index) => {
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
      const paths = container.querySelectorAll("path");
      expect(paths).toHaveLength(51);
      paths.forEach((p) => {
        expect(p).toHaveAttribute("role", "presentation");
      });
    });

    it("adds an aria-label and tabindex to Voronoi primitive", () => {
      const data = Helpers.range(3, 6).map((x) => ({ x, y: random(5) }));
      const { container } = render(
        <VictoryVoronoi
          data={data}
          dataComponent={
            <Voronoi
              ariaLabel={({ datum }) => `${datum.x}`}
              tabIndex={({ index }) => Number(index) + 6}
            />
          }
        />,
      );
      const paths = container.querySelectorAll("path");
      expect(paths).toHaveLength(3);
      paths.forEach((p, i) => {
        expect(p).toHaveAttribute("aria-label", `${data[i].x}`);
        expect(p).toHaveAttribute("tabindex", `${i + 6}`);
      });
    });
  });
});
