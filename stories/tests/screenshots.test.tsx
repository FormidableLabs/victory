import { afterEach, beforeAll, describe, expect, inject, test } from "vitest";
import { page } from "vitest/browser";

import { stories } from "../utils/load-stories";
import { renderStory, unmountStory } from "./render";

// Pixel screenshots of a few stories, to catch what the markup snapshots
// can't: CSS, fills and strokes, clipping, stacking order, text rendering.
// About one story per component, plus the visually tricky ones. Every story
// already has a markup snapshot (`stories.test.tsx`), so keep this list
// short: each screenshot is a PNG to review when rendering changes.
//
// Run in the pinned Playwright container only (`pnpm stories:screenshots`),
// so the pixels match CI. See CONTRIBUTING "Visual Tests".
const SCREENSHOT_STORIES = [
  "victory-charts-victoryarea--polar",
  "victory-charts-victoryarea--stacked",
  "victory-charts-victoryarea--styles",
  "victory-charts-victoryaxis--default",
  "victory-charts-victoryaxis--brush-axis-grid-line",
  "victory-charts-victoryaxis--with-multiline-labels",
  "victory-charts-victorybar--corner-radius",
  "victory-charts-victorybar--disable-inline-styles",
  "victory-charts-victorybar--polar-bars",
  "victory-charts-victorybar--stacked-bars",
  "victory-charts-victoryboxplot--default",
  "victory-charts-victorycandlestick--default",
  "victory-charts-victorychart--victory-brush-container-default",
  "victory-charts-victorychart--victory-cursor-container-default",
  "victory-charts-victorychart--victory-zoom-container-default",
  "victory-charts-victoryerrorbar--default",
  "victory-charts-victoryhistogram--default",
  "victory-charts-victorylabel--angles",
  "victory-charts-victorylabel--background-styles",
  "victory-charts-victorylegend--default",
  "victory-charts-victoryline--interpolation",
  "victory-charts-victoryline--polar",
  "victory-charts-victorypie--default",
  "victory-charts-victorypie--label-indicator",
  "victory-charts-victorypolaraxis--default",
  "victory-charts-victoryscatter--bubble-charts",
  "victory-charts-victoryscatter--symbols",
  "victory-charts-victorytooltip--default",
  "victory-charts-victorytooltip--flyout-style",
];

declare module "vitest" {
  interface ProvidedContext {
    // From `vitest.config.ts`.
    inContainer: boolean;
  }
}

beforeAll(() => {
  if (!inject("inContainer")) {
    throw new Error(
      "Screenshots only match in the pinned Playwright container. Run `pnpm stories:screenshots` from the repo root.",
    );
  }
});

// The viewport in `vitest.config.ts`, which each test resizes.
const VIEWPORT = { width: 1280, height: 800 };

afterEach(async () => {
  unmountStory();
  await page.viewport(VIEWPORT.width, VIEWPORT.height);
});

// One file per story, e.g.
// `__screenshots__/victory-charts-victorybar/bar-ratio.png`
// (`resolveScreenshotPath` in `vitest.config.ts`).
const screenshotName = (id: string) => id.replace("--", "/");

test("lists stories that exist, and has no obsolete screenshots", () => {
  const ids = new Set(stories.map((story) => story.id));
  expect(
    SCREENSHOT_STORIES.filter((id) => !ids.has(id)),
    "Unknown story ids",
  ).toEqual([]);

  const expected = new Set(
    SCREENSHOT_STORIES.map(
      (id) => `./__screenshots__/${screenshotName(id)}.png`,
    ),
  );
  const obsolete = Object.keys(import.meta.glob("./__screenshots__/**")).filter(
    (file) => !expected.has(file),
  );
  expect(obsolete, "Delete these screenshot files").toEqual([]);
});

const selected = stories.filter((story) =>
  SCREENSHOT_STORIES.includes(story.id),
);
for (const [title, group] of Object.entries(
  Object.groupBy(selected, (story) => story.title),
)) {
  describe(title, () => {
    for (const story of group ?? []) {
      test(story.name, async () => {
        const container = await renderStory(story.Component);
        // Element screenshots stop at the viewport's edge, and some stories
        // are taller than the default viewport.
        await page.viewport(
          VIEWPORT.width,
          Math.max(
            VIEWPORT.height,
            Math.ceil(container.getBoundingClientRect().bottom),
          ),
        );
        await expect
          .element(page.elementLocator(container))
          .toMatchScreenshot(screenshotName(story.id));
      });
    }
  });
}
