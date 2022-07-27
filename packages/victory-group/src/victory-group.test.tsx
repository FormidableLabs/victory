import { render, screen } from "@testing-library/react";
import React from "react";
import { VictoryBar } from "victory-bar";
import { VictoryGroup } from "victory-group";

describe("components/victory-group", () => {
  it("has a static role", () => {
    expect(VictoryGroup.role).toEqual("group");
  });

  describe("default component rendering", () => {
    it("renders an svg with the correct width and height", () => {
      const { container } = render(
        <VictoryGroup>
          <VictoryBar />
          <VictoryBar />
        </VictoryGroup>,
      );
      const svg = container.querySelector("svg");
      expect(svg?.style.width).toEqual("100%");
      expect(svg?.style.height).toEqual("100%");
    });

    it("renders an svg with the correct viewBox", () => {
      const { container } = render(
        <VictoryGroup>
          <VictoryBar />
          <VictoryBar />
        </VictoryGroup>,
      );
      const svg = container.querySelector("svg");
      const viewBoxValue = `0 0 ${450} ${300}`;
      expect(svg?.getAttribute("viewBox")).toEqual(viewBoxValue);
    });

    it("accepts user props", () => {
      render(
        <VictoryGroup data-testid="victory-group" aria-label="Group">
          <VictoryBar />
          <VictoryBar />
        </VictoryGroup>,
      );

      expect(screen.getByTestId("victory-group")).toBeDefined();
      expect(screen.getByLabelText("Group")).toBeDefined();
    });
  });
});
