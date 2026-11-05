import React from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, test, vi } from "vitest";

import { stories } from "../utils/load-stories";
import { serialize } from "./serialize";

// Console errors and warnings a story is allowed to log, by story id. Any
// other `console.error` or `console.warn` (React's warnings included) fails
// the story's test. Empty: fix the story instead where you can.
const ALLOWED_CONSOLE: Record<string, RegExp[]> = {};

let root: Root | undefined;
let container: HTMLElement | undefined;

const unmountStory = () => {
  root?.unmount();
  container?.remove();
  root = container = undefined;
};

// Cleans up after a test that failed before unmounting its story.
afterEach(() => {
  unmountStory();
  vi.restoreAllMocks();
});

// Records what's logged, and still logs it.
const recordConsole = () => {
  const messages: string[] = [];
  for (const method of ["error", "warn"] as const) {
    const original = console[method];
    vi.spyOn(console, method).mockImplementation((...args: unknown[]) => {
      messages.push(`console.${method}: ${args.map(String).join(" ")}`);
      original(...args);
    });
  }
  return messages;
};

// The first render, after effects: what Storybook showed before any
// interaction. Snapshots are compared before animations or timers run.
const renderStory = async (Story: React.ComponentType) => {
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  flushSync(() => root!.render(<Story />));
  await settle(container);
};

const nextFrame = () =>
  new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve)));

// Mount effects set state that renders more (VictoryClipContainer's clip id,
// VictoryPortal's children), scheduled by React rather than flushed with the
// first render. Wait until the markup stops changing.
const MAX_FRAMES = 20;
const settle = async (element: HTMLElement) => {
  let markup = element.innerHTML;
  for (let frame = 0; frame < MAX_FRAMES; frame++) {
    await nextFrame();
    if (element.innerHTML === markup) {
      return;
    }
    markup = element.innerHTML;
  }
  throw new Error(`Still changing after ${MAX_FRAMES} frames`);
};

// One file per story, e.g.
// `__snapshots__/victory-charts-victorybar/bar-ratio.html`.
const snapshotPath = (id: string) => {
  const [dir, name] = id.split("--");
  return `./__snapshots__/${dir}/${name}.html`;
};

// File snapshots aren't reported as obsolete when a story is renamed or
// removed, so check for leftovers. The glob lists the files when Vite
// transforms this file, without loading them.
test("has no obsolete snapshots", () => {
  const expected = new Set(stories.map((story) => snapshotPath(story.id)));
  const obsolete = Object.keys(import.meta.glob("./__snapshots__/**")).filter(
    (file) => !expected.has(file),
  );
  expect(obsolete, "Delete these snapshot files").toEqual([]);
});

for (const [title, group] of Object.entries(
  Object.groupBy(stories, (story) => story.title),
)) {
  describe(title, () => {
    for (const story of group ?? []) {
      test(story.name, async () => {
        const messages = recordConsole();
        await renderStory(story.Component);

        await expect(serialize(container!)).toMatchFileSnapshot(
          snapshotPath(story.id),
        );

        // Unmount first, so errors and warnings from effect cleanup count too.
        unmountStory();
        const allowed = ALLOWED_CONSOLE[story.id] ?? [];
        const unexpected = messages.filter(
          (message) => !allowed.some((pattern) => pattern.test(message)),
        );
        expect(unexpected, "Console errors and warnings").toEqual([]);
      });
    }
  });
}
