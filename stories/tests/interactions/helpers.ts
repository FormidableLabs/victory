import { afterEach, beforeEach, expect, vi } from "vitest";

import { stories } from "../../utils/load-stories";
import { recordConsole } from "../console";
import { renderStory, unmountStory } from "../render";

// Helpers for the interaction tests: render a story by id, drive it with
// `userEvent` from `vitest/browser` (Playwright's mouse, so the browser
// hit-tests and dispatches the events as it would for a user), then check
// what the user would see change.

// Call once per test file: unmounts the story after each test, and fails a
// test that logs a `console.error` or `console.warn` (cleanup included), as
// the markup tests do.
export const setupInteractionTests = () => {
  let messages: string[] = [];
  beforeEach(() => {
    messages = recordConsole();
  });
  afterEach(() => {
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
