/* eslint-disable no-console */

import { render } from "@testing-library/react";
import React from "react";
import { VictoryBar } from "victory-bar";
import { VictoryHistogram } from "victory-histogram";
import { VictoryArea } from "victory-area";

import { VictoryStack } from "./victory-stack";

describe("components/victory-stack", () => {
  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const { container } = render(
        <VictoryStack>
          <VictoryBar />
          <VictoryBar />
        </VictoryStack>,
      );
      const svg = container.querySelector("svg")!;
      expect(svg.style.width).toEqual("100%");
      expect(svg.style.height).toEqual("100%");
    });

    it("renders an svg with the correct viewBox", () => {
      const { container } = render(
        <VictoryStack>
          <VictoryBar />
          <VictoryBar />
        </VictoryStack>,
      );
      const svg = container.querySelector("svg")!;
      const viewBoxValue = `0 0 ${450} ${300}`;
      expect(svg.getAttribute("viewBox")).toEqual(viewBoxValue);
    });

    it("accepts user props", () => {
      const { container } = render(
        <VictoryStack data-testid="victory-stack" aria-label="Stack">
          <VictoryBar />
          <VictoryBar />
        </VictoryStack>,
      );

      const svgNode = container.querySelector("svg")!;
      expect(svgNode.getAttribute("data-testid")).toEqual("victory-stack");
      expect(svgNode.getAttribute("aria-label")).toEqual("Stack");
    });
  });

  describe("children data", () => {
    it("should be able to handle all null values when using dates", () => {
      const { container } = render(
        <VictoryStack data-testid="victory-stack" aria-label="Stack">
          <VictoryArea data={[{ x: new Date(2006, 1, 1), y: null }]} />
          <VictoryArea data={[{ x: new Date(2006, 1, 1), y: 2 }]} />
        </VictoryStack>,
      );

      const svgNode = container.querySelector("svg")!;
      expect(svgNode.getAttribute("data-testid")).toEqual("victory-stack");
      expect(svgNode.getAttribute("aria-label")).toEqual("Stack");
    });
  });

  describe("warnings", () => {
    beforeEach(() => {
      jest.spyOn(console, "warn").mockImplementation(() => {});
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should warn when histogram children are mixed with non-histogram children", () => {
      render(
        <VictoryStack>
          <VictoryHistogram />
          <VictoryBar />
        </VictoryStack>,
      );

      expect(console.warn).toHaveBeenCalledWith(
        "VictoryHistogram only supports being stacked with other VictoryHistogram components. Check to make sure that you are only passing VictoryHistogram components to VictoryStack",
      );
    });

    it("should not warn when only histogram children are passed", () => {
      render(
        <VictoryStack>
          <VictoryHistogram />
          <VictoryHistogram />
        </VictoryStack>,
      );

      expect(console.warn).not.toHaveBeenCalled();
    });
  });
});
