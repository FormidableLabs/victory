---
"victory-chart": patch
"victory-core": patch
"victory-group": patch
"victory-shared-events": patch
"victory-stack": patch
"victory-voronoi-container": patch
---

Fix charts on React 19: Victory reads props from child elements (and props like `labelComponent`) before React renders them, and React 19's JSX runtime no longer adds a class component's `defaultProps` to `element.props`. Charts lost defaults such as `data`, `samples` and VictoryLegend's `titleComponent` (missing bars, wrong lines, a `TypeError` with a titled legend), and VictoryBrushLine lost its width as an `axisComponent`. Victory now adds the missing defaults itself, as React 18 did. Adds `Helpers.getElementProps` and `Helpers.withDefaultProps` to `victory-core`.
