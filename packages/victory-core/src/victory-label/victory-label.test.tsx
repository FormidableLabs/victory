import React from "react";
import { screen, fireEvent, render } from "@testing-library/react";

import { SVGWrapper } from "../../../../test/helpers";
import { Log } from "../victory-util";
import { VictoryLabel } from "./victory-label";

describe("components/victory-label", () => {
  it("accepts user props", () => {
    render(
      <VictoryLabel
        data-testid="victory-label"
        aria-label="test-aria-label"
        text="label"
      />,
      { wrapper: SVGWrapper },
    );

    expect(screen.getByTestId("victory-label")).toBeDefined();
    expect(screen.getByLabelText("test-aria-label")).toBeDefined();
  });

  it("has expected content with render", () => {
    const { container } = render(<VictoryLabel text="such text, wow" />, {
      wrapper: SVGWrapper,
    });
    expect(container.querySelector("tspan")!.innerHTML).toMatchInlineSnapshot(
      `"such text, wow"`,
    );
  });

  it("sets dx and dy for text element", () => {
    const { container } = render(
      <VictoryLabel dx={30} dy={30} text="such text, wow" />,
      { wrapper: SVGWrapper },
    );
    const output = container.querySelector("text")!;
    expect(output.getAttribute("dx")).toEqual("30");
    // dy = props.dy + (capHeight(0.71) / 2 + (0.5 - length(1) / 2) * lineHeight(1)) * fontSize(14);
    expect(output.getAttribute("dy")).toBeNull();
  });

  it("sets x and y for text element", () => {
    const { container } = render(
      // @ts-expect-error "type string is not assignable to number"
      <VictoryLabel x="100%" y={30} text="such text, wow" />,
      { wrapper: SVGWrapper },
    );
    const output = container.querySelector("text")!;
    expect(output.getAttribute("x")).toEqual("100%");
    expect(parseFloat(output.getAttribute("y")!)).toEqual(34.97);
  });

  it("has a transform property that rotates the text to match the labelAngle getAttribute", () => {
    const { container } = render(
      <VictoryLabel angle={46} text="such text, wow" />,
      { wrapper: SVGWrapper },
    );
    const output = container.querySelector("text")!;
    expect(output.getAttribute("transform")).toContain("rotate(46");
  });

  it("accepts the angle getAttribute as a function", () => {
    const { container } = render(
      <VictoryLabel angle={() => 46} text="such text, wow" />,
      { wrapper: SVGWrapper },
    );
    const output = container.querySelector("text")!;
    expect(output.getAttribute("transform")).toContain("rotate(46");
  });

  it("strips px from fontSize", () => {
    // This suppresses the warning about the fontSize being a string.
    // TODO: For some reason this test file doesn't respect the eslint override for this rule.

    jest.spyOn(console, "warn").mockImplementation(() => {});
    const { container } = render(
      <VictoryLabel
        style={{ fontSize: "10px" }}
        text="such text, wow"
        data-font-size={(props) => props.style.fontSize}
      />,
      { wrapper: SVGWrapper },
    );
    const output = container.querySelector("text")!;
    expect(output.getAttribute("data-font-size")).toEqual("10");
  });

  it("uses a default fontSize when an invalid fontSize is given", () => {
    // This suppresses the console warning for invalid fontSize prop
    // TODO: For some reason this test file doesn't respect the eslint override for this rule.

    jest.spyOn(Log, "warn").mockImplementation(() => {});

    const { container } = render(
      <VictoryLabel style={{ fontSize: "foo" }} text="such text, wow" />,
      { wrapper: SVGWrapper },
    );
    const output = container.querySelector("tspan")!;
    expect(output.getAttribute("style")).toContain("font-size: 14px");
  });

  it("renders an array of text as seperate tspans", () => {
    const { container } = render(
      <VictoryLabel text={["one", "two", "three"]} />,
      { wrapper: SVGWrapper },
    );
    const output = container.querySelectorAll("tspan");
    expect(output.length).toEqual(3);
  });

  it("renders splits newlines into tspans", () => {
    const { container } = render(<VictoryLabel text={"one\ntwo\nthree"} />, {
      wrapper: SVGWrapper,
    });
    const output = container.querySelectorAll("tspan");
    expect(output.length).toEqual(3);
  });

  it("renders title and desc if provided ", () => {
    const { container } = render(
      <VictoryLabel text="title and desc" title="title" desc="desc" />,
      { wrapper: SVGWrapper },
    );

    const { container: container2 } = render(
      <VictoryLabel text="title and desc" />,
      { wrapper: SVGWrapper },
    );

    const title = container.querySelectorAll("title");
    expect(title.length).toEqual(1);

    const desc = container.querySelectorAll("desc");
    expect(desc.length).toEqual(1);

    const noTitle = container2.querySelectorAll("title");
    expect(noTitle.length).toEqual(0);

    const noDesc = container2.querySelectorAll("desc");
    expect(noDesc.length).toEqual(0);
  });

  it("renders tspan styles independently when `style` is an array", () => {
    const fill = ["red", "green", "blue"];
    const { container } = render(
      <VictoryLabel
        text={"one\ntwo\nthree"}
        style={[{ fill: fill[0] }, { fill: fill[1] }, { fill: fill[2] }]}
      />,
      { wrapper: SVGWrapper },
    );
    const output = container.querySelectorAll("tspan");
    output.forEach((tspan, index) => {
      expect(tspan.getAttribute("style")).toContain(`fill: ${fill[index]}`);
    });
  });

  describe("event handling", () => {
    it("attaches an to the parent object", () => {
      const clickHandler = jest.fn();
      const { container } = render(
        <VictoryLabel text="hi" events={{ onClick: clickHandler }} />,
        { wrapper: SVGWrapper },
      );
      fireEvent.click(container.querySelector("text")!);
      expect(clickHandler).toHaveBeenCalled();
    });
  });

  it("renders 'tspan' elements inline when `inline` getAttribute is passed", () => {
    const { container } = render(
      <VictoryLabel text={["Inline", "label", "testing"]} inline dx={5} />,
      { wrapper: SVGWrapper },
    );

    const output = container.querySelectorAll("tspan");
    output.forEach((tspan) => {
      // passing `inline` sets x and dy to undefined
      expect(tspan.getAttribute("x")).toBeNull();
      expect(
        tspan.getAttribute("dy") === null || tspan.getAttribute("dy") === "0",
      ).toBeTruthy();
      expect(tspan.getAttribute("dx")).toEqual("5");
    });
  });

  it("passes lineHeight as an array if provided", () => {
    const lineHeight = [1, 2, 3];
    const expectedDy = [0, 21, 35];
    const { container } = render(
      <VictoryLabel
        text={["lineHeight", "array", "testing"]}
        lineHeight={lineHeight}
      />,
      { wrapper: SVGWrapper },
    );

    const output = container.querySelectorAll("tspan");
    output.forEach((tspan, index) => {
      /*
      to calculate dy:
      ((this.lineHeight[i] + (this.lineHeight[i - 1] || this.lineHeight[0])) / 2)
      */
      expect(parseInt(tspan.getAttribute("dy")!)).toEqual(expectedDy[index]);
    });
  });

  it("defaults lineHeight to 1 if an empty array is provided for lineHeight", () => {
    const expectedDy = [0, 14, 14, 14];
    const { container } = render(
      <VictoryLabel
        text={["lineHeight", "empty", "array", "testing"]}
        lineHeight={[]}
      />,
      { wrapper: SVGWrapper },
    );

    const output = container.querySelectorAll("tspan");
    output.forEach((tspan, index) => {
      expect(parseInt(tspan.getAttribute("dy")!)).toEqual(expectedDy[index]);
    });
  });

  it("defaults style to `defaultStyles` if an empty array is provided for `style`", () => {
    const { container } = render(
      <VictoryLabel text={["style", "empty", "array", "testing"]} style={[]} />,
      { wrapper: SVGWrapper },
    );

    expect(
      container.querySelector("tspan")!.getAttribute("style"),
    ).toMatchInlineSnapshot(
      `"fill: #252525; font-size: 14px; font-family: 'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif; stroke: transparent;"`,
    );
  });

  it("passes id if provided as a string", () => {
    const { container } = render(
      <VictoryLabel text="Some VictoryLabel" id="my-custom-id" />,
      { wrapper: SVGWrapper },
    );

    const output = container.querySelectorAll("text");
    output.forEach((text) => {
      expect(text.getAttribute("id")).toEqual("my-custom-id");
    });
  });

  it("passes id if provided as a number", () => {
    const { container } = render(
      <VictoryLabel text="Some VictoryLabel" id={12345} />,
      { wrapper: SVGWrapper },
    );

    const output = container.querySelectorAll("text");
    output.forEach((text) => {
      expect(text.getAttribute("id")).toEqual("12345");
    });
  });

  it("runs function if id provided as a function", () => {
    const { container } = render(
      <VictoryLabel
        text="Some VictoryLabel"
        id={() => `created-in-function-${Math.random()}`}
      />,
      { wrapper: SVGWrapper },
    );

    const output = container.querySelectorAll("text");
    output.forEach((text) => {
      expect(text.getAttribute("id")).toMatch(/^created-in-function-[\d\.]+$/);
    });
  });
});
