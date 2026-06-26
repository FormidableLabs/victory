---
"victory-core": patch
---

Fix `Helpers.scalePoint` using `origin.x` instead of `origin.y` for the polar `y0` baseline, which mispositioned the lower end of polar bars/areas on non-square charts (where `origin.x !== origin.y`).
