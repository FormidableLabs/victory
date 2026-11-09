---
"victory-area": patch
"victory-axis": patch
"victory-bar": patch
"victory-box-plot": patch
"victory-candlestick": patch
"victory-canvas": patch
"victory-core": patch
"victory-errorbar": patch
"victory-histogram": patch
"victory-legend": patch
"victory-line": patch
"victory-pie": patch
"victory-polar-axis": patch
"victory-scatter": patch
"victory-voronoi": patch
---

Build type declarations with `@types/react` 19. Refs from `useCanvasContext()` (`canvasRef`) and `useVictoryContainer()` (`localContainerRef`) are now typed `RefObject<HTMLCanvasElement | null>` and `RefObject<HTMLDivElement | null>` (no change on `@types/react` 18; correct on 19). Inferred `ReactElement` return types of some render methods now use `unknown` props instead of `any`, and class component types no longer list the legacy `refs` property. Code type-checks the same on `@types/react` 18 and 19.
