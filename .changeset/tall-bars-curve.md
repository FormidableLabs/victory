---
"victory-bar": patch
"victory": patch
---

Fix `VictoryBar` `cornerRadius` callback so it can return a `{ top, bottom, topLeft, topRight, bottomLeft, bottomRight }` object, not just a number. Fixes #2401.
