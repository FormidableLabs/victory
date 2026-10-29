---
"victory-voronoi-container": patch
---

Fix `VictoryVoronoiContainer` in strict ESM (Node, webpack for `.mjs`): the `delaunay-find/lib` entry is Babel-compiled CommonJS, so its default import was the whole `module.exports` and mouse moves threw `Delaunay.from is not a function`.
