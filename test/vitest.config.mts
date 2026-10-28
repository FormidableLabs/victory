import { defineConfig } from "vitest/config";

// Shared by every package's `test` script (`vitest run --config
// ../../test/vitest.config.mts`). Vitest's `root` defaults to the working
// directory, so `include` is relative to the package being tested.
export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    // Each test file still gets a fresh context, but jsdom is set up once per
    // worker instead of once per file. Don't set `isolate: false`: some tests
    // leak state into later files and fail when the file order changes.
    pool: "vmThreads",
    include: ["src/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    setupFiles: [`${import.meta.dirname}/vitest-setup.ts`],
  },
});
