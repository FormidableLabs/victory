import React from "react";
import { render } from "@testing-library/react";

import { Circle } from "./circle";
import { Line } from "./line";
import { Path } from "./path";
import { Rect } from "./rect";
import { Text } from "./text";
import { TSpan } from "./tspan";
import { getSvgProps } from "./svg-props";

// What `VictoryChart`, `VictoryGroup` and `VictoryStack` inject into children,
// plus the primitives' own Victory props.
const victoryProps = {
  active: true,
  animate: { duration: 500 },
  categories: { x: ["a"], y: [] },
  colorScale: "grayscale",
  data: [{ x: 1, y: 1 }],
  disableInlineStyles: false,
  domain: { x: [0, 1], y: [0, 1] },
  domainPadding: 10,
  events: { onClick: () => {} },
  horizontal: false,
  index: 0,
  labelComponent: <text />,
  labels: ["a"],
  name: "chart-line-0",
  origin: { x: 0, y: 0 },
  padding: { top: 50, bottom: 50, left: 50, right: 50 },
  polar: false,
  range: { x: [50, 400], y: [250, 50] },
  scale: { x: () => 0, y: () => 0 },
  standalone: false,
  stringMap: { x: null, y: null },
  theme: { axis: {} },
  xOffset: 0,
};

const primitives = [
  ["Circle", Circle, "circle"],
  ["Line", Line, "line"],
  ["Path", Path, "path"],
  ["Rect", Rect, "rect"],
  ["Text", Text, "text"],
  ["TSpan", TSpan, "tspan"],
] as const;

describe("victory-primitives/svg-props", () => {
  it("drops Victory props and keeps everything else", () => {
    const onClick = () => {};
    expect(
      getSvgProps({
        ...victoryProps,
        d: "M0,0",
        role: "presentation",
        onClick,
      }),
    ).toEqual({ d: "M0,0", role: "presentation", onClick });
  });

  it.each(primitives)(
    "%s doesn't write Victory props to the DOM",
    (_, Primitive, tag) => {
      const error = vi.spyOn(console, "error").mockImplementation(() => {});
      const { container } = render(
        <svg>
          <Primitive {...victoryProps} className="kept" />
        </svg>,
      );
      const element = container.querySelector(tag)!;
      const attributes = [...element.attributes].map((a) => a.name);

      expect(attributes).toContain("class");
      for (const key of Object.keys(victoryProps)) {
        expect(attributes).not.toContain(key.toLowerCase());
      }
      expect(error).not.toHaveBeenCalled();
      error.mockRestore();
    },
  );

  // Also a type test: the primitives accept their element's SVG attributes
  // (#3122).
  it("passes SVG attributes through to the element", () => {
    const { container } = render(
      <svg>
        <Circle cx={1} cy={2} r={3} />
        <Line x1={1} x2={2} y1={3} y2={4} strokeDasharray="4,2" />
        <Path d="M0,0L1,1" fillOpacity={0.5} />
        <Rect x={1} y={2} width={3} height={4} rx={1} />
        <Text x={1} y={2} dy="0.5em" textAnchor="middle">
          <TSpan x={1} dx={2} fontSize={12}>
            label
          </TSpan>
        </Text>
      </svg>,
    );
    const attributes = (tag: string) =>
      Object.fromEntries(
        [...container.querySelector(tag)!.attributes].map((a) => [
          a.name,
          a.value,
        ]),
      );

    expect(attributes("circle")).toMatchObject({ cx: "1", cy: "2", r: "3" });
    expect(attributes("line")).toMatchObject({
      x1: "1",
      x2: "2",
      y1: "3",
      y2: "4",
      "stroke-dasharray": "4,2",
    });
    expect(attributes("path")).toMatchObject({
      d: "M0,0L1,1",
      "fill-opacity": "0.5",
    });
    expect(attributes("rect")).toMatchObject({
      x: "1",
      y: "2",
      width: "3",
      height: "4",
      rx: "1",
    });
    expect(attributes("text")).toMatchObject({
      x: "1",
      y: "2",
      dy: "0.5em",
      "text-anchor": "middle",
    });
    expect(attributes("tspan")).toMatchObject({
      x: "1",
      dx: "2",
      "font-size": "12",
    });
  });
});
