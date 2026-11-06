import { expect, test } from "vitest";
import { userEvent } from "vitest/browser";

import {
  centerOf,
  dataElements,
  renderStoryById,
  setupInteractionTests,
  texts,
} from "./helpers";

// Tooltips that show on hover: VictoryTooltip's own events, and
// VictoryVoronoiContainer (the #3048 report: no tooltips and no active
// points after upgrading React).

setupInteractionTests();

test("VictoryTooltip shows while its bar is hovered", async () => {
  const { container, svg } = await renderStoryById(
    "victory-charts-victorytooltip--hover",
  );
  expect(texts(container)).toEqual([]);

  await userEvent.hover(dataElements(svg)[1]);
  await expect.poll(() => texts(container)).toEqual(["y: 4.7"]);

  await userEvent.unhover(dataElements(svg)[1]);
  await expect.poll(() => texts(container)).toEqual([]);
});

test("VictoryVoronoiContainer activates the nearest point", async () => {
  const { container, svg } = await renderStoryById(
    "victory-charts-victorychart--victory-voronoi-container-default",
  );
  const tooltip = () => texts(container).filter((text) => text?.includes(":"));
  const widths = () =>
    dataElements(svg).map((point) =>
      Math.round(point.getBoundingClientRect().width),
    );
  const [size] = widths();
  expect(tooltip()).toEqual([]);

  // Near the third point, not on it.
  const point = centerOf(svg, dataElements(svg)[2]);
  await userEvent.hover(svg, {
    position: { x: point.x + 10, y: point.y + 10 },
  });
  await expect.poll(tooltip).toEqual(["x: 3, y: 7.6"]);
  // The active point is drawn bigger (`size` from `active`).
  expect(widths()[2]).toBeGreaterThan(size);
  expect(widths().toSpliced(2, 1)).toEqual(Array(7).fill(size));

  await userEvent.unhover(svg);
  await expect.poll(tooltip).toEqual([]);
  expect(widths()).toEqual(Array(8).fill(size));
});
