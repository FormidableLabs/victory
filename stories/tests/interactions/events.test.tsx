import { describe, expect, test } from "vitest";
import { userEvent } from "vitest/browser";

import {
  at,
  dataElements,
  renderStoryById,
  setupInteractionTests,
} from "./helpers";

// The `events` prop (handlers that return mutations) and
// VictorySharedEvents.

setupInteractionTests();

describe("events prop", () => {
  test("a click on the area toggles every area's fill (data target)", async () => {
    const { svg } = await renderStoryById("victory-charts-victoryarea--events");
    const fills = () => dataElements(svg).map((path) => path.style.fill);
    expect(fills()).toEqual(["tomato"]);

    await userEvent.click(dataElements(svg)[0]);
    await expect.poll(fills).toEqual(["black"]);

    await userEvent.click(dataElements(svg)[0]);
    await expect.poll(fills).toEqual(["tomato"]);
  });

  test("a click on the line toggles its stroke (parent target)", async () => {
    const { svg } = await renderStoryById("victory-charts-victoryline--events");
    const [line] = dataElements(svg) as SVGPathElement[];
    const style = () => {
      const { stroke, strokeWidth } = dataElements(svg)[0].style;
      return { stroke, strokeWidth };
    };
    expect(style()).toEqual({ stroke: "rgb(196, 58, 49)", strokeWidth: "2" });

    // The handler is on the line's group, which only the stroke fills.
    const point = line.getPointAtLength(line.getTotalLength() / 2);
    await userEvent.click(svg, { position: at(svg, point.x, point.y) });
    await expect.poll(style).toEqual({ stroke: "black", strokeWidth: "5" });

    await userEvent.click(svg, { position: at(svg, point.x, point.y) });
    await expect
      .poll(style)
      .toEqual({ stroke: "rgb(196, 58, 49)", strokeWidth: "2" });
  });
});

describe("VictorySharedEvents", () => {
  test("hovering a bar highlights it and the matching slice", async () => {
    const { svg } = await renderStoryById(
      "victory-charts-victorysharedevents--default",
    );
    const fills = (selector: string) =>
      dataElements(svg.querySelector(selector)!).map((path) => path.style.fill);
    const bars = () => fills("g[transform='translate(150, 50)']");
    const slices = () => fills("g[transform='translate(0, -75)']");
    const initialBars = bars();
    const initialSlices = slices();

    await userEvent.hover(dataElements(svg)[1]);
    await expect.poll(bars).toEqual(initialBars.with(1, "tomato"));
    expect(slices()).toEqual(initialSlices.with(1, "tomato"));

    await userEvent.unhover(dataElements(svg)[1]);
    await expect.poll(bars).toEqual(initialBars);
    expect(slices()).toEqual(initialSlices);
  });
});
