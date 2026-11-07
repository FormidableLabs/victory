---
"victory-core": patch
---

Fix charts on React 19 whose children are an iterable other than an array (such as a `Set`): `Helpers.withDefaultProps` now adds missing `defaultProps` to their elements too, returning them as an array.
