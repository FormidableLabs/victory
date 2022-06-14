import React from "react";
import { VictoryContainer } from "./victory-container";
import { fireEvent, render } from "@testing-library/react";

describe("components/victory-container", () => {
  it("renders an svg with a role of img", () => {
    const { container } = render(<VictoryContainer />);
    const output = container.querySelector("svg")!;
    expect(output.getAttribute("role")).toContain("img");
  });

  it("renders an svg with a custom role", () => {
    const { container } = render(<VictoryContainer role="presentation" />);
    expect(container.querySelector("svg")!.getAttribute("role")).toEqual(
      "presentation"
    );
  });

  it("renders an svg with a title node", () => {
    const { container } = render(<VictoryContainer title="Victory Chart" />);
    expect(container.querySelector("title")).toMatchInlineSnapshot(`
      <title
        id="victory-container-3-title"
      >
        Victory Chart
      </title>
    `);
  });

  it("renders an svg with a desc node", () => {
    const { container } = render(<VictoryContainer desc="description" />);
    expect(container.querySelector("desc")).toMatchInlineSnapshot(`
      <desc
        id="victory-container-4-desc"
      >
        description
      </desc>
    `);
  });

  it("renders an svg with an aria-describedby attribute", () => {
    const { container } = render(
      <VictoryContainer aria-describedby="testid" desc="description" />
    );
    const describedElement = container.querySelector(
      `svg[aria-describedby~="testid"]`
    );
    expect(describedElement).toBeDefined();
  });

  it("renders an svg with an aria-labelledby attribute", () => {
    const { container } = render(
      <VictoryContainer aria-labelledby="testid" title="title" />
    );
    const describedElement = container.querySelector(
      `svg[aria-labelledby~="testid"]`
    );
    expect(describedElement).toBeDefined();
  });

  it("renders an svg with the correct viewbox", () => {
    const width = 300;
    const height = 300;
    const { container } = render(
      <VictoryContainer width={width} height={height} />
    );
    const svg = container.querySelector("svg")!;
    const viewBoxValue = `0 0 ${width} ${height}`;
    expect(svg.getAttribute("viewBox")).toEqual(viewBoxValue);
  });

  it("attaches an event to the container", () => {
    const clickHandler = jest.fn();
    const { container } = render(
      <VictoryContainer events={{ onClick: clickHandler }} />
    );
    const svg = container.querySelector("svg")!;
    fireEvent.click(svg);
    expect(clickHandler).toBeCalled();
  });
});
