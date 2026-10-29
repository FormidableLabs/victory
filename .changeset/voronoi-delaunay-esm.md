---
"victory-voronoi-container": patch
---

Fix `VictoryVoronoiContainer` in strict ESM (Node, webpack for `.mjs`): `delaunay-find` is CommonJS, so its default import was the whole module and mouse moves threw `Delaunay.from is not a function`.
