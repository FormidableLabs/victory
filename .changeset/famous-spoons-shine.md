---
"victory-core": patch
---

Fix `Helpers.range` dropping the start value when the end is `0`. `range(5, 0)` now returns `[5, 4, 3, 2, 1]` (descending, consistent with `range(5, -5)`) instead of `[0, 1, 2, 3, 4]`. The end argument is now detected by presence (`undefined`) rather than truthiness, so a literal `0` end is no longer mistaken for "no end given".
