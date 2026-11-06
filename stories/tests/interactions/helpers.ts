import { afterEach, beforeEach, expect, inject, vi } from "vitest";

import { stories } from "../../utils/load-stories";
import { recordConsole } from "../console";
import { renderStory, unmountStory } from "../render";

// Helpers for the interaction tests: render a story by id, drive it with
// `userEvent` from `vitest/browser` (Playwright's mouse, so the browser
// hit-tests and dispatches the events as it would for a user), then check
// what the user would see change.

declare module "vitest" {
  interface ProvidedContext {
    // From `vitest.config.ts` (`SLOW_MO`).
    slowMo: number;
  }
}

const slowMo = inject("slowMo");

// Slow mode only (`pnpm stories:interactions:watch`): Playwright's mouse has
// no pointer on screen, so draw one, and show which test is running.
const showProgress = () => {
  const pointer = document.createElement("div");
  pointer.style.cssText =
    "position:fixed;z-index:1000;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;background:rgb(255 0 0 / 0.6);pointer-events:none;left:-20px;top:-20px";
  const caption = document.createElement("div");
  caption.style.cssText =
    "position:fixed;z-index:1000;right:16px;bottom:16px;padding:8px 12px;background:#222;color:#fff;font:14px sans-serif;pointer-events:none";
  document.body.append(pointer, caption);
  for (const type of ["pointermove", "pointerdown", "wheel"]) {
    document.addEventListener(
      type,
      (event) => {
        const { clientX, clientY } = event as MouseEvent;
        pointer.style.left = `${clientX}px`;
        pointer.style.top = `${clientY}px`;
      },
      { capture: true, passive: true },
    );
  }
  return caption;
};
const caption = slowMo ? showProgress() : undefined;

// Call once per test file: unmounts the story after each test, and fails a
// test that logs a `console.error` or `console.warn` (cleanup included), as
// the markup tests do.
export const setupInteractionTests = () => {
  let messages: string[] = [];
  beforeEach(() => {
    messages = recordConsole();
    if (caption) {
      caption.textContent = expect.getState().currentTestName ?? "";
    }
  });
  afterEach(async () => {
    if (slowMo) {
      // Time to see the result before the next test.
      await new Promise((resolve) => setTimeout(resolve, slowMo * 4));
    }
    unmountStory();
    vi.restoreAllMocks();
    expect(messages, "Console errors and warnings").toEqual([]);
  });
};

// Renders a story by id (as in `stories.test.tsx`). Returns the story's
// container and its first `<svg>`: the chart, for the stories these tests
// use. Tooltips render in a portal, a second `<svg>` after it.
export const renderStoryById = async (id: string) => {
  const story = stories.find((candidate) => candidate.id === id);
  if (!story) {
    throw new Error(`No story with id ${id}`);
  }
  const container = await renderStory(story.Component);
  const svg = container.querySelector("svg");
  if (!svg) {
    throw new Error(`Story ${id} rendered no <svg>`);
  }
  return { container, svg };
};

export interface Position {
  x: number;
  y: number;
}

// A point in the svg's own coordinates (its viewBox: `width` x `height` for a
// Victory chart) as a `position` for `userEvent`, which is relative to the
// element's box. Stories render wider than their viewBox (responsive charts
// in a two-column grid), so the two differ.
export const at = (svg: SVGSVGElement, x: number, y: number): Position => {
  const point = new DOMPoint(x, y).matrixTransform(svg.getScreenCTM()!);
  const box = svg.getBoundingClientRect();
  return { x: point.x - box.left, y: point.y - box.top };
};

// The center of an element, as a `position` relative to `svg`.
export const centerOf = (svg: SVGSVGElement, element: Element): Position => {
  const box = svg.getBoundingClientRect();
  const target = element.getBoundingClientRect();
  return {
    x: target.left + target.width / 2 - box.left,
    y: target.top + target.height / 2 - box.top,
  };
};

// The text of every `<text>` element: axis tick labels, legends, tooltips.
export const texts = (element: Element) =>
  [...element.querySelectorAll("text")].map((text) => text.textContent);

// Victory's data elements (points, bars, slices, lines, areas).
export const dataElements = (element: Element) => [
  ...element.querySelectorAll<SVGElement>("path[role='presentation']"),
];

// Numeric attributes, rounded to whole viewBox pixels.
export const attributes = (element: Element | null, names: string[]) =>
  Object.fromEntries(
    names.map((name) => [
      name,
      Math.round(Number(element?.getAttribute(name))),
    ]),
  );
