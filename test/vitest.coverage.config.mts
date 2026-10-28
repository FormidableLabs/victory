import { defineConfig, mergeConfig } from "vitest/config";
import sharedConfig from "./vitest.config.mts";

// `pnpm test:coverage`: every package's tests in one run from the repo root,
// so v8 coverage comes out as one report. Reported, not gated (#2348).
// Like `test`, it imports dependencies through their built `dist`.
export default mergeConfig(
  sharedConfig,
  defineConfig({
    test: {
      include: ["packages/*/src/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
      coverage: {
        enabled: true,
        provider: "v8",
        include: ["packages/*/src/**"],
        exclude: ["**/*.{test,spec}.*"],
        reporter: [
          "text-summary",
          // For CI's job summary.
          ["text-summary", { file: "summary.txt" }],
          "html",
        ],
      },
    },
  }),
);
