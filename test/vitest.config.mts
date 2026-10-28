import { defineConfig } from "vitest/config";

// Shared by every package's `test` script (`vitest run --config
// ../../test/vitest.config.mts`). Vitest's `root` defaults to the working
// directory, so `include` is relative to the package being tested.
export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    setupFiles: [`${import.meta.dirname}/vitest-setup.ts`],
  },
});
