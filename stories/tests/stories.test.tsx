import { afterEach, describe, expect, test, vi } from "vitest";

import { stories } from "../utils/load-stories";
import { recordConsole } from "./console";
import { renderStory, unmountStory } from "./render";
import { serialize } from "./serialize";

// Console errors and warnings a story is allowed to log, by story id. Any
// other `console.error` or `console.warn` (React's warnings included) fails
// the story's test. Empty: fix the story instead where you can.
const ALLOWED_CONSOLE: Record<string, RegExp[]> = {};

// Cleans up after a test that failed before unmounting its story.
afterEach(() => {
  unmountStory();
  vi.restoreAllMocks();
});

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
        const container = await renderStory(story.Component);

        await expect(serialize(container)).toMatchFileSnapshot(
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
