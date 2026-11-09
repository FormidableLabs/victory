---
"victory-brush-container": patch
"victory-cursor-container": patch
"victory-selection-container": patch
"victory-shared-events": patch
"victory-voronoi-container": patch
"victory-zoom-container": patch
---

Type declarations no longer reference lodash's types, which consumers don't have (`@types/lodash` isn't a dependency): they resolved to `any`, or failed with TS7016 under `skipLibCheck: false`. The throttled helper handlers (`BrushHelpers.onGlobalMouseMove`, `onMouseMove`, `ZoomHelpers.onWheel`, ...) are now typed with their call signature, `cancel()` and `flush()`, and `VictorySharedEvents`'s `getBaseProps`/`getBasePropsFromChildren` return `Record<string, any>`.
