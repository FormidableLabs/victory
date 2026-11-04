import React from "react";
import startCase from "lodash/startCase";

import type { Meta, StoryObj } from "./types";

// Loads every `*.stories.tsx` file and turns each story into something that
// renders the way Storybook did. UI-free, so the gallery and the snapshot
// tests can share it.

// Storybook's global args (`.storybook/preview.ts`), applied before the meta's
// and the story's own.
export const GLOBAL_ARGS = {
  height: 350,
  themeKey: "grayscale",
  width: 400,
};

export interface LoadedStory {
  // Storybook's story id, e.g. `victory-charts-victorybar--alignment`.
  id: string;
  // `meta.title`, e.g. `Victory Charts/VictoryBar`.
  title: string;
  // Display name from the export name, e.g. `BarRatio` -> `Bar Ratio`.
  name: string;
  // Path of the story file, relative to `stories/`.
  file: string;
  args: Record<string, unknown>;
  // The story inside its decorators, as a component. Stories can call hooks
  // in `render` (Storybook renders them as components), so render this as
  // `<Component />` rather than calling it.
  Component: React.ComponentType;
}

interface StoryModule {
  default: Meta;
  [exportName: string]: Meta | StoryObj;
}

// Storybook's `sanitize` (from `@storybook/csf`), used to build ids.
const sanitize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

export const toStoryId = (title: string, exportName: string) =>
  `${sanitize(title)}--${sanitize(exportName)}`;

const modules = import.meta.glob<StoryModule>("../**/*.stories.tsx", {
  eager: true,
});

const loadStories = (): LoadedStory[] => {
  const stories = Object.entries(modules).flatMap(([path, mod]) => {
    const meta = mod.default;
    const file = path.replace(/^\.\.\//, "");
    if (!meta?.title) {
      throw new Error(`${file}: default export has no \`title\``);
    }
    const title = meta.title;

    return Object.entries(mod)
      .filter(([exportName]) => exportName !== "default")
      .map(([exportName, value]): LoadedStory => {
        const story = value as StoryObj;
        const args = { ...GLOBAL_ARGS, ...meta.args, ...story.args };
        const Story = () => story.render(args);
        // As in Storybook, the first decorator is the innermost.
        const decorated = (meta.decorators ?? []).reduce<() => React.ReactNode>(
          (inner, decorator) => () => decorator(inner),
          () => React.createElement(Story),
        );
        const Component = () => decorated();
        Story.displayName = `Story(${exportName})`;
        Component.displayName = `Decorated(${exportName})`;
        return {
          id: toStoryId(title, exportName),
          title,
          name: startCase(exportName),
          file,
          args,
          Component,
        };
      });
  });

  const seen = new Map<string, string>();
  for (const { id, file } of stories) {
    if (seen.has(id)) {
      throw new Error(`Duplicate story id ${id} (${seen.get(id)}, ${file})`);
    }
    seen.set(id, file);
  }

  return stories.sort(
    (a, b) => a.title.localeCompare(b.title) || a.name.localeCompare(b.name),
  );
};

export const stories = loadStories();
