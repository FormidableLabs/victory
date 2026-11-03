---
"victory": major
"victory-area": major
"victory-axis": major
"victory-bar": major
"victory-box-plot": major
"victory-brush-container": major
"victory-brush-line": major
"victory-candlestick": major
"victory-canvas": major
"victory-chart": major
"victory-core": major
"victory-create-container": major
"victory-cursor-container": major
"victory-errorbar": major
"victory-group": major
"victory-histogram": major
"victory-legend": major
"victory-line": major
"victory-pie": major
"victory-polar-axis": major
"victory-scatter": major
"victory-selection-container": major
"victory-shared-events": major
"victory-stack": major
"victory-tooltip": major
"victory-voronoi": major
"victory-voronoi-container": major
"victory-zoom-container": major
---

Packages are now built with tsdown and published from `dist/`, with an `exports` map:

- ESM is `dist/*.mjs` and CommonJS is `dist/*.cjs`, with matching `.d.mts`/`.d.cts` types. `main`, `module` and `types` still point at them for older tooling.
- Only the package root (and `package.json`) can be imported. Deep imports into `lib/`, `es/` or `src/` no longer resolve; import from the package root instead (for example `import { Helpers } from "victory-core"`).
- The output targets ES2022 and is no longer down-leveled further. If you support older browsers, transpile `node_modules` in your bundler.
- `src/` is no longer published.
