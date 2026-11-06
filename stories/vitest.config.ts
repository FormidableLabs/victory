import path from "node:path";

import { playwright } from "@vitest/browser-playwright";
import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config.ts";

// Story tests in headless Chromium through Vitest's browser mode (`tests/`),
// as three projects:
// - `markup`: an SVG markup snapshot of every story (`pnpm test`). Install the
//   browser once with `pnpm stories:install` (from the repo root).
// - `interactions`: drive stories with the mouse (hover, click, drag, wheel)
//   and check what changes: tooltips, containers, events (`pnpm test` too).
// - `screenshots`: pixel screenshots of a few stories, only in the pinned
//   Playwright container (`pnpm stories:screenshots` locally, and CI), since
//   pixels differ between operating systems.

// The image `pnpm stories:screenshots` and CI run in sets this.
const IN_CONTAINER = process.env.PLAYWRIGHT_BROWSERS_PATH === "/ms-playwright";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      browser: {
        enabled: true,
        headless: true,
        provider: playwright({
          // Time scales and date labels depend on the timezone and locale.
          contextOptions: { timezoneId: "UTC", locale: "en-US" },
        }),
        instances: [{ browser: "chromium" }],
        // Fixed, so a layout that depends on the window can't vary by machine.
        viewport: { width: 1280, height: 800 },
        // The snapshot diff says what changed; a screenshot of the last story
        // on the page doesn't.
        screenshotFailures: false,
      },
      projects: [
        {
          extends: true,
          test: {
            name: "markup",
            include: ["tests/stories.test.tsx"],
            // Text measurement that's the same on every machine.
            setupFiles: ["tests/setup.ts", "tests/approximate-text.ts"],
          },
        },
        {
          extends: true,
          test: {
            name: "interactions",
            include: ["tests/interactions/*.test.tsx"],
            // As `markup`, so tooltip and label sizes match on every machine.
            setupFiles: ["tests/setup.ts", "tests/approximate-text.ts"],
          },
        },
        {
          extends: true,
          test: {
            name: "screenshots",
            include: ["tests/screenshots.test.tsx"],
            // Real text measurement: the pinned container's fonts.
            setupFiles: ["tests/setup.ts"],
            provide: { inContainer: IN_CONTAINER },
            browser: {
              expect: {
                toMatchScreenshot: {
                  // Exact: the pinned image renders the same pixels every
                  // time, and pixelmatch's default threshold (0.1) misses
                  // subtle color changes.
                  comparatorName: "pixelmatch",
                  comparatorOptions: { threshold: 0 },
                  // `tests/__screenshots__/<story path>.png`: one image per
                  // story, without the default browser and platform suffix
                  // (there's one of each).
                  resolveScreenshotPath: ({ arg, ext, root }) =>
                    path.join(root, "tests/__screenshots__", arg + ext),
                },
              },
            },
          },
        },
      ],
    },
  }),
);
