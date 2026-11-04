import { playwright } from "@vitest/browser-playwright";
import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config.ts";

// SVG snapshot tests for every story (`tests/`), in headless Chromium through
// Vitest's browser mode. Install the browser once with `pnpm stories:install`
// (from the repo root).
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["tests/**/*.test.tsx"],
      browser: {
        enabled: true,
        headless: true,
        provider: playwright(),
        instances: [{ browser: "chromium" }],
        // Fixed, so a layout that depends on the window can't vary by machine.
        viewport: { width: 1280, height: 800 },
        // The snapshot diff says what changed; a screenshot of the last story
        // on the page doesn't.
        screenshotFailures: false,
      },
    },
  }),
);
