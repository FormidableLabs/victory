import { describe, expect, test } from "vitest";
import { userEvent } from "vitest/browser";

import {
  at,
  attributes,
  dataElements,
  renderStoryById,
  setupInteractionTests,
  texts,
} from "./helpers";

// Container components, which handle the mouse on the chart's `<svg>`. The
// charts are 400 x 350 with 50px padding, so the plot area is x 50-350,
// y 50-300 (in viewBox units; see `at`).

setupInteractionTests();

const drag = (
  svg: SVGSVGElement,
  from: [number, number],
  to: [number, number],
) =>
  userEvent.dragAndDrop(svg, svg, {
    sourcePosition: at(svg, ...from),
    targetPosition: at(svg, ...to),
  });

// The x axis tick labels of a time scale.
const years = (svg: SVGSVGElement) =>
  texts(svg)
    .filter((text) => /^\d{4}$/.test(text ?? ""))
    .map(Number);

describe("VictoryZoomContainer", () => {
  const id = "victory-charts-victorychart--victory-zoom-container-default";

  test("dragging pans", async () => {
    const { svg } = await renderStoryById(id);
    expect(years(svg)).toEqual([1994, 1996, 1998, 2000, 2002, 2004]);

    // A third of the plot width to the left: the 12-year domain moves 4
    // years later.
    await drag(svg, [250, 150], [150, 150]);
    await expect
      .poll(() => years(svg))
      .toEqual([1998, 2000, 2002, 2004, 2006, 2008]);
  });

  test("the wheel zooms in", async () => {
    const { svg } = await renderStoryById(id);
    const span = () => years(svg).at(-1)! - years(svg)[0];
    expect(span()).toBe(10);

    await userEvent.wheel(svg, { delta: { y: -300 } });
    // `onWheel` is throttled.
    await expect.poll(span).toBeLessThan(10);
  });

  test("a legend with a title in a zoomable chart", async () => {
    const { svg } = await renderStoryById(
      "victory-charts-victorychart--victory-zoom-container-with-legend",
    );
    const ticks = () => texts(svg).slice(3);
    expect(texts(svg).slice(0, 3)).toEqual(["Series", "One", "Two"]);
    const initialTicks = ticks();

    await userEvent.wheel(svg, { delta: { y: -300 } });
    await expect.poll(ticks).not.toEqual(initialTicks);
    expect(texts(svg).slice(0, 3)).toEqual(["Series", "One", "Two"]);
  });
});

describe("VictoryBrushContainer", () => {
  test("dragging draws, moves and clears the brush", async () => {
    const { svg } = await renderStoryById(
      "victory-charts-victorychart--victory-brush-container-default",
    );
    const brush = () =>
      attributes(svg.querySelector("rect[cursor='move']"), [
        "x",
        "y",
        "width",
        "height",
      ]);
    // With no brush domain, the brush covers the whole plot area.
    expect(brush()).toEqual({ x: 50, y: 50, width: 300, height: 250 });

    await drag(svg, [100, 100], [200, 200]);
    await expect
      .poll(brush)
      .toEqual({ x: 100, y: 100, width: 100, height: 100 });

    await drag(svg, [150, 150], [200, 170]);
    await expect
      .poll(brush)
      .toEqual({ x: 150, y: 120, width: 100, height: 100 });

    // A click outside the brush resets it.
    await userEvent.click(svg, { position: at(svg, 320, 280) });
    await expect.poll(brush).toEqual({ x: 50, y: 50, width: 300, height: 250 });
  });
});

describe("VictoryBrushLine", () => {
  test("dragging along the axis draws a brush", async () => {
    const { svg } = await renderStoryById(
      "victory-charts-victoryaxis--brush-axis",
    );
    // The brush area, then (once there's a selection) the brush and its two
    // handles.
    const rects = () =>
      [...svg.querySelectorAll("rect")].map((rect) =>
        attributes(rect, ["x", "width"]),
      );
    expect(rects()).toEqual([{ x: 50, width: 300 }]);

    await drag(svg, [100, 300], [200, 300]);
    await expect.poll(rects).toEqual([
      { x: 50, width: 300 },
      { x: 100, width: 100 },
      { x: 95, width: 10 },
      { x: 195, width: 10 },
    ]);
  });
});

describe("VictoryCursorContainer", () => {
  test("the cursor follows the mouse", async () => {
    const { svg } = await renderStoryById(
      "victory-charts-victorychart--victory-cursor-container-default",
    );
    const cursor = () => {
      const lines = [...svg.querySelectorAll("line")].filter(
        (line) => line.style.stroke === "black",
      );
      return lines.map((line) => attributes(line, ["x1", "y1"]));
    };
    // `defaultCursorValue` (0.25, 0.75) on the default 0-1 domains.
    expect(cursor()).toEqual([
      { x1: 125, y1: 50 },
      { x1: 50, y1: 113 },
    ]);

    await userEvent.hover(svg, { position: at(svg, 200, 150) });
    await expect.poll(cursor).toEqual([
      { x1: 200, y1: 50 },
      { x1: 50, y1: 150 },
    ]);
  });
});

describe("VictorySelectionContainer", () => {
  test("dragging selects the points inside; a click clears", async () => {
    const { svg } = await renderStoryById(
      "victory-charts-victorychart--victory-selection-container-default",
    );
    const selected = () =>
      dataElements(svg).map((point) => point.style.fill === "tomato");
    expect(selected()).toEqual(Array(10).fill(false));

    await drag(svg, [50, 50], [250, 300]);
    await expect.poll(selected).toEqual(
      // prettier-ignore
      [true, true, true, true, false, true, true, false, false, false],
    );

    await userEvent.click(svg, { position: at(svg, 300, 100) });
    await expect.poll(selected).toEqual(Array(10).fill(false));
  });
});

describe("createContainer", () => {
  test("a zoom + voronoi container shows tooltips and pans", async () => {
    const { container, svg } = await renderStoryById(
      "victory-charts-victorychart--victory-zoom-voronoi-container",
    );
    const tooltip = () =>
      texts(container).filter((text) => text?.startsWith("y:"));
    const xTicks = () => texts(svg).filter((text) => text?.endsWith(".0"));
    expect(xTicks()).toEqual(["3.0", "4.0", "5.0", "6.0", "7.0", "8.0"]);

    await userEvent.hover(svg, { position: at(svg, 200, 150) });
    await expect.poll(tooltip).toEqual(["y: 1.2"]);

    await drag(svg, [250, 150], [150, 150]);
    await expect.poll(xTicks).toEqual(["5.0", "6.0", "7.0", "8.0", "9.0"]);
  });
});
