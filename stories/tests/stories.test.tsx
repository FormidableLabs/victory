import React from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, test } from "vitest";

import "../app/stories.css";
import { stories } from "../utils/load-stories";
import { serialize } from "./serialize";

// Stories that are known to throw, and the error they throw. They're tested
// for that error instead of a snapshot (an error boundary unmounts the story).
const KNOWN_ERRORS: Record<string, RegExp> = {
  // Looks bars up by their DOM `index` attribute, which Victory stopped
  // writing in 38.0.0 (#3123), so it finds no bar to focus.
  "victory-charts-victorybar--focus-with-refs":
    /Cannot read properties of undefined \(reading 'focus'\)/,
};

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: (error: Error) => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError(error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

let root: Root | undefined;
let container: HTMLElement | undefined;

afterEach(() => {
  root?.unmount();
  container?.remove();
  root = container = undefined;
});

// The first render, after effects: what Storybook showed before any
// interaction. Snapshots are compared before animations or timers run.
const renderStory = async (Story: React.ComponentType) => {
  let error: Error | undefined;
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  flushSync(() => {
    root!.render(
      <ErrorBoundary onError={(e) => (error = e)}>
        <Story />
      </ErrorBoundary>,
    );
  });
  await settle(container);
  return { error };
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
  const expected = new Set(
    stories
      .filter((story) => !KNOWN_ERRORS[story.id])
      .map((story) => snapshotPath(story.id)),
  );
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
        const { error } = await renderStory(story.Component);
        const knownError = KNOWN_ERRORS[story.id];
        if (knownError) {
          expect(error?.message).toMatch(knownError);
          return;
        }
        if (error) {
          throw error;
        }

        await expect(serialize(container!)).toMatchFileSnapshot(
          snapshotPath(story.id),
        );
      });
    }
  });
}
